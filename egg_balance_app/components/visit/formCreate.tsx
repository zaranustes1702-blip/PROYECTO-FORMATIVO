"use client";

import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import { API_VISIT_URL } from "@/api/config";

export default function FormCreateVisit() {
  const [visitDate, setVisitDate] = useState("");
  const [visitorName, setVisitorName] = useState("");
  const [institution, setInstitution] = useState("");
  const [visitReason, setVisitReason] = useState("");
  const [responsiblePerson, setResponsiblePerson] = useState("");
  const [observations, setObservations] = useState("");
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
    setVisitDate("");
    setVisitorName("");
    setInstitution("");
    setVisitReason("");
    setResponsiblePerson("");
    setObservations("");
    setActive(true);
  };

  const guardarVisita = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setGuardando(true);
    setMensajeExito("");

    try {
      const respuesta = await fetch(`${API_VISIT_URL}/CreateVisit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          visitDate,
          visitorName,
          institution,
          visitReason,
          responsiblePerson,
          observations,
          active,
        }),
      });

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          resultado.message ||
            resultado.mensaje ||
            "No se pudo registrar la visita"
        );
      }

      setMensajeExito("Visita registrada correctamente");
      limpiarFormulario();

      setTimeout(() => {
        setModalAbierto(false);
        setMensajeExito("");
      }, 1500);
    } catch (error) {
      console.error("Error al registrar la visita:", error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Ocurrió un error al registrar la visita");
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
                Gestión de Visitas
              </h1>

              <p className="text-parrafo mt-2">
                Registra y controla el ingreso de visitantes a las instalaciones.
              </p>
            </div>

            <button
              type="button"
              onClick={abrirModal}
              className="bg-green-1-navbar text-white rounded-lg px-5 py-3 font-semibold shadow-md transition hover:bg-green-2-navbar"
            >
              Crear visita
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-title text-xl font-semibold">
              Registro de visitas
            </h2>

            <p className="text-parrafo mt-2">
              Presiona el botón Crear visita para agregar un registro.
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
                  Registrar visita
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

            <form onSubmit={guardarVisita} className="space-y-6 px-6 py-6">
              {mensajeExito && (
                <div className="border-border rounded-lg border bg-green-50 px-4 py-3 text-green-1-navbar">
                  {mensajeExito}
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="visitDate"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Fecha
                  </label>

                  <input
                    id="visitDate"
                    type="date"
                    value={visitDate}
                    onChange={(event) => setVisitDate(event.target.value)}
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="visitorName"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Nombre del visitante
                  </label>

                  <input
                    id="visitorName"
                    type="text"
                    maxLength={100}
                    value={visitorName}
                    onChange={(event) => setVisitorName(event.target.value)}
                    placeholder="Nombre completo"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="institution"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Institución
                  </label>

                  <input
                    id="institution"
                    type="text"
                    maxLength={100}
                    value={institution}
                    onChange={(event) => setInstitution(event.target.value)}
                    placeholder="Empresa o entidad"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="responsiblePerson"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Responsable
                  </label>

                  <input
                    id="responsiblePerson"
                    type="text"
                    maxLength={100}
                    value={responsiblePerson}
                    onChange={(event) => setResponsiblePerson(event.target.value)}
                    placeholder="Persona que atiende la visita"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="visitReason"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Motivo de la visita
                  </label>

                  <input
                    id="visitReason"
                    type="text"
                    maxLength={255}
                    value={visitReason}
                    onChange={(event) => setVisitReason(event.target.value)}
                    placeholder="Objetivo o motivo de la visita"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="observations"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Observaciones
                  </label>

                  <textarea
                    id="observations"
                    rows={3}
                    maxLength={255}
                    value={observations}
                    onChange={(event) => setObservations(event.target.value)}
                    placeholder="Detalles adicionales o recomendaciones"
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={(event) => setActive(event.target.checked)}
                      className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />

                    <span className="text-title text-sm font-semibold">
                      Visita activa
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
                  {guardando ? "Guardando..." : "Guardar visita"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}