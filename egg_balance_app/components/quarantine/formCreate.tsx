"use client";

import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import { API_QUARANTINE_URL } from "@/api/config";

export default function FormCreateQuarantine() {
  const [quarantineDate, setQuarantineDate] = useState("");
  const [affectedBirds, setAffectedBirds] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatmentApplied, setTreatmentApplied] = useState("");
  const [dosage, setDosage] = useState("");
  const [treatmentDuration, setTreatmentDuration] = useState("");
  const [observations, setObservations] = useState("");
  const [quarantineEndDate, setQuarantineEndDate] = useState("");
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
    setQuarantineDate("");
    setAffectedBirds("");
    setSymptoms("");
    setDiagnosis("");
    setTreatmentApplied("");
    setDosage("");
    setTreatmentDuration("");
    setObservations("");
    setQuarantineEndDate("");
    setActive(true);
  };

  const guardarCuarentena = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setGuardando(true);
    setMensajeExito("");

    try {
      const respuesta = await fetch(
        `${API_QUARANTINE_URL}/CreateQuarantine`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quarantineDate,
            affectedBirds: Number(affectedBirds),
            symptoms,
            diagnosis,
            treatmentApplied,
            dosage,
            treatmentDuration,
            observations,
            quarantineEndDate: quarantineEndDate || null,
            active,
          }),
        }
      );

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          resultado.message ||
            resultado.mensaje ||
            "No se pudo registrar la cuarentena"
        );
      }

      setMensajeExito("Cuarentena registrada correctamente");
      limpiarFormulario();

      setTimeout(() => {
        setModalAbierto(false);
        setMensajeExito("");
      }, 1500);
    } catch (error) {
      console.error("Error al registrar la cuarentena:", error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Ocurrió un error al registrar la cuarentena");
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
                Gestión de Cuarentena
              </h1>

              <p className="text-parrafo mt-2">
                Registra y haz seguimiento al aislamiento y tratamiento de aves.
              </p>
            </div>

            <button
              type="button"
              onClick={abrirModal}
              className="bg-green-1-navbar text-white rounded-lg px-5 py-3 font-semibold shadow-md transition hover:bg-green-2-navbar"
            >
              Crear cuarentena
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-title text-xl font-semibold">
              Registro de cuarentena
            </h2>

            <p className="text-parrafo mt-2">
              Presiona el botón Crear cuarentena para agregar un registro.
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
                  Registrar cuarentena
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

            <form onSubmit={guardarCuarentena} className="space-y-6 px-6 py-6">
              {mensajeExito && (
                <div className="border-border rounded-lg border bg-green-50 px-4 py-3 text-green-1-navbar">
                  {mensajeExito}
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="quarantineDate"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Fecha de cuarentena
                  </label>

                  <input
                    id="quarantineDate"
                    type="date"
                    value={quarantineDate}
                    onChange={(event) => setQuarantineDate(event.target.value)}
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="affectedBirds"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Aves afectadas
                  </label>

                  <input
                    id="affectedBirds"
                    type="number"
                    min="1"
                    value={affectedBirds}
                    onChange={(event) => setAffectedBirds(event.target.value)}
                    placeholder="Cantidad de aves afectadas"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="symptoms"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Síntomas
                  </label>

                  <input
                    id="symptoms"
                    type="text"
                    value={symptoms}
                    onChange={(event) => setSymptoms(event.target.value)}
                    placeholder="Síntomas observados"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="diagnosis"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Diagnóstico
                  </label>

                  <input
                    id="diagnosis"
                    type="text"
                    value={diagnosis}
                    onChange={(event) => setDiagnosis(event.target.value)}
                    placeholder="Diagnóstico preliminar o final"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="treatmentApplied"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Tratamiento aplicado
                  </label>

                  <input
                    id="treatmentApplied"
                    type="text"
                    value={treatmentApplied}
                    onChange={(event) => setTreatmentApplied(event.target.value)}
                    placeholder="Medicamentos o medidas"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="dosage"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Dosificación
                  </label>

                  <input
                    id="dosage"
                    type="text"
                    value={dosage}
                    onChange={(event) => setDosage(event.target.value)}
                    placeholder="Ejemplo: 2ml por litro de agua"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="treatmentDuration"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Duración del tratamiento
                  </label>

                  <input
                    id="treatmentDuration"
                    type="text"
                    value={treatmentDuration}
                    onChange={(event) => setTreatmentDuration(event.target.value)}
                    placeholder="Ejemplo: 5 días"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="quarantineEndDate"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Fecha de finalización (opcional)
                  </label>

                  <input
                    id="quarantineEndDate"
                    type="date"
                    value={quarantineEndDate}
                    onChange={(event) => setQuarantineEndDate(event.target.value)}
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
                    value={observations}
                    onChange={(event) => setObservations(event.target.value)}
                    placeholder="Notas o evolución del aislamiento"
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
                      Cuarentena activa
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
                  {guardando ? "Guardando..." : "Guardar cuarentena"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}