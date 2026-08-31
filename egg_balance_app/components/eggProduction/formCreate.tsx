"use client";

import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import { API_EGG_PRODUCTION_URL } from "@/api/config";

export default function FormCreateEggProduction() {
  const [productionDate, setProductionDate] = useState("");
  const [barnId, setBarnId] = useState("");
  const [responsible, setResponsible] = useState("");
  const [collectedAM, setCollectedAM] = useState("");
  const [collectedPM, setCollectedPM] = useState("");
  const [jumboEggs, setJumboEggs] = useState("");
  const [aaaEggs, setAaaEggs] = useState("");
  const [aaEggs, setAaEggs] = useState("");
  const [aEggs, setAEggs] = useState("");
  const [bEggs, setBEggs] = useState("");
  const [cEggs, setCEggs] = useState("");
  const [brokenEggs, setBrokenEggs] = useState("");
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
    setProductionDate("");
    setBarnId("");
    setResponsible("");
    setCollectedAM("");
    setCollectedPM("");
    setJumboEggs("");
    setAaaEggs("");
    setAaEggs("");
    setAEggs("");
    setBEggs("");
    setCEggs("");
    setBrokenEggs("");
    setObservations("");
    setActive(true);
  };

  const guardarProduccion = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setGuardando(true);
    setMensajeExito("");

    const totalDay =
      Number(collectedAM || 0) + Number(collectedPM || 0);

    const goodEggs =
      Number(jumboEggs || 0) +
      Number(aaaEggs || 0) +
      Number(aaEggs || 0) +
      Number(aEggs || 0) +
      Number(bEggs || 0) +
      Number(cEggs || 0);

    try {
      const respuesta = await fetch(
        `${API_EGG_PRODUCTION_URL}/CreateEggProduction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productionDate,
            barnId: Number(barnId),
            responsible,
            collectedAM: Number(collectedAM),
            collectedPM: Number(collectedPM),
            jumboEggs: Number(jumboEggs),
            aaaEggs: Number(aaaEggs),
            aaEggs: Number(aaEggs),
            aEggs: Number(aEggs),
            bEggs: Number(bEggs),
            cEggs: Number(cEggs),
            brokenEggs: Number(brokenEggs),
            totalDay,
            goodEggs,
            weeklyEggTotal: totalDay,
            productionPercentage: 0,
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
            "No se pudo registrar la producción"
        );
      }

      setMensajeExito("Producción registrada correctamente");

      limpiarFormulario();

      setTimeout(() => {
        setModalAbierto(false);
        setMensajeExito("");
      }, 1500);
    } catch (error) {
      console.error("Error al registrar la producción:", error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Ocurrió un error al registrar la producción");
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
                Gestión de Producción de Huevos
              </h1>

              <p className="text-parrafo mt-2">
                Registra y administra la recolección diaria de huevos.
              </p>
            </div>

            <button
              type="button"
              onClick={abrirModal}
              className="bg-green-1-navbar text-white rounded-lg px-5 py-3 font-semibold shadow-md transition hover:bg-green-2-navbar"
            >
              Crear producción
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-title text-xl font-semibold">
              Registro de producción
            </h2>

            <p className="text-parrafo mt-2">
              Presiona el botón Crear producción para agregar un registro.
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
                  Registrar producción de huevos
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

            <form onSubmit={guardarProduccion} className="space-y-6 px-6 py-6">
              {mensajeExito && (
                <div className="border-border rounded-lg border bg-green-50 px-4 py-3 text-green-1-navbar">
                  {mensajeExito}
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="productionDate"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Fecha
                  </label>

                  <input
                    id="productionDate"
                    type="date"
                    value={productionDate}
                    onChange={(event) => setProductionDate(event.target.value)}
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="barnId"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    ID del galpón
                  </label>

                  <input
                    id="barnId"
                    type="number"
                    min="1"
                    value={barnId}
                    onChange={(event) => setBarnId(event.target.value)}
                    placeholder="Ejemplo: 1"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div className="md:col-span-2">
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

                {[
                  { id: "collectedAM", label: "Recolectados AM", val: collectedAM, set: setCollectedAM },
                  { id: "collectedPM", label: "Recolectados PM", val: collectedPM, set: setCollectedPM },
                  { id: "jumboEggs", label: "Huevos Jumbo", val: jumboEggs, set: setJumboEggs },
                  { id: "aaaEggs", label: "Huevos AAA", val: aaaEggs, set: setAaaEggs },
                  { id: "aaEggs", label: "Huevos AA", val: aaEggs, set: setAaEggs },
                  { id: "aEggs", label: "Huevos A", val: aEggs, set: setAEggs },
                  { id: "bEggs", label: "Huevos B", val: bEggs, set: setBEggs },
                  { id: "cEggs", label: "Huevos C", val: cEggs, set: setCEggs },
                  { id: "brokenEggs", label: "Huevos rotos", val: brokenEggs, set: setBrokenEggs },
                ].map((item) => (
                  <div key={item.id}>
                    <label
                      htmlFor={item.id}
                      className="text-title mb-2 block text-sm font-semibold"
                    >
                      {item.label}
                    </label>

                    <input
                      id={item.id}
                      type="number"
                      min="0"
                      value={item.val}
                      onChange={(event) => item.set(event.target.value)}
                      placeholder="0"
                      required
                      className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                    />
                  </div>
                ))}

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
                    placeholder="Notas o detalles adicionales"
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
                      Producción activa
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
                  {guardando ? "Guardando..." : "Guardar producción"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}