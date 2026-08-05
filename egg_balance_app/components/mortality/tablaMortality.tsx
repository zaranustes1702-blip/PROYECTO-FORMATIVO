"use client";

import { useEffect, useState } from "react";

export default function TablaMortality() {

    const [mortalities, setMortalities] = useState<any[]>([]);

    useEffect(() => {

        const fetchMortalities = async () => {

            try {

                const response = await fetch(
                    "http://localhost:3000/api/mortalities/MortalityAll"
                );

                const resJson = await response.json();

                setMortalities(resJson.data || []);

            } catch (error) {

                console.error("Error:", error);
                setMortalities([]);

            }

        };

        fetchMortalities();

    }, []);

    return (

        <div className="p-4 bg-white rounded-lg shadow border border-border overflow-x-auto">

            <h2 className="text-xl font-semibold mb-4 text-title">
                Lista de Mortalidad
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
                            Mortalidad del Día
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Posible Causa
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Necropsia
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Observaciones
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Estado
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {mortalities.length > 0 ? (

                        mortalities.map((mortality: any) => (

                            <tr
                                key={mortality.id}
                                className="hover:bg-fond transition-colors"
                            >

                                <td className="border border-border px-4 py-2 text-title">
                                    {mortality.id}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {mortality.mortalityDate}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {mortality.mortalityTime}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {mortality.dailyMortality}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {mortality.possibleCauseOfDeath}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {mortality.necropsyPerformed ? "Sí" : "No"}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {mortality.observations}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {mortality.active ? "Activo" : "Inactivo"}
                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan={8}
                                className="border border-border px-4 py-6 text-center text-title"
                            >
                                No hay registros de mortalidad.
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );

}