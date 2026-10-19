"use client";

import { useEffect, useState } from "react";
import { API_STOCK_ENTRY_ALL_URL } from "@/api/config";

const POR_PAGINA = 10;

interface TablaStockEntryProps {
  filtro?: string;
  refreshKey?: number;
  currentPage?: number;
  onTotalPages?: (total: number) => void;
}

export default function TablaStockEntry({
  filtro = "",
  refreshKey = 0,
  currentPage = 1,
  onTotalPages,
}: TablaStockEntryProps) {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem("token");

        // El backend devuelve 10 por defecto; pedimos más para buscar y paginar
        const response = await fetch(`${API_STOCK_ENTRY_ALL_URL}?limit=500`, {
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
            ? [...lista].sort((a: any, b: any) => b.id_stockEntry - a.id_stockEntry)
            : []
        );
      } catch (error) {
        console.error("Error al obtener entradas de insumos:", error);
        setItems([]);
      }
    };

    fetchItems();
  }, [refreshKey]);

  // Muestra la fecha como dd/mm/aaaa (ej: 12/09/2026)
  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "—";

    const cleanDate = dateStr.split("T")[0];
    const [year, month, day] = cleanDate.split("-");

    if (day && month && year) {
      return `${day}/${month}/${year}`;
    }

    return dateStr;
  };

  const formatNumber = (valor: string | number | null | undefined) =>
    valor === null || valor === undefined ? "—" : Number(valor).toFixed(2);

  const formatMoney = (valor: string | number | null | undefined) =>
    valor === null || valor === undefined ? "—" : `$${Number(valor).toFixed(2)}`;

  // Tipo de insumo con tilde para mostrarlo
  const tipoInsumo = (tipo?: string | null) =>
    tipo === "alimentacion" ? "Alimentación" : tipo === "medicamentos" ? "Medicamentos" : "—";

  // Búsqueda en id, insumo, tipo, galpón, cantidad inicial, salida, disponible, unidad, vencimiento, precio unitario, precio total y estado
  const texto = filtro.trim().toLowerCase();

  const itemsFiltrados = items.filter((item: any) => {
    if (!texto) return true;

    return [
      String(item.id_stockEntry),
      String(item.supply?.supplyName ?? item.id_supply),
      String(tipoInsumo(item.supply?.supplyType)),
      String(item.barn?.barnName ?? item.id_barn),
      String(formatNumber(item.cantidad_inicial)),
      String(formatNumber(item.cantidad_salida)),
      String(formatNumber(item.disponible_entrada)),
      String(item.unid_entrada),
      String(formatDate(item.vencimiento)),
      String(formatMoney(item.precio_unitario)),
      String(formatMoney(item.precio_total)),
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
        <table className="w-full min-w-max border-collapse">
          <thead>
            <tr className="bg-green-2-navbar text-white">
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                ID
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                Insumo
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                Tipo
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                Galpón
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                Cantidad Inicial
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                Salida
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                Disponible
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                Unidad
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                Vencimiento
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                Precio Unitario
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                Precio Total
              </th>
              <th className="sticky top-0 z-10 bg-green-2-navbar px-6 py-3.5 text-left font-semibold text-sm whitespace-nowrap">
                Estado
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E8DFD1]/60 bg-white">
            {itemsPagina.length > 0 ? (
              itemsPagina.map((item: any) => (
                <tr key={item.id_stockEntry}>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] font-medium whitespace-nowrap">
                    {item.id_stockEntry}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {item.supply?.supplyName ?? item.id_supply}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {tipoInsumo(item.supply?.supplyType)}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {item.barn?.barnName ?? item.id_barn}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {formatNumber(item.cantidad_inicial)}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {formatNumber(item.cantidad_salida)}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] font-semibold whitespace-nowrap">
                    {formatNumber(item.disponible_entrada)}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {item.unid_entrada}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {formatDate(item.vencimiento)}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {formatMoney(item.precio_unitario)}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-[#3A2A1A] whitespace-nowrap">
                    {formatMoney(item.precio_total)}
                  </td>
                  <td className="px-6 py-3.5 text-sm whitespace-nowrap">
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
                  colSpan={12}
                  className="px-6 py-8 text-center text-sm text-[#9A8B7A]"
                >
                  {texto
                    ? "No se encontraron entradas de insumos con ese criterio."
                    : "No hay entradas de insumos registradas."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
