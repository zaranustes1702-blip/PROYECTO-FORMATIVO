"use client";

import { useEffect, useState } from "react";
import { API_QUARANTINE_ALL_URL } from "@/api/config";

const POR_PAGINA = 10;

interface TablaQuarantineProps {
  filtro?: string;
  refreshKey?: number;
  currentPage?: number;
  onTotalPages?: (total: number) => void;
}

export default function TablaQuarantine({
  filtro = "",
  refreshKey = 0,
  currentPage = 1,
  onTotalPages,
}: TablaQuarantineProps) {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem("token");

        // El backend devuelve 10 por defecto; pedimos más para buscar y paginar
        const response = await fetch(`${API_QUARANTINE_ALL_URL}?limit=500`, {
          method: "GET",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        const resJson = await response.json();

        // Tu clase Response devuelve los datos en resJson.info
        const lista = resJson.info || resJson.data || [];
        // Más recientes primero (descendente por ID)
        setItems(
          Array.isArray(lista)
            ? [...lista].sort((a: any, b: any) => b.id - a.id)
            : []
        );
      } catch (error) {
        console.error("Error al obtener registros de cuarentena:", error);
        setItems([]);
      }
    };

    fetchItems();
  }, [refreshKey]);

  // Muestra la fecha como dd/mm/aaaa (ej: 12/09/2026)
  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "—";

    const cleanDate = dateStr.split("T")[0];
    const [year, month, day] = cleanDate.split("-");

    if (day && month && year) {
      return `${day}/${month}/${year}`;
    }

    return dateStr;
  };

  // Búsqueda en id, fecha, lote, insumo, aves afectadas, síntomas, diagnóstico, tratamiento, dosis, duración, fecha de finalización, observaciones y estado
  const texto = filtro.trim().toLowerCase();

  const itemsFiltrados = items.filter((item: any) => {
    if (!texto) return true;

    return [
      String(item.id),
      String(formatDate(item.quarantineDate)),
      String(item.birdbatch?.batchNumber ?? item.id_lote),
      String(item.supply?.supplyName ?? item.id_supply),
      String(item.affectedBirds),
      String(item.symptoms),
      String(item.diagnosis),
      String(item.treatmentApplied || "—"),
      String(item.dosage || "—"),
      String(item.treatmentDuration || "—"),
      String(formatDate(item.quarantineEndDate)),
      String(item.observations || "—"),
      item.active ? "activo" : "inactivo"
    ].some((valor) => (valor ?? "").toString().toLowerCase().includes(texto));
  });

  const totalPaginas = Math.max(1, Math.ceil(itemsFiltrados.length / POR_PAGINA));

  useEffect(() => {
    if (onTotalPages) {
      onTotalPages(totalPaginas);
    }
  }, [totalPaginas]);

  const paginaActual = Math.min(currentPage, totalPaginas);
  const itemsPagina = itemsFiltrados.slice(
    (paginaActual - 1) * POR_PAGINA,
    paginaActual * POR_PAGINA
  );

  return (
    <div className="w-full overflow-hidden rounded-3xl shadow-sm border border-[#E8DFD1]">
      {/* Contenedor con scroll: los títulos quedan fijos al bajar */}
      <div className="max-h-[60vh] overflow-auto">
        <table className="w-full min-w-max border-collapse">
          <thead>
            <tr className="bg-green-2-navbar text-white">
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                ID
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                Fecha
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                Lote
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                Insumo
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                Aves Afectadas
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                Síntomas
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                Diagnóstico
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                Tratamiento
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                Dosis
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                Duración
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                Fecha de Finalización
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                Observaciones
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                Estado
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E8DFD1]/60 bg-white">
            {itemsPagina.length > 0 ? (
              itemsPagina.map((item: any) => (
                <tr key={item.id}>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] font-medium whitespace-nowrap">
                    {item.id}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {formatDate(item.quarantineDate)}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {item.birdbatch?.batchNumber ?? item.id_lote}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {item.supply?.supplyName ?? item.id_supply}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {item.affectedBirds}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {item.symptoms}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {item.diagnosis}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {item.treatmentApplied || "—"}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {item.dosage || "—"}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {item.treatmentDuration || "—"}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {formatDate(item.quarantineEndDate)}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] max-w-xs truncate" title={item.observations}>
                    {item.observations || "—"}
                  </td>
                  <td className="px-6 py-3.5 text-sm whitespace-nowrap">
                    <span
                      className={`font-semibold ${
                        item.active ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {item.active ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={13}
                  className="px-6 py-8 text-center text-sm text-[#9A8B7A]"
                >
                  {texto
                    ? "No se encontraron registros de cuarentena con ese criterio."
                    : "No hay registros de cuarentena."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
