"use client";

import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import { API_BIRD_BATCH_URL } from "@/api/config";

export default function FormCreateBirdBatch() {
  const [entryDate, setEntryDate] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [birdQuantity, setBirdQuantity] = useState("");
  const [batchWeight, setBatchWeight] = useState("");
  const [birdAgeWeeks, setBirdAgeWeeks] = useState("");
  const [appliedVaccines, setAppliedVaccines] = useState("");
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
    setEntryDate("");
    setBatchNumber("");
    setBirdQuantity("");
    setBatchWeight("");
    setBirdAgeWeeks("");
    setAppliedVaccines("");
    setActive(true);
  };

  const guardarLote = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setGuardando(true);
    setMensajeExito("");

    try {
      const respuesta = await fetch(
        `${API_BIRD_BATCH_URL}/CreateBirdBatch`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            entryDate,
            batchNumber,
            birdQuantity: Number(birdQuantity),
            batchWeight: Number(batchWeight),
            birdAgeWeeks: Number(birdAgeWeeks),
            appliedVaccines,
            active,
          }),
        }
      );

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          resultado.message ||
            resultado.mensaje ||
            "No se pudo registrar el lote de aves"
        );
      }

      setMensajeExito("Lote de aves registrado correctamente");
      limpiarFormulario();

      setTimeout(() => {
        setModalAbierto(false);
        setMensajeExito("");
      }, 1500);
    } catch (error) {
      console.error("Error al registrar el lote de aves:", error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Ocurrió un error al registrar el lote de aves");
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
                Gestión de Lotes de Aves
              </h1>

              <p className="text-parrafo mt-2">
                Registra los lotes de aves que ingresan a la granja.
              </p>
            </div>

            <button
              type="button"
              onClick={abrirModal}
              className="bg-green-1-navbar text-white rounded-lg px-5 py-3 font-semibold shadow-md transition hover:bg-green-2-navbar"
            >
              Crear lote
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-title text-xl font-semibold">
              Registro de lotes
            </h2>

            <p className="text-parrafo mt-2">
              Presiona el botón Crear lote para agregar un nuevo registro.
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
                  Registrar lote de aves
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

            <form onSubmit={guardarLote} className="space-y-6 px-6 py-6">
              {mensajeExito && (
                <div className="border-border rounded-lg border bg-green-50 px-4 py-3 text-green-1-navbar">
                  {mensajeExito}
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="entryDate"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Fecha de ingreso
                  </label>

                  <input
                    id="entryDate"
                    type="date"
                    value={entryDate}
                    onChange={(event) => setEntryDate(event.target.value)}
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="batchNumber"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Número del lote
                  </label>

                  <input
                    id="batchNumber"
                    type="text"
                    maxLength={255}
                    value={batchNumber}
                    onChange={(event) => setBatchNumber(event.target.value)}
                    placeholder="Ejemplo: L001"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="birdQuantity"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Cantidad de aves
                  </label>

                  <input
                    id="birdQuantity"
                    type="number"
                    min="1"
                    value={birdQuantity}
                    onChange={(event) => setBirdQuantity(event.target.value)}
                    placeholder="Cantidad de aves"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="batchWeight"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Peso del lote (kg)
                  </label>

                  <input
                    id="batchWeight"
                    type="number"
                    min="0"
                    step="0.01"
                    value={batchWeight}
                    onChange={(event) => setBatchWeight(event.target.value)}
                    placeholder="Peso total del lote"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="birdAgeWeeks"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Edad de las aves en semanas
                  </label>

                  <input
                    id="birdAgeWeeks"
                    type="number"
                    min="0"
                    value={birdAgeWeeks}
                    onChange={(event) => setBirdAgeWeeks(event.target.value)}
                    placeholder="Edad en semanas"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="appliedVaccines"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Vacunas aplicadas
                  </label>

                  <input
                    id="appliedVaccines"
                    type="text"
                    maxLength={255}
                    value={appliedVaccines}
                    onChange={(event) =>
                      setAppliedVaccines(event.target.value)
                    }
                    placeholder="Ejemplo: Gumboro, Newcastle, Bronquitis"
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
                      Lote activo
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
                  {guardando ? "Guardando..." : "Guardar lote"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}