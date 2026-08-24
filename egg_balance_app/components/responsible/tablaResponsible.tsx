"use client";

import { useEffect, useState } from "react";

export default function TablaResponsible() {

    const [responsibles, setResponsibles] = useState<any[]>([]);

    useEffect(() => {

        const fetchResponsibles = async () => {

            try {

                const response = await fetch(
                    "http://localhost:3000/api/responsibles/ResponsibleAll"
                );

                const resJson = await response.json();

                setResponsibles(resJson.data || []);

            } catch (error) {

                console.error("Error:", error);
                setResponsibles([]);

            }

        };

        fetchResponsibles();

    }, []);

    return (

        <div className="p-4 bg-white rounded-lg shadow border border-border overflow-x-auto">

            <h2 className="text-xl font-semibold mb-4 text-title">
                Lista de Responsables
            </h2>

            <table className="w-full border-collapse">

                <thead>

                    <tr className="bg-green-2-navbar text-white">

                        <th className="border border-border px-4 py-2 text-left">
                            ID
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Nombre
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Documento
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Ficha
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Tipo
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Estado
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {responsibles.length > 0 ? (

                        responsibles.map((responsible: any) => (

                            <tr
                                key={responsible.id}
                                className="hover:bg-fond transition-colors"
                            >

                                <td className="border border-border px-4 py-2 text-title">
                                    {responsible.id}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {responsible.fullName}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {responsible.documentNumber}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {responsible.trainingRecord}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {responsible.responsibleType}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {responsible.active ? "Activo" : "Inactivo"}
                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan={7}
                                className="border border-border px-4 py-6 text-center text-title"
                            >
                                No hay responsables registrados.
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );

}