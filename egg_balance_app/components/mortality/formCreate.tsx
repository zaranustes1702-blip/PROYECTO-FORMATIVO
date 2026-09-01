"use client";

import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import { API_MORTALITY_URL } from "@/api/config";

export default function FormCreateMortality() {
  const [mortalityDate, setMortalityDate] = useState("");
  const [mortalityTime, setMortalityTime] = useState("");
  const [dailyMortality, setDailyMortality] = useState("");
  const [possibleCauseOfDeath, setPossibleCauseOfDeath] = useState("");
  const [necropsyPerformed, setNecropsyPerformed] = useState("false");
  const [observations, setObservations] = useState("");
  const [lotId, setLotId] = useState("");
  const [responsibleId, setResponsibleId] = useState("");
  const [active, setActive] = useState(true);

  // Listados para cargar llaves foráneas (Lote y Responsable)
  const [lotes, setLotes] = useState<any[]>([]);
  const [responsables, setResponsables] = useState<any[]>([]);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");

  useEffect(() => {
    // Carga de lotes y responsables para los selects
    const cargarDatosRelacionados = async () => {
      try {
        const [resLotes, resResp] = await Promise.all([
          fetch("http://localhost:3000/api/lots/LotAll"),
          fetch("http://localhost:3000/api/responsibles/ResponsibleAll"),
        ]);

        if (resLotes.ok) {
          const dataLotes = await resLotes.json();
          setLotes(Array.isArray(dataLotes) ? dataLotes : dataLotes.data || []);
        }

        if (resResp.ok) {
          const dataResp = await resResp.json();
          setResponsables(Array.isArray(dataResp) ? dataResp : dataResp.data || []);
        }
      } catch (error) {
        console.error("Error al cargar datos foráneos:", error);
      }
    };

    cargarDatosRelacionados();
  }, []);

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
    setLotId("");
    setResponsibleId("");
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
            lotId: lotId ? Number(lotId) : null,
            responsibleId: responsibleId ? Number(responsibleId) : null,
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
                <div className="border-border rounded-lg border bg-green-50 px-4 py-3 text-green-1-navbar font-semibold">
                  {mensajeExito}
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* LOTE */}
                <div>
                  <label
                    htmlFor="lotId"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Lote de Aves
                  </label>
                  <select
                    id="lotId"
                    value={lotId}
                    onChange={(event) => setLotId(event.target.value)}
                    required
                    className="border-border w-full rounded-lg border bg-white px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  >
                    <option value="">Seleccione un lote</option>
                    {lotes.map((lote: any, index: number) => (
                      <option
                        key={lote.id || lote.Id_Lote || index}
                        value={lote.id || lote.Id_Lote}
                      >
                        Lote #{lote.id || lote.Id_Lote} - {lote.Raz_Ave_Lote || lote.breed || "Aves"}
                      </option>
                    ))}
                  </select>
                </div>

                {/* RESPONSABLE */}
                <div>
                  <label
                    htmlFor="responsibleId"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Responsable
                  </label>
                  <select
                    id="responsibleId"
                    value={responsibleId}
                    onChange={(event) => setResponsibleId(event.target.value)}
                    required
                    className="border-border w-full rounded-lg border bg-white px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  >
                    <option value="">Seleccione un responsable</option>
                    {responsables.map((resp: any, index: number) => (
                      <option
                        key={resp.id || resp.Id_Responsable || index}
                        value={resp.id || resp.Id_Responsable}
                      >
                        {resp.name || resp.Nom_Responsable || "Responsable"} ({resp.role || resp.Tipo_Responsable || "Personal"})
                      </option>
                    ))}
                  </select>
                </div>

                {/* FECHA */}
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

                {/* HORA */}
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

                {/* CANTIDAD DE MORTALIDAD */}
                <div>
                  <label
                    htmlFor="dailyMortality"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Mortalidad del día (Aves)
                  </label>
                  <input
                    id="dailyMortality"
                    type="number"
                    min="1"
                    value={dailyMortality}
                    onChange={(event) => setDailyMortality(event.target.value)}
                    placeholder="Cantidad de aves muertas"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                {/* POSIBLE CAUSA */}
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
                    maxLength={100}
                    value={possibleCauseOfDeath}
                    onChange={(event) =>
                      setPossibleCauseOfDeath(event.target.value)
                    }
                    placeholder="Ejemplo: Estrés calórico / Problemas respiratorios"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                {/* NECROPSIA */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="necropsyPerformed"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Necropsia / Toma de muestra realizada
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
                    <option value="false">No</option>
                    <option value="true">Sí</option>
                  </select>
                </div>

                {/* OBSERVACIONES */}
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

                {/* ESTADO ACTIVO */}
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