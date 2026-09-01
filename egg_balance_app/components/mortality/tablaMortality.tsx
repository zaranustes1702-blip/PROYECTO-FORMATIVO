"use client";

import { useEffect, useState } from "react";

interface MortalityItem {
  id: number;
  mortalityDate: string;
  mortalityTime: string;
  dailyMortality: number;
  possibleCauseOfDeath: string;
  necropsyPerformed: boolean;
  observations?: string;
  active: boolean;
}

export default function TablaMortality() {
  const [mortalities, setMortalities] = useState<MortalityItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMortalities = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/mortalities/MortalityAll"
        );
        const resJson = await response.json();
        
        // Soporta respuesta directa en array o envuelta en { data: [...] }
        const dataList = Array.isArray(resJson) ? resJson : (resJson.data || []);
        setMortalities(dataList);
      } catch (error) {
        console.error("Error al cargar mortalidades:", error);
        setMortalities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMortalities();
  }, []);

  // Función para dar formato a la fecha (YYYY-MM-DD)
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? dateStr : date.toLocaleDateString();
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow border border-border overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4 text-title">
        Lista de Mortalidad
      </h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-green-2-navbar text-white">
            <th className="border border-border px-4 py-2 text-left">ID</th>
            <th className="border border-border px-4 py-2 text-left">Fecha</th>
            <th className="border border-border px-4 py-2 text-left">Hora</th>
            <th className="border border-border px-4 py-2 text-left">Mortalidad del Día</th>
            <th className="border border-border px-4 py-2 text-left">Posible Causa</th>
            <th className="border border-border px-4 py-2 text-left">Necropsia</th>
            <th className="border border-border px-4 py-2 text-left">Observaciones</th>
            <th className="border border-border px-4 py-2 text-left">Estado</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={8}
                className="border border-border px-4 py-6 text-center text-title"
              >
                Cargando registros...
              </td>
            </tr>
          ) : mortalities.length > 0 ? (
            mortalities.map((mortality, index) => (
              <tr
                key={mortality.id ?? `mortality-row-${index}`}
                className="hover:bg-fond transition-colors"
              >
                <td className="border border-border px-4 py-2 text-title">
                  {mortality.id}
                </td>
                <td className="border border-border px-4 py-2 text-title">
                  {formatDate(mortality.mortalityDate)}
                </td>
                <td className="border border-border px-4 py-2 text-title">
                  {mortality.mortalityTime}
                </td>
                <td className="border border-border px-4 py-2 text-title">
                  {mortality.dailyMortality}
                </td>
                <td className="border border-border px-4 py-2 text-title">
                  {mortality.possibleCauseOfDeath}
                </td>
                <td className="border border-border px-4 py-2 text-title">
                  {mortality.necropsyPerformed ? "Sí" : "No"}
                </td>
                <td className="border border-border px-4 py-2 text-title">
                  {mortality.observations || "—"}
                </td>
                <td className="border border-border px-4 py-2 text-title">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                      mortality.active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {mortality.active ? "Activo" : "Inactivo"}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={8}
                className="border border-border px-4 py-6 text-center text-title"
              >
                No hay registros de mortalidad.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}