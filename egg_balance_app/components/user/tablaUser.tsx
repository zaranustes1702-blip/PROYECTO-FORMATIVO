"use client";

import { useEffect, useState } from "react";
import { API_USER_ALL_URL } from "@/api/config";

const POR_PAGINA = 10;

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
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem("token");

        // El backend devuelve 10 por defecto; pedimos más para buscar y paginar
        const response = await fetch(`${API_USER_ALL_URL}?limit=500`, {
          method: "GET",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        const resJson = await response.json();

        // Tu clase Response devuelve los datos en resJson.info
        const lista = resJson.info || resJson.data || [];
        // Más recientes primero (descendente por ID)
        setItems(
          Array.isArray(lista)
            ? [...lista].sort((a: any, b: any) => b.userId - a.userId)
            : []
        );
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        setItems([]);
      }
    };

    fetchItems();
  }, [refreshKey]);

  // Búsqueda en id, nombre, documento, correo, cargo y estado
  const texto = filtro.trim().toLowerCase();

  const itemsFiltrados = items.filter((item: any) => {
    if (!texto) return true;

    return [
      String(item.userId),
      String(item.name),
      String(item.documentId),
      String(item.email),
      String(item.postJob),
      item.active ? "activo" : "inactivo"
    ].some((valor) => (valor ?? "").toString().toLowerCase().includes(texto));
  });

  const totalPaginas = Math.max(1, Math.ceil(itemsFiltrados.length / POR_PAGINA));

  useEffect(() => {
    if (onTotalPages) {
      onTotalPages(totalPaginas);
    }
  }, [totalPaginas]);

  const paginaActual = Math.min(currentPage, totalPaginas);
  const itemsPagina = itemsFiltrados.slice(
    (paginaActual - 1) * POR_PAGINA,
    paginaActual * POR_PAGINA
  );

  return (
    <div className="w-full overflow-hidden rounded-3xl shadow-sm border border-[#E8DFD1]">
      {/* Contenedor con scroll: los títulos quedan fijos al bajar */}
      <div className="max-h-[60vh] overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-2-navbar text-white">
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                ID
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                Nombre
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                Documento
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                Correo
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                Cargo
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                Estado
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E8DFD1]/60 bg-white">
            {itemsPagina.length > 0 ? (
              itemsPagina.map((item: any) => (
                <tr key={item.userId}>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] font-medium">
                    {item.userId}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A]">
                    {item.name}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A]">
                    {item.documentId}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A]">
                    {item.email}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A]">
                    {item.postJob}
                  </td>
                  <td className="px-6 py-3.5 text-sm">
                    <span
                      className={`font-semibold ${
                        item.active ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {item.active ? "Activo" : "Inactivo"}
                    </span>
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
  );
}
