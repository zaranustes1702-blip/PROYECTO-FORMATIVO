"use client";

import React, { useState } from "react";
import { API_RESPONSIBLE_URL } from "@/api/config";

export default function FormCreateResponsible() {
  const [fullName, setFullName] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [trainingRecord, setTrainingRecord] = useState("");
  const [role, setRole] = useState("");
  const [responsibleType, setResponsibleType] = useState("");
  const [active, setActive] = useState(true);

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
    setFullName("");
    setDocumentNumber("");
    setTrainingRecord("");
    setRole("");
    setResponsibleType("");
    setActive(true);
  };

  const guardarResponsable = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setGuardando(true);
    setMensajeExito("");

    try {
      const respuesta = await fetch(
        `${API_RESPONSIBLE_URL}/CreateResponsible`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName,
            documentNumber,
            trainingRecord,
            role,
            responsibleType,
            active,
          }),
        }
      );

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          resultado.message ||
            resultado.mensaje ||
            "No se pudo registrar el responsable"
        );
      }

      setMensajeExito("Responsable registrado correctamente");
      limpiarFormulario();

      setTimeout(() => {
        setModalAbierto(false);
        setMensajeExito("");
      }, 1500);
    } catch (error) {
      console.error("Error al registrar el responsable:", error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Ocurrió un error al registrar el responsable");
      }
    } finally {
      setGuardando(false);
    }
  };

  return (
    <>
      <section className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Gestión de Responsables
            </h1>

            <p className="mt-2 text-gray-600">
              Registra las personas responsables de las actividades.
            </p>
          </div>

          <button
            type="button"
            onClick={abrirModal}
            className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-green-700"
          >
            Crear responsable
          </button>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">
            Registro de responsables
          </h2>

          <p className="mt-2 text-gray-600">
            Presiona Crear responsable para agregar un nuevo registro.
          </p>
        </div>
      </section>

      {modalAbierto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
          <div className="max-h-[95vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Registrar responsable
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Completa la información solicitada.
                </p>
              </div>

              <button
                type="button"
                onClick={cerrarModal}
                disabled={guardando}
                className="rounded-lg px-3 py-2 text-2xl font-bold text-gray-500 transition hover:bg-gray-100 disabled:opacity-50"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={guardarResponsable}
              className="space-y-6 px-6 py-6"
            >
              {mensajeExito && (
                <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700">
                  {mensajeExito}
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Nombre completo
                  </label>

                  <input
                    id="fullName"
                    type="text"
                    maxLength={100}
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Nombre completo del responsable"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="documentNumber"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Número de documento
                  </label>

                  <input
                    id="documentNumber"
                    type="text"
                    maxLength={30}
                    value={documentNumber}
                    onChange={(event) =>
                      setDocumentNumber(event.target.value)
                    }
                    placeholder="Documento de identidad"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="trainingRecord"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Número de ficha
                  </label>

                  <input
                    id="trainingRecord"
                    type="text"
                    maxLength={50}
                    value={trainingRecord}
                    onChange={(event) =>
                      setTrainingRecord(event.target.value)
                    }
                    placeholder="Ficha de formación"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="role"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Rol o cargo
                  </label>

                  <input
                    id="role"
                    type="text"
                    maxLength={100}
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                    placeholder="Ejemplo: Encargado del galpón"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="responsibleType"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Tipo de responsable
                  </label>

                  <select
                    id="responsibleType"
                    value={responsibleType}
                    onChange={(event) =>
                      setResponsibleType(event.target.value)
                    }
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="Instructor">Instructor</option>
                    <option value="Aprendiz">Aprendiz</option>
                    <option value="Pasante">Pasante</option>
                    <option value="Gestor">Gestor</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={(event) => setActive(event.target.checked)}
                      className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />

                    <span className="text-sm font-semibold text-gray-700">
                      Responsable activo
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={cerrarModal}
                  disabled={guardando}
                  className="rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={guardando}
                  className="rounded-lg bg-green-600 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-green-700 disabled:opacity-50"
                >
                  {guardando ? "Guardando..." : "Guardar responsable"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}