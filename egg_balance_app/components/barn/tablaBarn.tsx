"use client";

import { useEffect, useState } from "react";

export default function TablaBarn() {

    const [barns, setBarns] = useState<any[]>([]);

    useEffect(() => {

        const fetchBarns = async () => {

            try {

                const response = await fetch(
                    "http://localhost:3000/api/barns/BarnAll"
                );

                const resJson = await response.json();

                setBarns(resJson.data || []);

            } catch (error) {

                console.error("Error:", error);
                setBarns([]);

            }

        };

        fetchBarns();

    }, []);

    return (

        <div className="p-4 bg-white rounded-lg shadow border border-border overflow-x-auto">

            <h2 className="text-xl font-semibold mb-4 text-title">
                Lista de Galpones
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
                            Tamaño
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Capacidad Máxima
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Raza de Ave
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {barns.length > 0 ? (

                        barns.map((barn: any) => (

                            <tr
                                key={barn.id}
                                className="hover:bg-fond transition-colors"
                            >

                                <td className="border border-border px-4 py-2 text-title">
                                    {barn.id}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {barn.barnName}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {barn.barnSize}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {barn.maxBirdCapacity}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {barn.birdBreed}
                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan={5}
                                className="border border-border px-4 py-6 text-center text-title"
                            >
                                No hay galpones registrados.
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );

}