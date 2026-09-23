"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { CirclePlus } from "lucide-react";
import { API_WEIGHING_URL } from "@/api/config";

export default function FormCreateWeighing() {
  const [open, setOpen] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const [formData, setFormData] = useState({
    weighingId: "",
    date: "",
    time: "",
    responsible: "",
    weighedHen: "",
    totalWeightKg: "",
    averageWeightGrams: "",
    batchUniformityPercentage: "",
    active: "true",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetInputs = () => {
    setFormData({
      weighingId: "",
      date: "",
      time: "",
      responsible: "",
      weighedHen: "",
      totalWeightKg: "",
      averageWeightGrams: "",
      batchUniformityPercentage: "",
      active: "true",
    });
  };

  const handleOpenChange = (nuevoEstado: boolean) => {
    if (guardando) return;
    setOpen(nuevoEstado);
    if (!nuevoEstado) {
      resetInputs();
      setMensajeExito("");
      setMensajeError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);
    setMensajeExito("");
    setMensajeError("");

    const datosEnviar = {
      weighingId: formData.weighingId.trim(),
      date: formData.date,
      time: formData.time,
      responsible: formData.responsible.trim(),
      weighedHen: formData.weighedHen.trim(),
      totalWeightKg: Number(formData.totalWeightKg) || 0,
      averageWeightGrams: Number(formData.averageWeightGrams) || 0,
      batchUniformityPercentage: Number(formData.batchUniformityPercentage) || 0,
      active: formData.active === "true",
    };

    try {
      const response = await fetch(`${API_WEIGHING_URL}/CreateWeighing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosEnviar),
      });

      let resultado: any = null;
      try {
        resultado = await response.json();
      } catch {
        // En caso de que no retorne JSON
      }

      if (!response.ok) {
        throw new Error(
          resultado?.message ||
            resultado?.mensaje ||
            resultado?.error ||
            `Error ${response.status}: No se pudo registrar el pesaje`
        );
      }

      setMensajeExito("¡Pesaje registrado correctamente!");
      resetInputs();

      setTimeout(() => {
        setOpen(false);
        setMensajeExito("");
      }, 1800);
    } catch (error: any) {
      console.error("Error al registrar pesaje:", error);
      setMensajeError(
        error.message || "Ocurrió un error inesperado al conectar con el servidor"
      );
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger className="inline-flex items-center text-green-1-navbar font-semibold hover:text-green-2-navbar cursor-pointer">
        <CirclePlus className="w-8 h-8 mr-2 text-green-1-navbar" />
        <span>Registrar Pesaje</span>
      </DialogTrigger>

      <DialogContent className="bg-white sm:max-w-[425px] md:max-w-[850px] max-h-[90vh] overflow-y-auto border border-border shadow-xl">
        <DialogHeader className="font-bold text-2xl text-center text-title">
          Registrar Pesaje
        </DialogHeader>
        <DialogDescription className="text-center text-parrafo">
          Complete los campos para registrar el peso corporal y la uniformidad de las aves.
        </DialogDescription>

        {mensajeExito && (
          <div className="w-full rounded-md border border-green-600 bg-green-50 p-3 text-center text-sm font-semibold text-green-800 animate-in fade-in">
            {mensajeExito}
          </div>
        )}

        {mensajeError && (
          <div className="w-full rounded-md border border-red-500 bg-red-50 p-3 text-center text-sm font-semibold text-red-700 animate-in fade-in">
            {mensajeError}
          </div>
        )}

        <form id="weighing-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="weighingId"
                className="block text-sm font-semibold text-title mb-1"
              >
                ID del Pesaje:
              </label>
              <input
                type="text"
                id="weighingId"
                name="weighingId"
                value={formData.weighingId}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Código o identificador"
              />
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-sm font-semibold text-title mb-1"
              >
                Fecha:
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              />
            </div>

            <div>
              <label
                htmlFor="time"
                className="block text-sm font-semibold text-title mb-1"
              >
                Hora:
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              />
            </div>

            <div>
              <label
                htmlFor="responsible"
                className="block text-sm font-semibold text-title mb-1"
              >
                Responsable:
              </label>
              <input
                type="text"
                id="responsible"
                name="responsible"
                value={formData.responsible}
                onChange={handleChange}
                maxLength={100}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Nombre del responsable"
              />
            </div>

            <div>
              <label
                htmlFor="weighedHen"
                className="block text-sm font-semibold text-title mb-1"
              >
                Gallina / Lote Pesado:
              </label>
              <input
                type="text"
                id="weighedHen"
                name="weighedHen"
                value={formData.weighedHen}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Identificación del lote o ave"
              />
            </div>

            <div>
              <label
                htmlFor="totalWeightKg"
                className="block text-sm font-semibold text-title mb-1"
              >
                Peso Total (kg):
              </label>
              <input
                type="number"
                id="totalWeightKg"
                name="totalWeightKg"
                min="0"
                step="0.01"
                value={formData.totalWeightKg}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Peso en kilogramos"
              />
            </div>

            <div>
              <label
                htmlFor="averageWeightGrams"
                className="block text-sm font-semibold text-title mb-1"
              >
                Peso Promedio (g):
              </label>
              <input
                type="number"
                id="averageWeightGrams"
                name="averageWeightGrams"
                min="0"
                step="0.01"
                value={formData.averageWeightGrams}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Peso promedio en gramos"
              />
            </div>

            <div>
              <label
                htmlFor="batchUniformityPercentage"
                className="block text-sm font-semibold text-title mb-1"
              >
                Uniformidad (%):
              </label>
              <input
                type="number"
                id="batchUniformityPercentage"
                name="batchUniformityPercentage"
                min="0"
                max="100"
                step="0.01"
                value={formData.batchUniformityPercentage}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Porcentaje de uniformidad"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="active"
                className="block text-sm font-semibold text-title mb-1"
              >
                Estado:
              </label>
              <select
                id="active"
                name="active"
                value={formData.active}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              >
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </select>
            </div>
          </div>
        </form>

        <DialogFooter className="mt-4">
          <button
            type="submit"
            form="weighing-form"
            disabled={guardando}
            className="w-full bg-green-1-navbar text-white font-medium py-2 px-4 rounded-md hover:bg-green-2-navbar shadow-md focus:outline-none focus:ring-2 focus:ring-green-1-navbar disabled:opacity-50 transition"
          >
            {guardando ? "Guardando..." : "Guardar Pesaje"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}