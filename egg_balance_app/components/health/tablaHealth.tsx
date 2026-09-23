"use client";

import { useEffect, useState } from "react";
import { API_HEALTH_URL } from "@/api/config";

interface HealthItem {
  id: number;
  healthDate: string;
  vaccineQuantity: number;
  vaccineName: string;
  active: boolean;
}

export default function TablaHealth() {
  const [healths, setHealths] = useState<HealthItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    const fetchHealths = async () => {
      try {
        setLoading(true);
        setErrorMsg("");

        // Asegúrate de que coincida con la ruta GET de tu router en backend
        // Si tu backend tiene /HealthAll o /GetHealth, cámbialo aquí según corresponda
        const response = await fetch(`${API_HEALTH_URL}/HealthAll`);

        console.log("Status HTTP:", response.status);

        if (!response.ok) {
          throw new Error(`Error en el servidor: HTTP ${response.status}`);
        }

        const resJson = await response.json();
        console.log("Respuesta recibida del backend:", resJson);

        // Detecta el array sin importar cómo lo devuelva el controlador
        let lista: HealthItem[] = [];

        if (Array.isArray(resJson)) {
          lista = resJson;
        } else if (Array.isArray(resJson.data)) {
          lista = resJson.data;
        } else if (Array.isArray(resJson.healths)) {
          lista = resJson.healths;
        } else if (Array.isArray(resJson.result)) {
          lista = resJson.result;
        }

        setHealths(lista);
      } catch (error: any) {
        console.error("Error al cargar registros de sanidad:", error);
        setErrorMsg(error.message || "Error al conectar con el backend");
        setHealths([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHealths();
  }, []);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? dateStr : date.toLocaleDateString();
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow border border-border overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4 text-title">
        Lista de Registros de Sanidad
      </h2>

      {errorMsg && (
        <div className="mb-4 p-3 bg-red-50 border border-red-400 text-red-700 text-sm rounded">
          {errorMsg}. Revisa la consola del navegador (F12).
        </div>
      )}

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-green-2-navbar text-white">
            <th className="border border-border px-4 py-2 text-left">ID</th>
            <th className="border border-border px-4 py-2 text-left">Fecha de Sanidad</th>
            <th className="border border-border px-4 py-2 text-left">Cantidad de Vacunas</th>
            <th className="border border-border px-4 py-2 text-left">Nombre de la Vacuna</th>
            <th className="border border-border px-4 py-2 text-left">Estado</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={5}
                className="border border-border px-4 py-6 text-center text-title"
              >
                Cargando registros...
              </td>
            </tr>
          ) : healths.length > 0 ? (
            healths.map((health, index) => (
              <tr
                key={health.id ?? `health-row-${index}`}
                className="hover:bg-fond transition-colors"
              >
                <td className="border border-border px-4 py-2 text-title">
                  {health.id}
                </td>
                <td className="border border-border px-4 py-2 text-title">
                  {formatDate(health.healthDate)}
                </td>
                <td className="border border-border px-4 py-2 text-title">
                  {health.vaccineQuantity}
                </td>
                <td className="border border-border px-4 py-2 text-title">
                  {health.vaccineName}
                </td>
                <td className="border border-border px-4 py-2 text-title">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                      health.active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {health.active ? "Activo" : "Inactivo"}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="border border-border px-4 py-6 text-center text-title"
              >
                No hay registros de sanidad.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}