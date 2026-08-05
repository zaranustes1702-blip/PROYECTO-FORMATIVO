"use client";

import { useEffect, useState } from "react";

export default function TablaEggProduction() {
    const [eggProductions, setEggProductions] = useState<any[]>([]);

    useEffect(() => {
        const fetchEggProductions = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3000/api/egg-productions/EggProductionAll"
                );

                const resJson = await response.json();

                setEggProductions(resJson.data || []);
            } catch (error) {
                console.error("Error:", error);
                setEggProductions([]);
            }
        };

        fetchEggProductions();
    }, []);

    return (
        <div className="p-4 bg-white rounded-lg shadow border border-border overflow-x-auto">

            <h2 className="text-xl font-semibold mb-4 text-title">
                Lista de Producción de Huevos
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
                            Lote
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Aves
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Responsable
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Rol
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Recolectados AM
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Recolectados PM
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Jumbo
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            AAA
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            AA
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            A
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            B
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            C
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Huevos Rotos
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Total Día
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Huevos Buenos
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Total Semana
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            % Producción
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

                    {eggProductions.length > 0 ? (

                        eggProductions.map((egg: any) => (

                            <tr
                                key={egg.id}
                                className="hover:bg-fond transition-colors"
                            >

                                <td className="border border-border px-4 py-2 text-title">
                                    {egg.id}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {egg.productionDate}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {egg.productionHour}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {egg.batch}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {egg.birdQuantity}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {egg.responsible}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {egg.responsibleRole}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {egg.collectedAM}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {egg.collectedPM}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {egg.jumboEggs}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {egg.aaaEggs}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {egg.aaEggs}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {egg.aEggs}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {egg.bEggs}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {egg.cEggs}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {egg.brokenEggs}
                                </td>
                                <td className="border border-border px-4 py-2 text-title">
                                    {egg.totalDay}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {egg.goodEggs}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {egg.weeklyEggTotal}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {egg.productionPercentage}%
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {egg.observations}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {egg.active ? "Activo" : "Inactivo"}
                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan={24}
                                className="border border-border px-4 py-6 text-center text-title"
                            >
                                No hay registros de producción de huevos.
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>
    );
}