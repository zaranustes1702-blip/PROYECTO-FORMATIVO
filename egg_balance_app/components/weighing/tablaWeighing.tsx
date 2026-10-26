"use client";

import { useEffect, useState, useCallback } from "react";
import { Pencil, Trash2, Ban, CheckCircle2 } from "lucide-react";
import {
  API_WEIGHING_ALL_URL,
  API_WEIGHING_UPDATE_URL,
  API_WEIGHING_DELETE_URL,
} from "@/api/config";
import FormCreateWeighing from "./formCreate";

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
  const [editingItem, setEditingItem] = useState<any | null>(null);

  const fetchWeighings = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      // El backend devuelve 10 por defecto; pedimos más para buscar y paginar
      const response = await fetch(`${API_WEIGHING_ALL_URL}?limit=500`, {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

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
  }, []);

  useEffect(() => {
    fetchWeighings();
  }, [refreshKey, fetchWeighings]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "—";
    const cleanDate = dateStr.split("T")[0];
    const [year, month, day] = cleanDate.split("-");
    if (day && month && year) {
      return `${day}/${month}/${year}`;
    }
    return dateStr;
  };

  // Inactivar o Activar pesaje
  const handleToggleActive = async (item: any) => {
    const nuevoEstado = !item.active;
    const accion = nuevoEstado ? "activar" : "inactivar";
    const batchInfo = item.birdbatch?.batchNumber ? ` del lote ${item.birdbatch.batchNumber}` : "";

    if (
      !window.confirm(
        `¿Está seguro de que desea ${accion} el pesaje${batchInfo}?`
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const cleanDate = (d?: string | null) => (d ? d.split("T")[0] : "");

      const response = await fetch(API_WEIGHING_UPDATE_URL(item.id), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          id_birdBatch: item.id_birdBatch || item.birdbatch?.id,
          weighingDate: cleanDate(item.weighingDate || item.date),
          weighingTime: item.weighingTime || item.time || "00:00",
          responsiblePerson: item.responsiblePerson || item.responsible || "Responsable",
          weighedBirds: Number(item.weighedBirds || item.birdsWeighed || item.weighedHen) || 0,
          totalWeightKg: Number(item.totalWeightKg) || 0,
          averageWeightGrams: Number(item.averageWeightGrams) || 0,
          batchUniformityPercentage: Number(item.batchUniformityPercentage || item.uniformityPercentage) || 0,
          active: nuevoEstado,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error al ${accion} el pesaje`);
      }

      fetchWeighings();
    } catch (error: any) {
      alert(error.message || `No se pudo ${accion} el pesaje`);
    }
  };

  // Eliminar pesaje
  const handleDelete = async (item: any) => {
    const batchInfo = item.birdbatch?.batchNumber ? ` del lote ${item.birdbatch.batchNumber}` : "";
    if (
      !window.confirm(
        `¿Está seguro de que desea eliminar el pesaje${batchInfo}? Esta acción no se puede deshacer.`
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_WEIGHING_DELETE_URL(item.id), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(
          data?.message || data?.errors?.[0] || "No se pudo eliminar el pesaje"
        );
      }

      fetchWeighings();
    } catch (error: any) {
      alert(error.message || "Error al eliminar el pesaje");
    }
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
      String(weighing.weighedBirds || weighing.birdsWeighed || weighing.weighedHen || ""),
      String(weighing.totalWeightKg),
      String(weighing.averageWeightGrams),
      String(weighing.batchUniformityPercentage || weighing.uniformityPercentage || ""),
      String(weighing.id),
      weighing.active ? "activo" : "inactivo",
    ].some((valor) => (valor ?? "").toString().toLowerCase().includes(texto));
  });

  const totalPaginas = Math.max(1, Math.ceil(weighingsFiltrados.length / POR_PAGINA));

  useEffect(() => {
    if (onTotalPages) {
      onTotalPages(totalPaginas);
    }
  }, [totalPaginas, onTotalPages]);

  const paginaActual = Math.min(currentPage, totalPaginas);
  const weighingsPagina = weighingsFiltrados.slice(
    (paginaActual - 1) * POR_PAGINA,
    paginaActual * POR_PAGINA
  );

  return (
    <>
      {editingItem && (
        <FormCreateWeighing
          open={!!editingItem}
          onOpenChange={(abierto) => {
            if (!abierto) setEditingItem(null);
          }}
          initialData={editingItem}
          onWeighingCreated={() => {
            setEditingItem(null);
            fetchWeighings();
          }}
        />
      )}

      <div className="w-full overflow-hidden rounded-3xl shadow-sm border border-[#E8DFD1]">
        {/* Contenedor con los primeros 5 campos de la tabla + columna de acciones */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-2-navbar text-white">
                <th className="px-6 py-3 text-left font-semibold text-sm">
                  Lote
                </th>
                <th className="px-6 py-3 text-left font-semibold text-sm">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left font-semibold text-sm">
                  Aves Pesadas
                </th>
                <th className="px-6 py-3 text-left font-semibold text-sm">
                  Peso Promedio (g)
                </th>
                <th className="px-6 py-3 text-left font-semibold text-sm">
                  Estado
                </th>
                <th className="px-6 py-3 text-center font-semibold text-sm">
                  Acciones
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
                    <td className="px-6 py-2.5 text-sm text-[#3A2A1A] font-medium">
                      {weighing.birdbatch?.batchNumber ?? "—"}
                    </td>
                    <td className="px-6 py-2.5 text-sm text-[#3A2A1A]">
                      {formatDate(weighing.weighingDate || weighing.date)}
                    </td>
                    <td className="px-6 py-2.5 text-sm text-[#3A2A1A]">
                      {weighing.weighedBirds || weighing.birdsWeighed || weighing.weighedHen || "—"}
                    </td>
                    <td className="px-6 py-2.5 text-sm text-[#3A2A1A]">
                      {weighing.averageWeightGrams ?? "—"}
                    </td>
                    <td className="px-6 py-2.5 text-sm">
                      <span
                        className={`font-semibold ${
                          weighing.active ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {weighing.active ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-6 py-2.5 text-sm text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingItem(weighing)}
                          title="Editar (ver todos los campos)"
                          className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleActive(weighing)}
                          title={weighing.active ? "Inactivar" : "Activar"}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            weighing.active
                              ? "text-amber-600 hover:text-amber-800 hover:bg-amber-50"
                              : "text-green-600 hover:text-green-800 hover:bg-green-50"
                          }`}
                        >
                          {weighing.active ? (
                            <Ban className="w-4 h-4" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(weighing)}
                          title="Eliminar"
                          className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
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
    </>
  );
}
