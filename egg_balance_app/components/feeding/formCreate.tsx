"use client";

import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import { API_FEEDING_URL } from "@/api/config";

export default function FormCreateFeeding() {
  const [feedingDate, setFeedingDate] = useState("");
  const [dailyConsumptionKg, setDailyConsumptionKg] = useState("");
  const [remainingKg, setRemainingKg] = useState("");
  const [remainingBags, setRemainingBags] = useState("");
  const [shift, setShift] = useState("");
  const [responsiblePerson, setResponsiblePerson] = useState("");
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
    setFeedingDate("");
    setDailyConsumptionKg("");
    setRemainingKg("");
    setRemainingBags("");
    setShift("");
    setResponsiblePerson("");
    setActive(true);
  };

  const guardarAlimentacion = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setGuardando(true);
    setMensajeExito("");

    try {
      const respuesta = await fetch(
        `${API_FEEDING_URL}/CreateFeeding`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            feedingDate,
            dailyConsumptionKg: Number(dailyConsumptionKg),
            remainingKg: Number(remainingKg),
            remainingBags: Number(remainingBags),
            shift,
            responsiblePerson,
            active,
          }),
        }
      );

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          resultado.message ||
            resultado.mensaje ||
            "No se pudo registrar la alimentación"
        );
      }

      setMensajeExito("Alimentación registrada correctamente");
      limpiarFormulario();

      setTimeout(() => {
        setModalAbierto(false);
        setMensajeExito("");
      }, 1500);
    } catch (error) {
      console.error("Error al registrar la alimentación:", error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Ocurrió un error al registrar la alimentación");
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
                Gestión de Alimentación
              </h1>

              <p className="text-parrafo mt-2">
                Registra y administra el consumo y control de alimento.
              </p>
            </div>

            <button
              type="button"
              onClick={abrirModal}
              className="bg-green-1-navbar text-white rounded-lg px-5 py-3 font-semibold shadow-md transition hover:bg-green-2-navbar"
            >
              Crear alimentación
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-title text-xl font-semibold">
              Registro de alimentación
            </h2>

            <p className="text-parrafo mt-2">
              Presiona el botón Crear alimentación para agregar un registro.
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
                  Registrar alimentación
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

            <form onSubmit={guardarAlimentacion} className="space-y-6 px-6 py-6">
              {mensajeExito && (
                <div className="border-border rounded-lg border bg-green-50 px-4 py-3 text-green-1-navbar">
                  {mensajeExito}
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="feedingDate"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Fecha de alimentación
                  </label>

                  <input
                    id="feedingDate"
                    type="date"
                    value={feedingDate}
                    onChange={(event) => setFeedingDate(event.target.value)}
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="shift"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Turno
                  </label>

                  <select
                    id="shift"
                    value={shift}
                    onChange={(event) => setShift(event.target.value)}
                    required
                    className="border-border w-full rounded-lg border bg-white px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  >
                    <option value="">Seleccione un turno</option>
                    <option value="Mañana">Mañana</option>
                    <option value="Tarde">Tarde</option>
                    <option value="Noche">Noche</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="dailyConsumptionKg"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Consumo diario (kg)
                  </label>

                  <input
                    id="dailyConsumptionKg"
                    type="number"
                    min="0"
                    step="0.01"
                    value={dailyConsumptionKg}
                    onChange={(event) =>
                      setDailyConsumptionKg(event.target.value)
                    }
                    placeholder="Consumo en kg"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="remainingKg"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Alimento restante (kg)
                  </label>

                  <input
                    id="remainingKg"
                    type="number"
                    min="0"
                    step="0.01"
                    value={remainingKg}
                    onChange={(event) => setRemainingKg(event.target.value)}
                    placeholder="Alimento restante en kg"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="remainingBags"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Bultos restantes
                  </label>

                  <input
                    id="remainingBags"
                    type="number"
                    min="0"
                    value={remainingBags}
                    onChange={(event) => setRemainingBags(event.target.value)}
                    placeholder="Cantidad de bultos"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="responsiblePerson"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Persona responsable
                  </label>

                  <input
                    id="responsiblePerson"
                    type="text"
                    maxLength={100}
                    value={responsiblePerson}
                    onChange={(event) =>
                      setResponsiblePerson(event.target.value)
                    }
                    placeholder="Nombre del responsable"
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
                      Alimentación activa
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
                  {guardando ? "Guardando..." : "Guardar alimentación"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}