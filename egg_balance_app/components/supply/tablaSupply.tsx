"use client";

import { useEffect, useState } from "react";

export default function TableSupply() {
    const [supplies, setSupplies] = useState<any[]>([]);

    useEffect(() => {
        const fetchSupplies = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/supplies/SupplyAll");
                const resJson = await response.json();

                setSupplies(resJson.data || []);
            } catch (error) {
                console.error("Error:", error);
                setSupplies([]);
            }
        };

        fetchSupplies();
    }, []);

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return "—";
        const cleanDate = dateStr.split("T")[0];
        const [year, month, day] = cleanDate.split("-");
        if (day && month && year) {
            return `${day}/${month}/${year}`;
        }
        return dateStr;
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow border border-border overflow-x-auto">

            <h2 className="text-xl font-semibold mb-4 text-title">
                Lista de Insumos
            </h2>

            <table className="w-full border-collapse">

                <thead>
                    <tr className="bg-green-2-navbar text-white">

                        <th className="border border-border px-4 py-2 text-left">
                            ID
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Tipo
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Fecha Ingreso
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Nombre
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Unidad
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Cantidad
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Valor Unitario
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Valor Total
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Referencia
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Vencimiento
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Saldo
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Peso
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Observaciones
                        </th>

                    </tr>
                </thead>

                <tbody>

                    {supplies.length > 0 ? (
                        supplies.map((supply: any, index: number) => (
                            <tr
                                key={`supply-${supply.id || index}`}
                                className="hover:bg-fond transition-colors"
                            >

                                <td className="border border-border px-4 py-2 text-title">
                                    {supply.id}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {supply.supplyType}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {formatDate(supply.entryDate)}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {supply.supplyName}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {supply.unitMeasure}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {supply.quantity}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    ${supply.unitValue}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    ${supply.totalValue}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {supply.reference}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {formatDate(supply.expirationDate)}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {supply.balance}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {supply.weight || "—"}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {supply.observations || "—"}
                                </td>

                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={13}
                                className="border border-border px-4 py-6 text-center text-title"
                            >
                                No hay insumos registrados.
                            </td>
                        </tr>
                    )}

                </tbody>

            </table>

        </div>
    );
}