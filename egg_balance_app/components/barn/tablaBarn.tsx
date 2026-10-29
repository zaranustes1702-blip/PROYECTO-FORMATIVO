"use client";

import { useEffect, useState, useCallback } from "react";
import { Pencil, Trash2, Ban, CheckCircle2 } from "lucide-react";
import { API_BARN_ALL_URL, API_BARN_UPDATE_URL, API_BARN_DELETE_URL } from "@/api/config";
import FormCreationBarn from "./formCreate";

const POR_PAGINA = 10;

interface TableBarnProps {
  filtro?: string;
  refreshKey?: number;
  currentPage?: number;
  onTotalPages?: (total: number) => void;
}

export default function TableBarn({
  filtro = "",
  refreshKey = 0,
  currentPage = 1,
  onTotalPages,
}: TableBarnProps) {
  const [barns, setBarns] = useState<any[]>([]);
  const [editingBarn, setEditingBarn] = useState<any | null>(null);

  const fetchBarns = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_BARN_ALL_URL}?limit=500`, {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      const resJson = await response.json();
      const lista = resJson.info || resJson.data || [];
      setBarns(
        Array.isArray(lista)
          ? [...lista].sort((a: any, b: any) => b.id - a.id)
          : []
      );
    } catch (error) {
      console.error("Error al obtener galpones:", error);
      setBarns([]);
    }
  }, []);

  useEffect(() => {
    fetchBarns();
  }, [refreshKey, fetchBarns]);

  /*
  // Inactivar o Activar galpón
  const handleToggleActive = async (barn: any) => {
    const nuevoEstado = !barn.active;
    const accion = nuevoEstado ? "activar" : "inactivar";
    if (!window.confirm(`¿Está seguro de que desea ${accion} el galpón "${barn.barnName}"?`)) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_BARN_UPDATE_URL(barn.id), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          barnName: barn.barnName,
          barnSize: barn.barnSize,
          maxBirdCapacity: barn.maxBirdCapacity,
          active: nuevoEstado,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error al ${accion} el galpón`);
      }

      fetchBarns();
    } catch (error: any) {
      alert(error.message || `No se pudo ${accion} el galpón`);
    }
  };

  // Eliminar galpón
  const handleDelete = async (barn: any) => {
    if (
      !window.confirm(
        `¿Está seguro de que desea eliminar el galpón "${barn.barnName}"? Esta acción no se puede deshacer.`
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_BARN_DELETE_URL(barn.id), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(
          data?.message || data?.errors?.[0] || "No se pudo eliminar el galpón"
        );
      }

      fetchBarns();
    } catch (error: any) {
      alert(error.message || "Error al eliminar el galpón");
    }
  };
  */

  // Búsqueda en nombre, tamaño, capacidad, ID y estado
  const texto = filtro.trim().toLowerCase();

  const barnsFiltrados = barns.filter((barn: any) => {
    if (!texto) return true;

    return [
      barn.barnName,
      barn.barnSize,
      String(barn.maxBirdCapacity),
      String(barn.id),
      barn.active ? "activo" : "inactivo",
    ].some((valor) => (valor ?? "").toString().toLowerCase().includes(texto));
  });

  const totalPaginas = Math.max(1, Math.ceil(barnsFiltrados.length / POR_PAGINA));

  useEffect(() => {
    if (onTotalPages) {
      onTotalPages(totalPaginas);
    }
  }, [totalPaginas, onTotalPages]);

  const paginaActual = Math.min(currentPage, totalPaginas);
  const barnsPagina = barnsFiltrados.slice(
    (paginaActual - 1) * POR_PAGINA,
    paginaActual * POR_PAGINA
  );

  return (
    <>
      {editingBarn && (
        <FormCreationBarn
          open={!!editingBarn}
          onOpenChange={(abierto) => {
            if (!abierto) setEditingBarn(null);
          }}
          initialData={editingBarn}
          onBarnCreated={() => {
            setEditingBarn(null);
            fetchBarns();
          }}
        />
      )}

      <div className="w-full overflow-hidden rounded-3xl shadow-sm border border-[#E8DFD1]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-2-navbar text-white">
                <th className="px-6 py-3 text-left font-semibold text-sm">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left font-semibold text-sm">
                  Tamaño
                </th>
                <th className="px-6 py-3 text-left font-semibold text-sm">
                  Capacidad Máxima
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
              {barnsPagina.length > 0 ? (
                barnsPagina.map((barn: any) => (
                  <tr key={barn.id} className="hover:bg-[#FCFBF9] transition-colors">
                    <td className="px-6 py-2.5 text-sm text-[#3A2A1A] font-medium">
                      {barn.barnName}
                    </td>
                    <td className="px-6 py-2.5 text-sm text-[#3A2A1A]">
                      {barn.barnSize}
                    </td>
                    <td className="px-6 py-2.5 text-sm text-[#3A2A1A]">
                      {barn.maxBirdCapacity}
                    </td>
                    <td className="px-6 py-2.5 text-sm">
                      <span
                        className={`font-semibold ${
                          barn.active ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {barn.active ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-6 py-2.5 text-sm text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingBarn(barn)}
                          title="Editar"
                          className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        {/* 
                        <button
                          type="button"
                          onClick={() => handleToggleActive(barn)}
                          title={barn.active ? "Inactivar" : "Activar"}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            barn.active
                              ? "text-amber-600 hover:text-amber-800 hover:bg-amber-50"
                              : "text-green-600 hover:text-green-800 hover:bg-green-50"
                          }`}
                        >
                          {barn.active ? (
                            <Ban className="w-4 h-4" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(barn)}
                          title="Eliminar"
                          className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        */}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-sm text-[#9A8B7A]"
                  >
                    {texto
                      ? "No se encontraron galpones con ese criterio."
                      : "No hay galpones registrados."}
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
