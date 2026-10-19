"use client";

import { useEffect, useState } from "react";

const POR_PAGINA = 10;

interface TablaBirdBatchProps {
  filtro?: string;
  refreshKey?: number;
  currentPage?: number;
  onTotalPages?: (total: number) => void;
}

export default function TablaBirdBatch({
  filtro = "",
  refreshKey = 0,
  currentPage = 1,
  onTotalPages,
}: TablaBirdBatchProps) {
  const [birdBatches, setBirdBatches] = useState<any[]>([]);

  useEffect(() => {
    const fetchBirdBatches = async () => {
      try {
        const token = localStorage.getItem("token");

        // El backend devuelve 10 por defecto; pedimos más para buscar y paginar
        const response = await fetch(
          "http://localhost:3000/api/bird-batches/BirdBatchAll?limit=500",
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

        // Tu clase Response devuelve los datos en resJson.info
        const lista = resJson.info || resJson.data || [];
        // Más recientes primero (descendente por ID)
        setBirdBatches(
          Array.isArray(lista)
            ? [...lista].sort((a: any, b: any) => b.id - a.id)
            : []
        );
      } catch (error) {
        console.error("Error al obtener lotes:", error);
        setBirdBatches([]);
      }
    };

    fetchBirdBatches();
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

  // Búsqueda en número de lote, raza, fechas, vacunas, cantidad, pesos, edad, ID y estado
  const texto = filtro.trim().toLowerCase();

  const batchesFiltrados = birdBatches.filter((batch: any) => {
    if (!texto) return true;

    return [
      batch.batchNumber,
      batch.birdBreed,
      formatDate(batch.entryDate),
      formatDate(batch.endDate),
      batch.appliedVaccines,
      String(batch.birdQuantity),
      String(batch.batchWeight),
      String(batch.currentAverageWeightKg ?? ""),
      String(batch.currentAverageWeightGrams ?? ""),
      String(batch.birdAgeWeeks),
      String(batch.id),
      batch.active ? "activo" : "inactivo",
    ].some((valor) => (valor ?? "").toString().toLowerCase().includes(texto));
  });

  const totalPaginas = Math.max(1, Math.ceil(batchesFiltrados.length / POR_PAGINA));

  useEffect(() => {
    if (onTotalPages) {
      onTotalPages(totalPaginas);
    }
  }, [totalPaginas]);

  const paginaActual = Math.min(currentPage, totalPaginas);
  const batchesPagina = batchesFiltrados.slice(
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
                Fecha de ingreso
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                Fecha de finalización
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                Numero de lote
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                Raza
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                Cantidad de aves
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                Peso inicial del lote (kg)
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                Peso promedio actual del lote (kg)
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                Edad (Semanas)
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                Vacunas aplicadas
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                Estado
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E8DFD1]/60 bg-white">
            {batchesPagina.length > 0 ? (
              batchesPagina.map((batch: any) => (
                <tr
                  key={batch.id}
                  className="hover:bg-[#FCFBF9] transition-colors"
                >
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] font-medium">
                    {batch.id}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A]">
                    {formatDate(batch.entryDate)}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A]">
                    {formatDate(batch.endDate)}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A]">
                    {batch.batchNumber}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A]">
                    {batch.birdBreed || "—"}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A]">
                    {batch.birdQuantity}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A]">
                    {batch.batchWeight}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A]">
                    {batch.currentAverageWeightKg ?? "—"}
                    {batch.currentAverageWeightGrams != null && (
                      <span className="block text-xs text-[#9A8B7A]">
                        {batch.currentAverageWeightGrams} g por ave
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A]">
                    {batch.birdAgeWeeks}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A]">
                    {batch.appliedVaccines}
                  </td>
                  <td className="px-6 py-3.5 text-sm">
                    <span
                      className={`font-semibold ${
                        batch.active ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {batch.active ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={11}
                  className="px-6 py-8 text-center text-sm text-[#9A8B7A]"
                >
                  {texto
                    ? "No se encontraron lotes con ese criterio."
                    : "No hay lotes registrados."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
