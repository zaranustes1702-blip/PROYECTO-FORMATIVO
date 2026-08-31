"use client";

import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import { API_USER_URL } from "@/api/config";

export default function FormCreateUser() {
  const [name, setName] = useState("");
  const [uuid, setUuid] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [postJob, setPostJob] = useState("");
  const [idroll, setIdroll] = useState("");
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [active, setActive] = useState(false);
  const [solicitoNewPassword, setSolicitoNewPassword] = useState(false);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");

  const abrirModal = () => {
    setMensajeExito("");
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    if (guardando) {
      return;
    }

    setModalAbierto(false);
  };

  const limpiarFormulario = () => {
    setName("");
    setUuid("");
    setEmail("");
    setPassword("");
    setDocumentId("");
    setPostJob("");
    setIdroll("");
    setVerifyEmail(false);
    setActive(false);
    setSolicitoNewPassword(false);
  };

  const guardarUsuario = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setGuardando(true);
    setMensajeExito("");

    try {
      const respuesta = await fetch(
        `${API_USER_URL}/CreateUser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            uuid: uuid || null,
            email,
            password,
            documentId,
            postJob,
            idroll: idroll ? Number(idroll) : null,
            verifyEmail,
            active,
            solicito_newPassword: solicitoNewPassword,
          }),
        }
      );

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          resultado.message ||
            resultado.mensaje ||
            "No se pudo registrar el usuario"
        );
      }

      setMensajeExito("Usuario registrado correctamente");
      limpiarFormulario();

      setTimeout(() => {
        setModalAbierto(false);
        setMensajeExito("");
      }, 1500);
    } catch (error) {
      console.error("Error al registrar el usuario:", error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Ocurrió un error al registrar el usuario");
      }
    } finally {
      setGuardando(false);
    }
  };

  return (
    <>
      <NavBar />

      <main className="min-h-screen bg-fond">
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-title text-3xl font-bold">
                Gestión de Usuarios
              </h1>

              <p className="text-parrafo mt-2">
                Registra y administra las cuentas y permisos del personal.
              </p>
            </div>

            <button
              type="button"
              onClick={abrirModal}
              className="bg-green-1-navbar text-white rounded-lg px-5 py-3 font-semibold shadow-md transition hover:bg-green-2-navbar"
            >
              Crear usuario
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-title text-xl font-semibold">
              Registro de usuarios
            </h2>

            <p className="text-parrafo mt-2">
              Presiona el botón Crear usuario para agregar un registro.
            </p>
          </div>
        </section>
      </main>

      {modalAbierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
          <div className="bg-white max-h-[95vh] w-full max-w-3xl overflow-y-auto rounded-xl shadow-2xl">
            <div className="border-border flex items-center justify-between border-b px-6 py-4">
              <div>
                <h2 className="text-title text-2xl font-bold">
                  Registrar usuario
                </h2>

                <p className="text-parrafo mt-1 text-sm">
                  Completa la información solicitada.
                </p>
              </div>

              <button
                type="button"
                onClick={cerrarModal}
                disabled={guardando}
                className="text-title rounded-lg px-3 py-2 text-2xl font-bold transition hover:bg-fond disabled:opacity-50"
              >
                ×
              </button>
            </div>

            <form onSubmit={guardarUsuario} className="space-y-6 px-6 py-6">
              {mensajeExito && (
                <div className="border-border rounded-lg border bg-green-50 px-4 py-3 text-green-1-navbar">
                  {mensajeExito}
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Nombre
                  </label>

                  <input
                    id="name"
                    type="text"
                    maxLength={50}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Nombre completo"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="uuid"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    UUID (opcional)
                  </label>

                  <input
                    id="uuid"
                    type="text"
                    maxLength={45}
                    value={uuid}
                    onChange={(event) => setUuid(event.target.value)}
                    placeholder="Identificador único"
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Correo electrónico
                  </label>

                  <input
                    id="email"
                    type="email"
                    maxLength={50}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="correo@ejemplo.com"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Contraseña
                  </label>

                  <input
                    id="password"
                    type="password"
                    maxLength={50}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="••••••••"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="documentId"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Documento de identidad
                  </label>

                  <input
                    id="documentId"
                    type="text"
                    maxLength={30}
                    value={documentId}
                    onChange={(event) => setDocumentId(event.target.value)}
                    placeholder="Número de documento"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="postJob"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Cargo
                  </label>

                  <select
                    id="postJob"
                    value={postJob}
                    onChange={(event) => setPostJob(event.target.value)}
                    required
                    className="border-border w-full rounded-lg border bg-white px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  >
                    <option value="">Seleccione un cargo</option>
                    <option value="Aprendiz">Aprendiz</option>
                    <option value="Instructor">Instructor</option>
                    <option value="Gestor">Gestor</option>
                    <option value="Gestor líder">Gestor líder</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="idroll"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    ID del rol (opcional)
                  </label>

                  <input
                    id="idroll"
                    type="number"
                    min="1"
                    value={idroll}
                    onChange={(event) => setIdroll(event.target.value)}
                    placeholder="Ejemplo: 1"
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div className="flex flex-col gap-4 md:col-span-2">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={verifyEmail}
                      onChange={(event) => setVerifyEmail(event.target.checked)}
                      className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />

                    <span className="text-title text-sm font-semibold">
                      Correo verificado
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={(event) => setActive(event.target.checked)}
                      className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />

                    <span className="text-title text-sm font-semibold">
                      Usuario activo
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={solicitoNewPassword}
                      onChange={(event) =>
                        setSolicitoNewPassword(event.target.checked)
                      }
                      className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />

                    <span className="text-title text-sm font-semibold">
                      Solicita nueva contraseña
                    </span>
                  </label>
                </div>
              </div>

              <div className="border-border flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={cerrarModal}
                  disabled={guardando}
                  className="text-title rounded-lg border border-gray-300 px-5 py-3 font-semibold transition hover:bg-fond disabled:opacity-50"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={guardando}
                  className="bg-green-1-navbar text-white rounded-lg px-5 py-3 font-semibold shadow-md transition hover:bg-green-2-navbar disabled:opacity-50"
                >
                  {guardando ? "Guardando..." : "Guardar usuario"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}