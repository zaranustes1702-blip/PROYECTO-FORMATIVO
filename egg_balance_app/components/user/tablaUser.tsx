"use client";

import { useEffect, useState } from "react";

export default function TablaUser() {

    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {

        const fetchUsers = async () => {

            try {

                const response = await fetch(
                    "http://localhost:3000/api/users/UserAll"
                );

                const resJson = await response.json();

                console.log(resJson.data);

                setUsers(resJson.data || []);

            } catch (error) {

                console.error("Error:", error);
                setUsers([]);

            }

        };

        fetchUsers();

    }, []);

    return (

        <div className="p-4 bg-white rounded-lg shadow border border-border overflow-x-auto">

            <h2 className="text-xl font-semibold mb-4 text-title">
                Lista de Usuarios
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
                            Correo
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Cargo
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Correo Verificado
                        </th>

                        <th className="border border-border px-4 py-2 text-left">
                            Estado
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {users.length > 0 ? (

                        users.map((user: any, index: number) => (

                            <tr
                                key={`user-row-${index}-${user.id || user.uuid || index}`}
                                className="hover:bg-fond transition-colors"
                            >

                                <td className="border border-border px-4 py-2 text-title">
                                    {user.id || user.uuid}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {user.name}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {user.documentId}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {user.email}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {user.postJob}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {user.verifyEmail ? "Sí" : "No"}
                                </td>

                                <td className="border border-border px-4 py-2 text-title">
                                    {user.active ? "Activo" : "Inactivo"}
                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan={7}
                                className="border border-border px-4 py-6 text-center text-title"
                            >
                                No hay usuarios registrados.
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );

}