"use client";

import { useEffect, useState } from "react";

const POR_PAGINA = 10;

interface TablaWeighingProps {
  filtro?: string;
  refreshKey?: number;
  currentPage?: number;
  onTotalPages?: (total: number) => void;
}

export default function TablaWeighing({
  filtro = "",
  refreshKey = 0,
  currentPage = 1,
  onTotalPages,
}: TablaWeighingProps) {
  const [weighings, setWeighings] = useState<any[]>([]);

  useEffect(() => {
    const fetchWeighings = async () => {
      try {
        const token = localStorage.getItem("token");

        // El backend devuelve 10 por defecto; pedimos más para buscar y paginar
        const response = await fetch(
          "http://localhost:3000/api/weighings/WeighingsAll?limit=500",
          {
            method: "GET",
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          }
        );

        const resJson = await response.json();

        const lista = resJson.info || resJson.data || [];
        // Más recientes primero (descendente por ID)
        setWeighings(
          Array.isArray(lista)
            ? [...lista].sort((a: any, b: any) => b.id - a.id)
            : []
        );
      } catch (error) {
        console.error("Error al obtener pesajes:", error);
        setWeighings([]);
      }
    };

    fetchWeighings();
  }, [refreshKey]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "—";
    const cleanDate = dateStr.split("T")[0];
    const [year, month, day] = cleanDate.split("-");
    if (day && month && year) {
      return `${day}/${month}/${year}`;
    }
    return dateStr;
  };

  // Búsqueda en lote, fecha, hora, responsable, aves, pesos, uniformidad, ID y estado
  const texto = filtro.trim().toLowerCase();

  const weighingsFiltrados = weighings.filter((weighing: any) => {
    if (!texto) return true;

    return [
      weighing.birdbatch?.batchNumber,
      formatDate(weighing.weighingDate || weighing.date),
      weighing.weighingTime || weighing.time,
      weighing.responsiblePerson || weighing.responsible,
      String(weighing.weighedBirds || weighing.weighedHen || ""),
      String(weighing.totalWeightKg),
      String(weighing.averageWeightGrams),
      String(weighing.batchUniformityPercentage),
      String(weighing.id),
      weighing.active ? "activo" : "inactivo",
    ].some((valor) => (valor ?? "").toString().toLowerCase().includes(texto));
  });

  const totalPaginas = Math.max(1, Math.ceil(weighingsFiltrados.length / POR_PAGINA));

  useEffect(() => {
    if (onTotalPages) {
      onTotalPages(totalPaginas);
    }
  }, [totalPaginas]);

  const paginaActual = Math.min(currentPage, totalPaginas);
  const weighingsPagina = weighingsFiltrados.slice(
    (paginaActual - 1) * POR_PAGINA,
    paginaActual * POR_PAGINA
  );

  return (
    <div className="w-full overflow-hidden rounded-3xl shadow-sm border border-[#E8DFD1]">
      {/* Contenedor con scroll: los títulos quedan fijos al bajar */}
      <div className="max-h-[60vh] overflow-y-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-2-navbar text-white">
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                ID
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                Lote
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                Fecha
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                Hora
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                Responsable
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                Aves Pesadas
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                Peso Total (Kg)
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                Peso Promedio (g)
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                Uniformidad (%)
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                Estado
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E8DFD1]/60 bg-white">
            {weighingsPagina.length > 0 ? (
              weighingsPagina.map((weighing: any, index: number) => (
                <tr
                  key={`weighing-${weighing.id || index}`}
                  className="hover:bg-[#FCFBF9] transition-colors"
                >
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] font-medium">
                    {weighing.id}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A]">
                    {weighing.birdbatch?.batchNumber ?? "—"}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A]">
                    {formatDate(weighing.weighingDate || weighing.date)}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A]">
                    {weighing.weighingTime || weighing.time || "—"}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A]">
                    {weighing.responsiblePerson || weighing.responsible || "—"}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A]">
                    {weighing.weighedBirds || weighing.weighedHen || "—"}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A]">
                    {weighing.totalWeightKg}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A]">
                    {weighing.averageWeightGrams}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A]">
                    {weighing.batchUniformityPercentage}%
                  </td>
                  <td className="px-6 py-3.5 text-sm">
                    <span
                      className={`font-semibold ${
                        weighing.active ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {weighing.active ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={10}
                  className="px-6 py-8 text-center text-sm text-[#9A8B7A]"
                >
                  {texto
                    ? "No se encontraron pesajes con ese criterio."
                    : "No hay registros de pesajes."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
