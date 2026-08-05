"use client";

import { useEffect, useState } from "react";

export default function TablaWeighing() {

    const [weighings, setWeighings] = useState<any[]>([]);

    useEffect(() => {

        const fetchWeighings = async () => {

            try {

                const response = await fetch(
                    "http://localhost:3000/api/weighings/WeighingsAll"
                );

                const resJson = await response.json();

                setWeighings(resJson.data || []);

            } catch (error) {

                console.error("Error:", error);
                setWeighings([]);

            }

        };

        fetchWeighings();

    }, []);

    return (

        <div className="p-4 bg-white rounded-lg shadow border border-border overflow-x-auto">

            <h2 className="text-xl font-semibold mb-4 text-title">
                Lista de Pesajes
            </h2>

            <table className="w-full border-collapse">

                <thead>

                    <tr className="bg-green-2-navbar text-white">

                        <th className="border border-border px-4 py-2 text-left">
                            ID
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Fecha
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Hora
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Responsable
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Aves Pesadas
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Peso Total (Kg)
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Peso Promedio (g)
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Uniformidad (%)
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Estado
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {weighings.length > 0 ? (

                        weighings.map((weighing: any) => (

                            <tr
                                key={weighing.id}
                                className="hover:bg-fond transition-colors"
                            >

                                <td className="border border-border px-4 py-2 text-title">
                                    {weighing.id}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {weighing.weighingDate}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {weighing.weighingTime}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {weighing.responsiblePerson}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {weighing.weighedBirds}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {weighing.totalWeightKg}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {weighing.averageWeightGrams}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {weighing.batchUniformityPercentage}%
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {weighing.active ? "Activo" : "Inactivo"}
                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan={9}
                                className="border border-border px-4 py-6 text-center text-title"
                            >
                                No hay registros de pesajes.
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );

}