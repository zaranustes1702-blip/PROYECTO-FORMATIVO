"use client";

import React, { useState } from "react";
import NavBar from "@/components/NavBar";
//import {API_USER_URL} from "@/api/config";//

export default function AdminUsuariosPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [documentId, setDocumentId] = useState("");
    const [postJob, setPostJob] = useState("Administrador");

    const [verifyEmail, setVerifyEmail] = useState(false);
    const [active, setActive] = useState(true);

    const [modalAbierto, setModalAbierto] = useState<boolean>(false);
    const [guardando, setGuardando] = useState<boolean>(false);
    const [mensajeExito, setMensajeExito] = useState<string | null>(null);



    return (
        <div className="p-4 max-w-xl bg-white rounded-lg shadow border border-border">

            <h1 className="text-xl font-semibold mb-4 text-title">
                Formulario de Usuario
            </h1>

            <form className="flex flex-col gap-3">

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Nombre Completo
                    </label>

                    <input
                        type="text"
                        name="fullName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Nombre de Usuario
                    </label>

                    <input
                        type="text"
                        name="userName"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Correo Electrónico
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Contraseña
                    </label>

                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Rol
                    </label>

                    <select
                        name="role"
                        value={postJob}
                        onChange={(e) => setPostJob(e.target.value)}
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    >
                        <option value="">Seleccione un rol</option>
                        <option value="Administrador">Administrador</option>
                        <option value="Instructor">Instructor</option>
                        <option value="Aprendiz">Aprendiz</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-green-1-navbar text-white py-2 rounded hover:bg-green-2-navbar transition"
                >
                    Crear Usuario
                </button>

            </form>

        </div>
    );
}