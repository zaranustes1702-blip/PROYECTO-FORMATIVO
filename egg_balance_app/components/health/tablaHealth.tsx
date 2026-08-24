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

                console.log("Respuesta API:", resJson);

                setHealths(
                    resJson.data || []
                );

            } catch (error) {

                console.error(
                    "Error:",
                    error
                );

                setHealths([]);

            }

        };

        fetchHealths();

    }, []);


    return (

        <div className="p-4 bg-white rounded-lg shadow border border-border overflow-x-auto">

            <h2 className="text-xl font-semibold mb-4 text-title">
                Lista de Registros de Sanidad
            </h2>

            <table className="w-full border-collapse">

                <thead>

                    <tr className="bg-green-2-navbar text-white">

                        <th className="border border-border px-4 py-2 text-left">
                            ID
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Fecha de Sanidad
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Cantidad de Vacunas
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Nombre de la Vacuna
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {healths.length > 0 ? (

                        healths.map(
                            (health: any) => (

                                <tr
                                    key={health.id}
                                    className="hover:bg-fond transition-colors"
                                >

                                    <td className="border border-border px-4 py-2 text-title">
                                        {health.id}
                                    </td>

                                    <td className="border border-border px-4 py-2 text-title">
                                        {health.healthDate}
                                    </td>

                                    <td className="border border-border px-4 py-2 text-title">
                                        {health.vaccineQuantity}
                                    </td>

                                    <td className="border border-border px-4 py-2 text-title">
                                        {health.vaccineName}
                                    </td>

                                </tr>

                            )
                        )

                    ) : (

                        <tr>

                            <td
                                colSpan={4}
                                className="border border-border px-4 py-6 text-center text-title"
                            >
                                No hay registros de sanidad.
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );

}