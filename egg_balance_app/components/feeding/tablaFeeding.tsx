"use client";

import { useEffect, useState } from "react";

export default function TablaFeeding() {

    const [feedings, setFeedings] = useState<any[]>([]);

    useEffect(() => {

        const fetchFeedings = async () => {

            try {

                const response = await fetch(
                    "http://localhost:3000/api/feedings/FeedingAll"
                );

                const resJson = await response.json();

                setFeedings(resJson.data || []);

            } catch (error) {

                console.error("Error:", error);
                setFeedings([]);

            }

        };

        fetchFeedings();

    }, []);

    return (

        <div className="p-4 bg-white rounded-lg shadow border border-border overflow-x-auto">

            <h2 className="text-xl font-semibold mb-4 text-title">
                Lista de Alimentación
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
                            Consumo Diario (Kg)
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Saldo (Kg)
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Saldo (Bultos)
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Responsable
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Turno
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Estado
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {feedings.length > 0 ? (

                        feedings.map((feeding: any) => (

                            <tr
                                key={feeding.id}
                                className="hover:bg-fond transition-colors"
                            >

                                <td className="border border-border px-4 py-2 text-title">
                                    {feeding.id}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {feeding.feedingDate}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {feeding.dailyConsumptionKg}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {feeding.remainingKg}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {feeding.remainingBags}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {feeding.responsiblePerson}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {feeding.shift}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {feeding.active ? "Activo" : "Inactivo"}
                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan={8}
                                className="border border-border px-4 py-6 text-center text-title"
                            >
                                No hay registros de alimentación.
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );

}