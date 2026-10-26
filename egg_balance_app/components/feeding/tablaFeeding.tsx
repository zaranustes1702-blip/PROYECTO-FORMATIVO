"use client";

import { useEffect, useState, useCallback } from "react";
import { Pencil, Trash2, Ban, CheckCircle2 } from "lucide-react";
import {
  API_FEEDING_ALL_URL,
  API_FEEDING_UPDATE_URL,
  API_FEEDING_DELETE_URL,
} from "@/api/config";
import FormCreateFeeding from "./formCreate";

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
  const [editingItem, setEditingItem] = useState<any | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_FEEDING_ALL_URL}?limit=500`, {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      const resJson = await response.json();
      const lista = resJson.info || resJson.data || [];
      setItems(
        Array.isArray(lista)
          ? [...lista].sort((a: any, b: any) => b.id_feeding - a.id_feeding)
          : []
      );
    } catch (error) {
      console.error("Error al obtener alimentaciones:", error);
      setItems([]);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [refreshKey, fetchItems]);

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "—";
    const cleanDate = dateStr.split("T")[0];
    const [year, month, day] = cleanDate.split("-");
    if (day && month && year) {
      return `${day}/${month}/${year}`;
    }
    return dateStr;
  };

  const formatTime = (timeStr?: string | null) =>
    timeStr ? String(timeStr).slice(0, 5) : "—";

  // Inactivar o Activar alimentación
  const handleToggleActive = async (item: any) => {
    const nuevoEstado = !item.active;
    const accion = nuevoEstado ? "activar" : "inactivar";
    if (
      !window.confirm(
        `¿Está seguro de que desea ${accion} esta alimentación?`
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const cleanDate = (d?: string | null) => (d ? d.split("T")[0] : "");
      const cleanTime = (t?: string | null) => (t ? String(t).slice(0, 5) : "");

      const response = await fetch(API_FEEDING_UPDATE_URL(item.id_feeding), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          id_supply: item.id_supply,
          id_stockEntry: Number(item.id_stockEntry),
          id_responsable: Number(item.id_responsable),
          shift: item.shift,
          feedingDate: cleanDate(item.feedingDate),
          feedingTime: cleanTime(item.feedingTime),
          quantity: Number(item.quantity),
          active: nuevoEstado,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error al ${accion} la alimentación`);
      }

      fetchItems();
    } catch (error: any) {
      alert(error.message || `No se pudo ${accion} la alimentación`);
    }
  };

  // Eliminar alimentación
  const handleDelete = async (item: any) => {
    if (
      !window.confirm(
        `¿Está seguro de que desea eliminar esta alimentación? Esta acción no se puede deshacer.`
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_FEEDING_DELETE_URL(item.id_feeding), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(
          data?.message || data?.errors?.[0] || "No se pudo eliminar la alimentación"
        );
      }

      fetchItems();
    } catch (error: any) {
      alert(error.message || "Error al eliminar la alimentación");
    }
  };

  const texto = filtro.trim().toLowerCase();

  const itemsFiltrados = items.filter((item: any) => {
    if (!texto) return true;

    return [
      formatDate(item.feedingDate),
      formatTime(item.feedingTime),
      item.shift,
      item.supply?.supplyName ?? item.id_supply,
      String(item.id_stockEntry),
      item.responsible?.fullName ?? item.id_responsable,
      String(item.quantity),
      String(item.id_feeding),
      item.active ? "activo" : "inactivo",
    ].some((valor) => (valor ?? "").toString().toLowerCase().includes(texto));
  });

  const totalPaginas = Math.max(1, Math.ceil(itemsFiltrados.length / POR_PAGINA));

  useEffect(() => {
    if (onTotalPages) {
      onTotalPages(totalPaginas);
    }
  }, [totalPaginas, onTotalPages]);

  const paginaActual = Math.min(currentPage, totalPaginas);
  const itemsPagina = itemsFiltrados.slice(
    (paginaActual - 1) * POR_PAGINA,
    paginaActual * POR_PAGINA
  );

  return (
    <>
      {editingItem && (
        <FormCreateFeeding
          open={!!editingItem}
          onOpenChange={(abierto) => {
            if (!abierto) setEditingItem(null);
          }}
          initialData={editingItem}
          onFeedingCreated={() => {
            setEditingItem(null);
            fetchItems();
          }}
        />
      )}

      <div className="w-full overflow-hidden rounded-3xl shadow-sm border border-[#E8DFD1]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-2-navbar text-white">
                <th className="px-6 py-3 text-left font-semibold text-sm">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left font-semibold text-sm">
                  Jornada / Hora
                </th>
                <th className="px-6 py-3 text-left font-semibold text-sm">
                  Insumo
                </th>
                <th className="px-6 py-3 text-left font-semibold text-sm">
                  Cantidad
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
              {itemsPagina.length > 0 ? (
                itemsPagina.map((item: any) => (
                  <tr key={item.id_feeding} className="hover:bg-[#FCFBF9] transition-colors">
                    <td className="px-6 py-2.5 text-sm text-[#3A2A1A]">
                      {formatDate(item.feedingDate)}
                    </td>
                    <td className="px-6 py-2.5 text-sm text-[#3A2A1A]">
                      {item.shift} · {formatTime(item.feedingTime)}
                    </td>
                    <td className="px-6 py-2.5 text-sm text-[#3A2A1A] font-medium">
                      {item.supply?.supplyName ?? item.id_supply}
                    </td>
                    <td className="px-6 py-2.5 text-sm text-[#3A2A1A]">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-2.5 text-sm">
                      <span
                        className={`font-semibold ${
                          item.active ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {item.active ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-6 py-2.5 text-sm text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingItem(item)}
                          title="Editar (ver todos los campos)"
                          className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleActive(item)}
                          title={item.active ? "Inactivar" : "Activar"}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            item.active
                              ? "text-amber-600 hover:text-amber-800 hover:bg-amber-50"
                              : "text-green-600 hover:text-green-800 hover:bg-green-50"
                          }`}
                        >
                          {item.active ? (
                            <Ban className="w-4 h-4" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item)}
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
                      ? "No se encontraron alimentaciones con ese criterio."
                      : "No hay alimentaciones registradas."}
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
