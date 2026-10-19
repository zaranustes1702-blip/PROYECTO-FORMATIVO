"use client";

import { useEffect, useState } from "react";
import { API_FEEDING_ALL_URL } from "@/api/config";

const POR_PAGINA = 10;

interface TablaFeedingProps {
  filtro?: string;
  refreshKey?: number;
  currentPage?: number;
  onTotalPages?: (total: number) => void;
}

export default function TablaFeeding({
  filtro = "",
  refreshKey = 0,
  currentPage = 1,
  onTotalPages,
}: TablaFeedingProps) {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem("token");

        // El backend devuelve 10 por defecto; pedimos más para buscar y paginar
        const response = await fetch(`${API_FEEDING_ALL_URL}?limit=500`, {
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
            ? [...lista].sort((a: any, b: any) => b.id_feeding - a.id_feeding)
            : []
        );
      } catch (error) {
        console.error("Error al obtener registros de alimentación:", error);
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

  // Búsqueda en id, fecha, hora, jornada, insumo, entrada de stock, responsable, cantidad y estado
  const texto = filtro.trim().toLowerCase();

  const itemsFiltrados = items.filter((item: any) => {
    if (!texto) return true;

    return [
      String(item.id_feeding),
      String(formatDate(item.feedingDate)),
      String(formatTime(item.feedingTime)),
      String(item.shift),
      String(item.supply?.supplyName ?? item.id_supply),
      String(`#${item.id_stockEntry}`),
      String(item.responsible?.fullName ?? item.id_responsable),
      String(`${Number(item.quantity).toFixed(2)} ${item.stockEntry?.unid_entrada ?? ""}`.trim()),
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
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-2-navbar text-white">
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                ID
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                Fecha
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                Hora
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                Jornada
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                Insumo
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                Entrada de Stock
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                Responsable
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                Cantidad
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                Estado
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E8DFD1]/60 bg-white">
            {itemsPagina.length > 0 ? (
              itemsPagina.map((item: any) => (
                <tr key={item.id_feeding}>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] font-medium">
                    {item.id_feeding}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A]">
                    {formatDate(item.feedingDate)}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A]">
                    {formatTime(item.feedingTime)}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A]">
                    {item.shift}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A]">
                    {item.supply?.supplyName ?? item.id_supply}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A]">
                    {`#${item.id_stockEntry}`}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A]">
                    {item.responsible?.fullName ?? item.id_responsable}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A]">
                    {`${Number(item.quantity).toFixed(2)} ${item.stockEntry?.unid_entrada ?? ""}`.trim()}
                  </td>
                  <td className="px-6 py-3.5 text-sm">
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
                  colSpan={9}
                  className="px-6 py-8 text-center text-sm text-[#9A8B7A]"
                >
                  {texto
                    ? "No se encontraron registros de alimentación con ese criterio."
                    : "No hay registros de alimentación."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
