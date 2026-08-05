"use client";

import { useEffect, useState } from "react";

export default function TablaHealth() {

    const [healths, setHealths] = useState<any[]>([]);

    useEffect(() => {

        const fetchHealths = async () => {

            try {

                const response = await fetch(
                    "http://localhost:3000/api/health/HealthAll"
                );

                const resJson = await response.json();

                setHealths(resJson.data || []);

            } catch (error) {

                console.error("Error:", error);
                setHealths([]);

            }

        };

        fetchHealths();

    }, []);

    return (

        <div className="p-4 bg-white rounded-lg shadow border border-border overflow-x-auto">

            <h2 className="text-xl font-semibold mb-4 text-title">
                Lista de Registros de Salud
            </h2>

            <table className="w-full border-collapse">

                <thead>

                    <tr className="bg-green-2-navbar text-white">

                        <th className="border border-border px-4 py-2 text-left">
                            ID
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Fecha de Detección
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Lote Afectado
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Síntomas
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Diagnóstico
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Tratamiento
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Responsable
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Fecha de Recuperación
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Estado
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {healths.length > 0 ? (

                        healths.map((health: any) => (

                            <tr
                                key={health.id}
                                className="hover:bg-fond transition-colors"
                            >

                                <td className="border border-border px-4 py-2 text-title">
                                    {health.id}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {health.detectionDate}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {health.affectedBatch}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {health.symptoms}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {health.diagnosis}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {health.treatment}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {health.responsiblePerson}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {health.recoveryDate}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {health.active ? "Activo" : "Inactivo"}
                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan={9}
                                className="border border-border px-4 py-6 text-center text-title"
                            >
                                No hay registros de salud.
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );

}