"use client";

import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import { API_SUPPLY_URL } from "@/api/config";

export default function FormCreateSupply() {
  const [id, setId] = useState("");
  const [supplyType, setSupplyType] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [supplyName, setSupplyName] = useState("");
  const [unitMeasure, setUnitMeasure] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitValue, setUnitValue] = useState("");
  const [totalValue, setTotalValue] = useState("");
  const [reference, setReference] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [balance, setBalance] = useState("");
  const [observations, setObservations] = useState("");
  const [weight, setWeight] = useState("");
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
    setId("");
    setSupplyType("");
    setEntryDate("");
    setSupplyName("");
    setUnitMeasure("");
    setQuantity("");
    setUnitValue("");
    setTotalValue("");
    setReference("");
    setExpirationDate("");
    setBalance("");
    setObservations("");
    setWeight("");
    setActive(true);
  };

  const guardarSuministro = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setGuardando(true);
    setMensajeExito("");

    try {
      const respuesta = await fetch(
        `${API_SUPPLY_URL}/CreateSupply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            supplyType,
            entryDate,
            supplyName,
            unitMeasure,
            quantity: Number(quantity),
            unitValue: Number(unitValue),
            totalValue: Number(totalValue),
            reference,
            expirationDate: expirationDate || null,
            balance: Number(balance),
            observations,
            weight: Number(weight),
            active,
          }),
        }
      );

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          resultado.message ||
            resultado.mensaje ||
            "No se pudo registrar el suministro"
        );
      }

      setMensajeExito("Suministro registrado correctamente");
      limpiarFormulario();

      setTimeout(() => {
        setModalAbierto(false);
        setMensajeExito("");
      }, 1500);
    } catch (error) {
      console.error("Error al registrar el suministro:", error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Ocurrió un error al registrar el suministro");
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
                Gestión de Suministros
              </h1>

              <p className="text-parrafo mt-2">
                Registra y administra el inventario e insumos de la granja.
              </p>
            </div>

            <button
              type="button"
              onClick={abrirModal}
              className="bg-green-1-navbar text-white rounded-lg px-5 py-3 font-semibold shadow-md transition hover:bg-green-2-navbar"
            >
              Crear suministro
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-title text-xl font-semibold">
              Registro de suministros
            </h2>

            <p className="text-parrafo mt-2">
              Presiona el botón Crear suministro para agregar un registro.
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
                  Registrar suministro
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

            <form onSubmit={guardarSuministro} className="space-y-6 px-6 py-6">
              {mensajeExito && (
                <div className="border-border rounded-lg border bg-green-50 px-4 py-3 text-green-1-navbar">
                  {mensajeExito}
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="id"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    ID
                  </label>

                  <input
                    id="id"
                    type="text"
                    value={id}
                    onChange={(event) => setId(event.target.value)}
                    placeholder="Código o identificador"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="supplyType"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Tipo de suministro
                  </label>

                  <input
                    id="supplyType"
                    type="text"
                    value={supplyType}
                    onChange={(event) => setSupplyType(event.target.value)}
                    placeholder="Ejemplo: Alimento, Vacuna, Material"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

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
                    htmlFor="supplyName"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Nombre del suministro
                  </label>

                  <input
                    id="supplyName"
                    type="text"
                    value={supplyName}
                    onChange={(event) => setSupplyName(event.target.value)}
                    placeholder="Nombre del producto o insumo"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="unitMeasure"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Unidad de medida
                  </label>

                  <input
                    id="unitMeasure"
                    type="text"
                    value={unitMeasure}
                    onChange={(event) => setUnitMeasure(event.target.value)}
                    placeholder="Ejemplo: kg, bulto, litro, unidad"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="quantity"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Cantidad
                  </label>

                  <input
                    id="quantity"
                    type="number"
                    min="0"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                    placeholder="Cantidad ingresada"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="unitValue"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Valor unitario
                  </label>

                  <input
                    id="unitValue"
                    type="number"
                    min="0"
                    step="0.01"
                    value={unitValue}
                    onChange={(event) => setUnitValue(event.target.value)}
                    placeholder="Precio por unidad"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="totalValue"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Valor total
                  </label>

                  <input
                    id="totalValue"
                    type="number"
                    min="0"
                    step="0.01"
                    value={totalValue}
                    onChange={(event) => setTotalValue(event.target.value)}
                    placeholder="Costo total acumulado"
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="reference"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Referencia
                  </label>

                  <input
                    id="reference"
                    type="text"
                    value={reference}
                    onChange={(event) => setReference(event.target.value)}
                    placeholder="Referencia de factura o lote"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="expirationDate"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Fecha de vencimiento (opcional)
                  </label>

                  <input
                    id="expirationDate"
                    type="date"
                    value={expirationDate}
                    onChange={(event) => setExpirationDate(event.target.value)}
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="balance"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Saldo
                  </label>

                  <input
                    id="balance"
                    type="number"
                    min="0"
                    value={balance}
                    onChange={(event) => setBalance(event.target.value)}
                    placeholder="Stock restante / saldo"
                    required
                    className="border-border w-full rounded-lg border px-4 py-3 outline-none transition focus:ring-2 focus:ring-green-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="weight"
                    className="text-title mb-2 block text-sm font-semibold"
                  >
                    Peso (opcional)
                  </label>

                  <input
                    id="weight"
                    type="number"
                    min="0"
                    step="0.01"
                    value={weight}
                    onChange={(event) => setWeight(event.target.value)}
                    placeholder="Peso en kg"
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
                    placeholder="Detalles sobre el proveedor, empaque o entrega"
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
                      Suministro activo
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
                  {guardando ? "Guardando..." : "Guardar suministro"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}