"use client";

import { useEffect, useState } from "react";
import { API_EGG_PRODUCTION_ALL_URL } from "@/api/config";

const POR_PAGINA = 10;

interface TablaEggProductionProps {
  filtro?: string;
  refreshKey?: number;
  currentPage?: number;
  onTotalPages?: (total: number) => void;
}

export default function TablaEggProduction({
  filtro = "",
  refreshKey = 0,
  currentPage = 1,
  onTotalPages,
}: TablaEggProductionProps) {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem("token");

        // El backend devuelve 10 por defecto; pedimos más para buscar y paginar
        const response = await fetch(`${API_EGG_PRODUCTION_ALL_URL}?limit=500`, {
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
        console.error("Error al obtener registros de producción:", error);
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

  // Muestra la hora como HH:MM
  const formatTime = (timeStr?: string | null) =>
    timeStr ? String(timeStr).slice(0, 5) : "—";

  // Búsqueda en id, fecha, lote, jornada, hora am, responsable am, jumbo am, aaa am, aa am, a am, b am, c am, rotos am, total am, hora pm, responsable pm, jumbo pm, aaa pm, aa pm, a pm, b pm, c pm, rotos pm, total pm, huevos rotos, huevos buenos, total día, % producción, observaciones y estado
  const texto = filtro.trim().toLowerCase();

  const itemsFiltrados = items.filter((item: any) => {
    if (!texto) return true;

    return [
      String(item.id),
      String(formatDate(item.date)),
      String(item.birdbatch?.batchNumber ?? item.id_lote),
      String(item.shift),
      String(formatTime(item.hourAm)),
      String(item.responsibleAm?.fullName ?? item.id_responsibleAm),
      String(item.jumboEggsAm),
      String(item.aaaEggsAm),
      String(item.aaEggsAm),
      String(item.aEggsAm),
      String(item.bEggsAm),
      String(item.cEggsAm),
      String(item.brokenEggsAm),
      String(item.totalAm),
      String(formatTime(item.hourPm)),
      String(item.responsiblePm?.fullName ?? item.id_responsiblePm),
      String(item.jumboEggsPm),
      String(item.aaaEggsPm),
      String(item.aaEggsPm),
      String(item.aEggsPm),
      String(item.bEggsPm),
      String(item.cEggsPm),
      String(item.brokenEggsPm),
      String(item.totalPm),
      String(item.brokenEggs),
      String(item.goodEggs),
      String(item.totalDay),
      String(`${item.productionPercentage}%`),
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
                Jornada
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                Hora Am
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                Responsable Am
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                Jumbo Am
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                AAA Am
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                AA Am
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                A Am
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                B Am
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                C Am
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                Rotos Am
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                Total Am
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                Hora Pm
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                Responsable Pm
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                Jumbo Pm
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                AAA Pm
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                AA Pm
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                A Pm
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                B Pm
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                C Pm
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                Rotos Pm
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                Total Pm
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                Huevos Rotos
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                Huevos Buenos
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                Total Día
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                % Producción
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
                    {formatDate(item.date)}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {item.birdbatch?.batchNumber ?? item.id_lote}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {item.shift}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {formatTime(item.hourAm)}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {item.responsibleAm?.fullName ?? item.id_responsibleAm}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {item.jumboEggsAm}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {item.aaaEggsAm}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {item.aaEggsAm}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {item.aEggsAm}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {item.bEggsAm}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {item.cEggsAm}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {item.brokenEggsAm}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] font-semibold whitespace-nowrap">
                    {item.totalAm}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {formatTime(item.hourPm)}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {item.responsiblePm?.fullName ?? item.id_responsiblePm}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {item.jumboEggsPm}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {item.aaaEggsPm}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {item.aaEggsPm}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {item.aEggsPm}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {item.bEggsPm}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {item.cEggsPm}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {item.brokenEggsPm}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] font-semibold whitespace-nowrap">
                    {item.totalPm}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {item.brokenEggs}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] font-semibold text-green-800 whitespace-nowrap">
                    {item.goodEggs}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] font-semibold whitespace-nowrap">
                    {item.totalDay}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {`${item.productionPercentage}%`}
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
                  colSpan={30}
                  className="px-6 py-8 text-center text-sm text-[#9A8B7A]"
                >
                  {texto
                    ? "No se encontraron registros de producción con ese criterio."
                    : "No hay registros de producción de huevos."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
