"use client";

import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import { API_WEIGHING_URL } from "@/api/config";

export default function FormCreateWeighing() {
  const [weighingId, setWeighingId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [responsible, setResponsible] = useState("");
  const [weighedHen, setWeighedHen] = useState("");
  const [totalWeightKg, setTotalWeightKg] = useState("");
  const [averageWeightGrams, setAverageWeightGrams] = useState("");
  const [batchUniformityPercentage, setBatchUniformityPercentage] = useState("");
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
    setWeighingId("");
    setDate("");
    setTime("");
    setResponsible("");
    setWeighedHen("");
    setTotalWeightKg("");
    setAverageWeightGrams("");
    setBatchUniformityPercentage("");
    setActive(true);
  };

  const guardarPesaje = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setGuardando(true);
    setMensajeExito("");

    try {
      const respuesta = await fetch(`${API_WEIGHING_URL}/CreateWeighing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          weighingId,
          date,
          time,
          responsible,
          weighedHen,
          totalWeightKg: Number(totalWeightKg),
          averageWeightGrams: Number(averageWeightGrams),
          batchUniformityPercentage: Number(batchUniformityPercentage),
          active,
        }),
      });

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          resultado.message ||
            resultado.mensaje ||
            "No se pudo registrar el pesaje"
        );
      }

      setMensajeExito("Pesaje registrado correctamente");
      limpiarFormulario();

      setTimeout(() => {
        setModalAbierto(false);
        setMensajeExito("");
      }, 1500);
    } catch (error) {
      console.error("Error al registrar el pesaje:", error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Ocurrió un error al registrar el pesaje");
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
                Gestión de Pesajes
              </h1>

              <p className="text-parrafo mt-2">
                Registra y controla el peso corporal y la uniformidad de las aves.
              </p>
            </div>

            <button
              type="button"
              onClick={abrirModal}
              className="bg-green-1-navbar text-white rounded-lg px-5 py-3 font-semibold shadow-md transition hover:bg-green-2-navbar"
            >
              Crear pesaje
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-title text-xl font-semibold">
              Registro de pesajes
            </h2>

            <p className="text-parrafo mt-2">
              Presiona el botón Crear pesaje para agregar un nuevo registro.
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
                  Registrar pesaje
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

            <form onSubmit={guardarPesaje} className="space-y-6 px-6 py-6">
              {mensajeExito && (
                <div className="border-border rounded-lg border bg-green-50 px-4 py-3 text-green-1-navbar">
                  {mensajeExito}
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="weighingId"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    ID del pesaje
                  </label>

                  <input
                    id="weighingId"
                    type="text"
                    value={weighingId}
                    onChange={(event) => setWeighingId(event.target.value)}
                    placeholder="Código o identificador"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="date"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Fecha
                  </label>

                  <input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="time"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Hora
                  </label>

                  <input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(event) => setTime(event.target.value)}
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="responsible"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Responsable
                  </label>

                  <input
                    id="responsible"
                    type="text"
                    maxLength={100}
                    value={responsible}
                    onChange={(event) => setResponsible(event.target.value)}
                    placeholder="Nombre del responsable"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="weighedHen"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Gallina pesada
                  </label>

                  <input
                    id="weighedHen"
                    type="text"
                    value={weighedHen}
                    onChange={(event) => setWeighedHen(event.target.value)}
                    placeholder="Identificación del lote o ave"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="totalWeightKg"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Peso total (kg)
                  </label>

                  <input
                    id="totalWeightKg"
                    type="number"
                    min="0"
                    step="0.01"
                    value={totalWeightKg}
                    onChange={(event) => setTotalWeightKg(event.target.value)}
                    placeholder="Peso en kilogramos"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="averageWeightGrams"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Peso promedio (g)
                  </label>

                  <input
                    id="averageWeightGrams"
                    type="number"
                    min="0"
                    step="0.01"
                    value={averageWeightGrams}
                    onChange={(event) =>
                      setAverageWeightGrams(event.target.value)
                    }
                    placeholder="Peso promedio en gramos"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="batchUniformityPercentage"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Uniformidad (%)
                  </label>

                  <input
                    id="batchUniformityPercentage"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={batchUniformityPercentage}
                    onChange={(event) =>
                      setBatchUniformityPercentage(event.target.value)
                    }
                    placeholder="Porcentaje de uniformidad"
                    required
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
                      Pesaje activo
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
                  {guardando ? "Guardando..." : "Guardar pesaje"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}