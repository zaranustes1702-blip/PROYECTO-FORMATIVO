"use client";

import { useEffect, useState } from "react";

export default function TablaVisit() {

    const [visits, setVisits] = useState<any[]>([]);

    useEffect(() => {

        const fetchVisits = async () => {

            try {

                const response = await fetch(
                    "http://localhost:3000/api/visits/VisitAll"
                );

                const resJson = await response.json();

                console.log(resJson.data);

                setVisits(resJson.data || []);

            } catch (error) {

                console.error("Error:", error);
                setVisits([]);

            }

        };

        fetchVisits();

    }, []);

    return (

        <div className="p-4 bg-white rounded-lg shadow border border-border overflow-x-auto">

            <h2 className="text-xl font-semibold mb-4 text-title">
                Lista de Visitas
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
                            Visitante
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Institución
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Motivo
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Observaciones
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Responsable
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Estado
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {visits.length > 0 ? (

                        visits.map((visit: any, index: number) => (

                            <tr
                                key={visit.id || index}
                                className="hover:bg-fond transition-colors"
                            >

                                <td className="border border-border px-4 py-2 text-title">
                                    {visit.id}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {visit.visitDate}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {visit.visitorName}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {visit.institutionOrganization || visit.institution}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {visit.visitReason}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {visit.observations}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {visit.responsiblePerson}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {visit.active ? "Activo" : "Inactivo"}
                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan={8}
                                className="border border-border px-4 py-6 text-center text-title"
                            >
                                No hay visitas registradas.
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );

}