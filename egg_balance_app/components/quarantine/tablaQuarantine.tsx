"use client";

import { useEffect, useState } from "react";

export default function TablaQuarantine() {

    const [quarantines, setQuarantines] = useState<any[]>([]);

    useEffect(() => {

        const fetchQuarantines = async () => {

            try {

                const response = await fetch(
                    "http://localhost:3000/api/quarantines/QuarantineAll"
                );

                const resJson = await response.json();

                setQuarantines(resJson.data || []);

            } catch (error) {

                console.error("Error:", error);
                setQuarantines([]);

            }

        };

        fetchQuarantines();

    }, []);

    return (

        <div className="p-4 bg-white rounded-lg shadow border border-border overflow-x-auto">

            <h2 className="text-xl font-semibold mb-4 text-title">
                Lista de Cuarentenas
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
                            Aves Afectadas
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
                            Dosis
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Fecha de Finalización
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Estado
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {quarantines.length > 0 ? (

                        quarantines.map((quarantine: any) => (

                            <tr
                                key={quarantine.id}
                                className="hover:bg-fond transition-colors"
                            >

                                <td className="border border-border px-4 py-2 text-title">
                                    {quarantine.id}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {quarantine.quarantineDate}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {quarantine.affectedBirds}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {quarantine.symptoms}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {quarantine.diagnosis}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {quarantine.treatment}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {quarantine.dose}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {quarantine.endDate}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {quarantine.active ? "Activo" : "Inactivo"}
                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan={9}
                                className="border border-border px-4 py-6 text-center text-title"
                            >
                                No hay registros de cuarentena.
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );

}