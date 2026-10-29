"use client";

import { useEffect, useState, useCallback } from "react";
import { Pencil, Trash2, Ban, CheckCircle2 } from "lucide-react";
import {
  API_BIRD_BATCH_ALL_URL,
  API_BIRD_BATCH_UPDATE_URL,
  API_BIRD_BATCH_DELETE_URL,
} from "@/api/config";
import FormCreateBirdBatch from "./formCreate";

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
  const [editingBatch, setEditingBatch] = useState<any | null>(null);

  const fetchBirdBatches = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_BIRD_BATCH_ALL_URL}?limit=500`, {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      const resJson = await response.json();
      const lista = resJson.info || resJson.data || [];
      setBirdBatches(
        Array.isArray(lista)
          ? [...lista].sort((a: any, b: any) => b.id - a.id)
          : []
      );
    } catch (error) {
      console.error("Error al obtener lotes:", error);
      setBirdBatches([]);
    }
  }, []);

  useEffect(() => {
    fetchBirdBatches();
  }, [refreshKey, fetchBirdBatches]);

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "—";
    const cleanDate = dateStr.split("T")[0];
    const [year, month, day] = cleanDate.split("-");
    if (day && month && year) {
      return `${day}/${month}/${year}`;
    }
    return dateStr;
  };

  // Inactivar o Activar lote
  const handleToggleActive = async (batch: any) => {
    const nuevoEstado = !batch.active;
    const accion = nuevoEstado ? "activar" : "inactivar";
    if (
      !window.confirm(
        `¿Está seguro de que desea ${accion} el lote "${batch.batchNumber}"?`
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const cleanDate = (d?: string | null) => (d ? d.split("T")[0] : "");

      const response = await fetch(API_BIRD_BATCH_UPDATE_URL(batch.id), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          entryDate: cleanDate(batch.entryDate),
          endDate: cleanDate(batch.endDate),
          batchNumber: batch.batchNumber,
          birdBreed: batch.birdBreed,
          birdQuantity: Number(batch.birdQuantity) || 0,
          batchWeight: Number(batch.batchWeight) || 0,
          birdAgeWeeks: Number(batch.birdAgeWeeks) || 0,
          appliedVaccines: batch.appliedVaccines || "Marek",
          active: nuevoEstado,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error al ${accion} el lote`);
      }

      fetchBirdBatches();
    } catch (error: any) {
      alert(error.message || `No se pudo ${accion} el lote`);
    }
  };

  // Eliminar lote
  const handleDelete = async (batch: any) => {
    if (
      !window.confirm(
        `¿Está seguro de que desea eliminar el lote "${batch.batchNumber}"? Esta acción no se puede deshacer.`
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_BIRD_BATCH_DELETE_URL(batch.id), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(
          data?.message || data?.errors?.[0] || "No se pudo eliminar el lote"
        );
      }

      fetchBirdBatches();
    } catch (error: any) {
      alert(error.message || "Error al eliminar el lote");
    }
  };

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
  }, [totalPaginas, onTotalPages]);

  const paginaActual = Math.min(currentPage, totalPaginas);
  const batchesPagina = batchesFiltrados.slice(
    (paginaActual - 1) * POR_PAGINA,
    paginaActual * POR_PAGINA
  );

  return (
    <>
      {editingBatch && (
        <FormCreateBirdBatch
          open={!!editingBatch}
          onOpenChange={(abierto) => {
            if (!abierto) setEditingBatch(null);
          }}
          initialData={editingBatch}
          onBirdBatchCreated={() => {
            setEditingBatch(null);
            fetchBirdBatches();
          }}
        />
      )}

      <div className="w-full overflow-hidden rounded-3xl shadow-sm border border-[#E8DFD1]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-2-navbar text-white">
                <th className="px-5 py-3 text-left font-semibold text-sm">
                  Fecha de ingreso
                </th>
                <th className="px-5 py-3 text-left font-semibold text-sm">
                  Número de lote
                </th>
                <th className="px-5 py-3 text-left font-semibold text-sm">
                  Raza
                </th>
                <th className="px-5 py-3 text-left font-semibold text-sm">
                  Cantidad de aves
                </th>
                <th className="px-5 py-3 text-left font-semibold text-sm">
                  Estado
                </th>
                <th className="px-5 py-3 text-center font-semibold text-sm">
                  Acciones
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
                    <td className="px-5 py-2.5 text-sm text-[#3A2A1A]">
                      {formatDate(batch.entryDate)}
                    </td>
                    <td className="px-5 py-2.5 text-sm text-[#3A2A1A] font-medium">
                      {batch.batchNumber}
                    </td>
                    <td className="px-5 py-2.5 text-sm text-[#3A2A1A]">
                      {batch.birdBreed}
                    </td>
                    <td className="px-5 py-2.5 text-sm text-[#3A2A1A]">
                      {batch.birdQuantity}
                    </td>
                    <td className="px-5 py-2.5 text-sm">
                      <span
                        className={`font-semibold ${
                          batch.active ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {batch.active ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-5 py-2.5 text-sm text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingBatch(batch)}
                          title="Editar (ver todos los campos)"
                          className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleActive(batch)}
                          title={batch.active ? "Inactivar" : "Activar"}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            batch.active
                              ? "text-amber-600 hover:text-amber-800 hover:bg-amber-50"
                              : "text-green-600 hover:text-green-800 hover:bg-green-50"
                          }`}
                        >
                          {batch.active ? (
                            <Ban className="w-4 h-4" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(batch)}
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
                      ? "No se encontraron lotes con ese criterio."
                      : "No hay lotes registrados."}
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
