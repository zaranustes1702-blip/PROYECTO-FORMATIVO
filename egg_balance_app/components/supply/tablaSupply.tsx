"use client";

import { useEffect, useState, useCallback } from "react";
import { Pencil, Trash2, Ban, CheckCircle2 } from "lucide-react";
import {
  API_SUPPLY_ALL_URL,
  API_SUPPLY_UPDATE_URL,
  API_SUPPLY_DELETE_URL,
} from "@/api/config";
import FormCreateSupply from "./formCreate";

const POR_PAGINA = 10;

interface TablaSupplyProps {
  filtro?: string;
  refreshKey?: number;
  currentPage?: number;
  onTotalPages?: (total: number) => void;
}

export default function TablaSupply({
  filtro = "",
  refreshKey = 0,
  currentPage = 1,
  onTotalPages,
}: TablaSupplyProps) {
  const [items, setItems] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  const fetchItems = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_SUPPLY_ALL_URL}?limit=500`, {
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
          ? [...lista].sort((a: any, b: any) =>
              (a.supplyName || "").localeCompare(b.supplyName || "")
            )
          : []
      );
    } catch (error) {
      console.error("Error al obtener insumos:", error);
      setItems([]);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [refreshKey, fetchItems]);

  const tipoInsumo = (tipo: string) => {
    if (tipo === "alimentacion") return "Alimentación";
    if (tipo === "medicamentos") return "Medicamento";
    return tipo;
  };

  /*
  // Inactivar o Activar insumo
  const handleToggleActive = async (item: any) => {
    const nuevoEstado = !item.active;
    const accion = nuevoEstado ? "activar" : "inactivar";
    if (
      !window.confirm(
        `¿Está seguro de que desea ${accion} el insumo "${item.supplyName}"?`
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(API_SUPPLY_UPDATE_URL(item.id_supply), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          supplyName: item.supplyName,
          supplyType: item.supplyType,
          reference: item.reference,
          minimumStock: Number(item.minimumStock) || 0,
          observations: item.observations || "",
          active: nuevoEstado,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error al ${accion} el insumo`);
      }

      fetchItems();
    } catch (error: any) {
      alert(error.message || `No se pudo ${accion} el insumo`);
    }
  };

  // Eliminar insumo
  const handleDelete = async (item: any) => {
    if (
      !window.confirm(
        `¿Está seguro de que desea eliminar el insumo "${item.supplyName}"? Esta acción no se puede deshacer.`
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_SUPPLY_DELETE_URL(item.id_supply), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(
          data?.message || data?.errors?.[0] || "No se pudo eliminar el insumo"
        );
      }

      fetchItems();
    } catch (error: any) {
      alert(error.message || "Error al eliminar el insumo");
    }
  };
  */

  const texto = filtro.trim().toLowerCase();

  const itemsFiltrados = items.filter((item: any) => {
    if (!texto) return true;

    return [
      item.id_supply,
      item.supplyName,
      tipoInsumo(item.supplyType),
      item.reference,
      String(item.minimumStock),
      item.observations,
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
        <FormCreateSupply
          open={!!editingItem}
          onOpenChange={(abierto) => {
            if (!abierto) setEditingItem(null);
          }}
          initialData={editingItem}
          onSupplyCreated={() => {
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
                  Nombre
                </th>
                <th className="px-6 py-3 text-left font-semibold text-sm">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left font-semibold text-sm">
                  Referencia
                </th>
                <th className="px-6 py-3 text-left font-semibold text-sm">
                  Stock Mínimo
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
                  <tr key={item.id_supply} className="hover:bg-[#FCFBF9] transition-colors">
                    <td className="px-6 py-2.5 text-sm text-[#3A2A1A] font-medium">
                      {item.supplyName}
                    </td>
                    <td className="px-6 py-2.5 text-sm text-[#3A2A1A]">
                      {tipoInsumo(item.supplyType)}
                    </td>
                    <td className="px-6 py-2.5 text-sm text-[#3A2A1A]">
                      {item.reference}
                    </td>
                    <td className="px-6 py-2.5 text-sm text-[#3A2A1A]">
                      {item.minimumStock}
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
                          title="Editar"
                          className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        {/* 
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
                        */}
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
                      ? "No se encontraron insumos con ese criterio."
                      : "No hay insumos registrados."}
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
