"use client";

import { useEffect, useState, useCallback } from "react";
import { Pencil, Trash2, Ban, CheckCircle2 } from "lucide-react";
import {
  API_USER_ALL_URL,
  API_USER_UPDATE_URL,
  API_USER_DELETE_URL,
} from "@/api/config";
import FormCreateUser from "./formCreate";

const POR_PAGINA = 10;

interface User {
  userId: number;
  name: string;
  uuid?: string;
  email: string;
  documentId: string;
  postJob: string;
  verifyEmail: boolean;
  active: boolean;
  createdAt?: string | null;
  updatedAt?: string | null;
  id_roll?: number | null;
  solicito_newPassword?: boolean;
}

interface TablaUserProps {
  filtro?: string;
  refreshKey?: number;
  currentPage?: number;
  onTotalPages?: (total: number) => void;
}

export default function TablaUser({
  filtro = "",
  refreshKey = 0,
  currentPage = 1,
  onTotalPages,
}: TablaUserProps) {
  const [items, setItems] = useState<User[]>([]);
  const [cargando, setCargando] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const fetchItems = useCallback(async () => {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_USER_ALL_URL}?limit=500`, {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!response.ok) {
        throw new Error("No se pudieron obtener los usuarios.");
      }

      const resJson = await response.json();
      const lista = resJson.info ?? resJson.data ?? [];

      setItems(
        Array.isArray(lista)
          ? [...lista].sort((a: User, b: User) => b.userId - a.userId)
          : []
      );
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      setItems([]);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [refreshKey, fetchItems]);

  /*
  // Inactivar o Activar usuario
  const handleToggleActive = async (user: User) => {
    const nuevoEstado = !user.active;
    const accion = nuevoEstado ? "activar" : "inactivar";
    if (
      !window.confirm(
        `¿Está seguro de que desea ${accion} al usuario "${user.name}"?`
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(API_USER_UPDATE_URL(user.userId), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          documentId: user.documentId,
          postJob: user.postJob,
          active: nuevoEstado,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error al ${accion} el usuario`);
      }

      fetchItems();
    } catch (error: any) {
      alert(error.message || `No se pudo ${accion} el usuario`);
    }
  };

  // Eliminar usuario
  const handleDelete = async (user: User) => {
    if (
      !window.confirm(
        `¿Está seguro de que desea eliminar al usuario "${user.name}"? Esta acción no se puede deshacer.`
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_USER_DELETE_URL(user.userId), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(
          data?.message || data?.errors?.[0] || "No se pudo eliminar el usuario"
        );
      }

      fetchItems();
    } catch (error: any) {
      alert(error.message || "Error al eliminar el usuario");
    }
  };
  */

  const texto = filtro.trim().toLowerCase();

  const itemsFiltrados = items.filter((item) => {
    if (!texto) return true;

    return [
      item.userId,
      item.name,
      item.documentId,
      item.email,
      item.postJob,
      item.id_roll ?? "",
      item.active ? "activo" : "inactivo",
      item.verifyEmail ? "verificado" : "no verificado",
    ].some((valor) =>
      String(valor ?? "").toLowerCase().includes(texto)
    );
  });

  const totalPaginas = Math.max(
    1,
    Math.ceil(itemsFiltrados.length / POR_PAGINA)
  );

  useEffect(() => {
    onTotalPages?.(totalPaginas);
  }, [totalPaginas, onTotalPages]);

  const paginaActual = Math.min(
    Math.max(1, currentPage),
    totalPaginas
  );

  const itemsPagina = itemsFiltrados.slice(
    (paginaActual - 1) * POR_PAGINA,
    paginaActual * POR_PAGINA
  );

  return (
    <>
      {editingUser && (
        <FormCreateUser
          open={!!editingUser}
          onOpenChange={(abierto) => {
            if (!abierto) setEditingUser(null);
          }}
          initialData={editingUser}
          onUserCreated={() => {
            setEditingUser(null);
            fetchItems();
          }}
        />
      )}

      <div className="w-full overflow-hidden rounded-3xl border border-[#E8DFD1] shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-2-navbar text-white">
                <th className="sticky top-0 z-10 whitespace-nowrap bg-green-2-navbar px-5 py-2.5 text-left text-sm font-semibold">
                  Nombre
                </th>
                <th className="sticky top-0 z-10 whitespace-nowrap bg-green-2-navbar px-5 py-2.5 text-left text-sm font-semibold">
                  Documento
                </th>
                <th className="sticky top-0 z-10 whitespace-nowrap bg-green-2-navbar px-5 py-2.5 text-left text-sm font-semibold">
                  Correo
                </th>
                <th className="sticky top-0 z-10 whitespace-nowrap bg-green-2-navbar px-5 py-2.5 text-left text-sm font-semibold">
                  Cargo
                </th>
                <th className="sticky top-0 z-10 whitespace-nowrap bg-green-2-navbar px-5 py-2.5 text-left text-sm font-semibold">
                  Estado
                </th>
                <th className="sticky top-0 z-10 whitespace-nowrap bg-green-2-navbar px-5 py-2.5 text-center text-sm font-semibold">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#E8DFD1]/60 bg-white">
              {cargando ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-8 text-center text-sm text-[#9A8B7A]"
                  >
                    Cargando usuarios...
                  </td>
                </tr>
              ) : itemsPagina.length > 0 ? (
                itemsPagina.map((item) => (
                  <tr
                    key={item.userId}
                    className="transition-colors hover:bg-[#F8F5EF]"
                  >
                    <td className="whitespace-nowrap px-5 py-2.5 text-sm font-medium text-[#3A2A1A]">
                      {item.name}
                    </td>

                    <td className="whitespace-nowrap px-5 py-2.5 text-sm text-[#3A2A1A]">
                      {item.documentId}
                    </td>

                    <td className="px-5 py-2.5 text-sm text-[#3A2A1A]">
                      {item.email}
                    </td>

                    <td className="whitespace-nowrap px-5 py-2.5 text-sm text-[#3A2A1A]">
                      {item.postJob}
                    </td>

                    <td className="whitespace-nowrap px-5 py-2.5 text-sm">
                      <span
                        className={`font-semibold ${
                          item.active
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {item.active ? "Activo" : "Inactivo"}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-5 py-2.5 text-sm text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingUser(item)}
                          title="Editar (ver todos los campos)"
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
                      ? "No se encontraron usuarios con ese criterio."
                      : "No hay usuarios registrados."}
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