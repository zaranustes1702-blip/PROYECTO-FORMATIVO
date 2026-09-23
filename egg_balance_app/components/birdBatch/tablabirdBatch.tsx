"use client";

import { useEffect, useState } from "react";

export default function TablaBirdBatch() {

    const [birdBatches, setBirdBatches] = useState<any[]>([]);

    useEffect(() => {

        const fetchBirdBatches = async () => {

            try {

                const response = await fetch(
                    "http://localhost:3000/api/bird-batches/BirdBatchAll"
                );

                const resJson = await response.json();

                setBirdBatches(resJson.data || []);

            } catch (error) {

                console.error("Error:", error);
                setBirdBatches([]);

            }

        };

        fetchBirdBatches();

    }, []);

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return "—";
        // Extrae directamente 'YYYY-MM-DD' para evitar desfases de zona horaria UTC
        const cleanDate = dateStr.split("T")[0];
        const [year, month, day] = cleanDate.split("-");
        if (day && month && year) {
            return `${day}/${month}/${year}`; // Formato legible: DD/MM/AAAA
        }
        return dateStr;
    };

    return (

        <div className="p-4 bg-white rounded-lg shadow border border-border overflow-x-auto">

            <h2 className="text-xl font-semibold mb-4 text-title">
                Lista de Lotes de Aves
            </h2>

            <table className="w-full border-collapse">

                <thead>

                    <tr className="bg-green-2-navbar text-white">

                        <th className="border border-border px-4 py-2 text-left">
                            ID
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Fecha de Ingreso
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Número de Lote
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Cantidad de Aves
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Peso del Lote (Kg)
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Edad (Semanas)
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Vacunas Aplicadas
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Estado
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {birdBatches.length > 0 ? (

                        birdBatches.map((batch: any, index: number) => (

                            <tr
                                key={batch.id || `batch-${index}`}
                                className="hover:bg-fond transition-colors"
                            >

                                <td className="border border-border px-4 py-2 text-title">
                                    {batch.id}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {formatDate(batch.entryDate)}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {batch.batchNumber}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {batch.birdQuantity}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {batch.batchWeight}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {batch.birdAgeWeeks}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {batch.appliedVaccines}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {batch.active ? "Activo" : "Inactivo"}
                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan={8}
                                className="border border-border px-4 py-6 text-center text-title"
                            >
                                No hay lotes de aves registrados.
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );

}