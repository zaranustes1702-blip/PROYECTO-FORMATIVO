"use client";

import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import { API_MORTALITY_URL } from "@/api/config";

export default function FormCreateMortality() {
  const [mortalityDate, setMortalityDate] = useState("");
  const [mortalityTime, setMortalityTime] = useState("");
  const [dailyMortality, setDailyMortality] = useState("");
  const [possibleCauseOfDeath, setPossibleCauseOfDeath] = useState("");
  const [necropsyPerformed, setNecropsyPerformed] = useState("false");
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
    setMortalityDate("");
    setMortalityTime("");
    setDailyMortality("");
    setPossibleCauseOfDeath("");
    setNecropsyPerformed("false");
    setObservations("");
    setActive(true);
  };

  const guardarMortalidad = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setGuardando(true);
    setMensajeExito("");

    try {
      const respuesta = await fetch(
        `${API_MORTALITY_URL}/CreateMortality`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mortalityDate,
            mortalityTime,
            dailyMortality: Number(dailyMortality),
            possibleCauseOfDeath,
            necropsyPerformed: necropsyPerformed === "true",
            observations,
            active,
          }),
        }
      );

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          resultado.message ||
            resultado.mensaje ||
            "No se pudo registrar la mortalidad"
        );
      }

      setMensajeExito("Mortalidad registrada correctamente");
      limpiarFormulario();

      setTimeout(() => {
        setModalAbierto(false);
        setMensajeExito("");
      }, 1500);
    } catch (error) {
      console.error("Error al registrar la mortalidad:", error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Ocurrió un error al registrar la mortalidad");
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
                Gestión de Mortalidad
              </h1>

              <p className="text-parrafo mt-2">
                Registra y analiza las bajas diarias y causas de mortalidad.
              </p>
            </div>

            <button
              type="button"
              onClick={abrirModal}
              className="bg-green-1-navbar text-white rounded-lg px-5 py-3 font-semibold shadow-md transition hover:bg-green-2-navbar"
            >
              Crear registro de mortalidad
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-title text-xl font-semibold">
              Registros de mortalidad
            </h2>

            <p className="text-parrafo mt-2">
              Presiona el botón Crear registro de mortalidad para agregar un registro.
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
                  Registrar mortalidad
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

            <form onSubmit={guardarMortalidad} className="space-y-6 px-6 py-6">
              {mensajeExito && (
                <div className="border-border rounded-lg border bg-green-50 px-4 py-3 text-green-1-navbar">
                  {mensajeExito}
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="mortalityDate"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Fecha
                  </label>

                  <input
                    id="mortalityDate"
                    type="date"
                    value={mortalityDate}
                    onChange={(event) => setMortalityDate(event.target.value)}
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="mortalityTime"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Hora
                  </label>

                  <input
                    id="mortalityTime"
                    type="time"
                    value={mortalityTime}
                    onChange={(event) => setMortalityTime(event.target.value)}
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="dailyMortality"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Mortalidad del día
                  </label>

                  <input
                    id="dailyMortality"
                    type="number"
                    min="0"
                    value={dailyMortality}
                    onChange={(event) => setDailyMortality(event.target.value)}
                    placeholder="Cantidad de aves"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="possibleCauseOfDeath"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Posible causa
                  </label>

                  <input
                    id="possibleCauseOfDeath"
                    type="text"
                    maxLength={25}
                    value={possibleCauseOfDeath}
                    onChange={(event) =>
                      setPossibleCauseOfDeath(event.target.value)
                    }
                    placeholder="Ejemplo: Problemas respiratorios"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="necropsyPerformed"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Necropsia realizada
                  </label>

                  <select
                    id="necropsyPerformed"
                    value={necropsyPerformed}
                    onChange={(event) =>
                      setNecropsyPerformed(event.target.value)
                    }
                    required
                    className="border-border w-full rounded-lg border bg-white px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  >
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                  </select>
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
                    value={observations}
                    onChange={(event) => setObservations(event.target.value)}
                    placeholder="Detalles u observaciones adicionales"
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
                      Registro activo
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
                  {guardando ? "Guardando..." : "Guardar registro"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}