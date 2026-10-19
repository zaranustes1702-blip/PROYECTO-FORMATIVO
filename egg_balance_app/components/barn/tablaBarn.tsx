"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    const fetchBarns = async () => {
      try {
        const token = localStorage.getItem("token");

        // El backend devuelve 10 por defecto; pedimos más para buscar y paginar
        const response = await fetch(
          "http://localhost:3000/api/barns/BarnAll?limit=500",
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
        setBarns(
          Array.isArray(lista)
            ? [...lista].sort((a: any, b: any) => b.id - a.id)
            : []
        );
      } catch (error) {
        console.error("Error al obtener galpones:", error);
        setBarns([]);
      }
    };

    fetchBarns();
  }, [refreshKey]);

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
  }, [totalPaginas]);

  const paginaActual = Math.min(currentPage, totalPaginas);
  const barnsPagina = barnsFiltrados.slice(
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
                Nombre
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                Tamaño
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                Capacidad Máxima
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm">
                Estado
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E8DFD1]/60 bg-white">
            {barnsPagina.length > 0 ? (
              barnsPagina.map((barn: any) => (
                <tr key={barn.id}>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] font-medium">
                    {barn.id}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A]">
                    {barn.barnName}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A]">
                    {barn.barnSize}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A]">
                    {barn.maxBirdCapacity}
                  </td>
                  <td className="px-6 py-3.5 text-sm">
                    <span
                      className={`font-semibold ${
                        barn.active ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {barn.active ? "Activo" : "Inactivo"}
                    </span>
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
  );
}
