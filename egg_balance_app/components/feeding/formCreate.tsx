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
import { API_FEEDING_URL } from "@/api/config";

export default function FormCreateFeeding() {
  const [open, setOpen] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const [formData, setFormData] = useState({
    feedingDate: "",
    dailyConsumptionKg: "",
    remainingKg: "",
    remainingBags: "",
    shift: "",
    responsiblePerson: "",
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
      feedingDate: "",
      dailyConsumptionKg: "",
      remainingKg: "",
      remainingBags: "",
      shift: "",
      responsiblePerson: "",
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
      feedingDate: formData.feedingDate,
      dailyConsumptionKg: Number(formData.dailyConsumptionKg) || 0,
      remainingKg: Number(formData.remainingKg) || 0,
      remainingBags: Number(formData.remainingBags) || 0,
      shift: formData.shift,
      responsiblePerson: formData.responsiblePerson.trim(),
      active: formData.active === "true",
    };

    try {
      const response = await fetch(`${API_FEEDING_URL}/CreateFeeding`, {
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
        // En caso de que la respuesta no contenga JSON
      }

      if (!response.ok) {
        throw new Error(
          resultado?.message ||
            resultado?.mensaje ||
            resultado?.error ||
            `Error ${response.status}: No se pudo registrar la alimentación`
        );
      }

      setMensajeExito("¡Alimentación registrada correctamente!");
      resetInputs();

      setTimeout(() => {
        setOpen(false);
        setMensajeExito("");
      }, 1800);
    } catch (error: any) {
      console.error("Error al registrar alimentación:", error);
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
        <span>Registrar Alimentación</span>
      </DialogTrigger>

      <DialogContent className="bg-white sm:max-w-[425px] md:max-w-[800px] border border-border shadow-xl">
        <DialogHeader className="font-bold text-2xl text-center text-title">
          Registrar Alimentación
        </DialogHeader>
        <DialogDescription className="text-center text-parrafo">
          Complete los campos para registrar el consumo diario de alimento.
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

        <form id="feeding-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="feedingDate"
                className="block text-sm font-semibold text-title mb-1"
              >
                Fecha de Alimentación:
              </label>
              <input
                type="date"
                id="feedingDate"
                name="feedingDate"
                value={formData.feedingDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              />
            </div>

            <div>
              <label
                htmlFor="shift"
                className="block text-sm font-semibold text-title mb-1"
              >
                Turno:
              </label>
              <select
                id="shift"
                name="shift"
                value={formData.shift}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
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
                className="block text-sm font-semibold text-title mb-1"
              >
                Consumo Diario (kg):
              </label>
              <input
                type="number"
                id="dailyConsumptionKg"
                name="dailyConsumptionKg"
                value={formData.dailyConsumptionKg}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Ej: 120.5"
              />
            </div>

            <div>
              <label
                htmlFor="remainingKg"
                className="block text-sm font-semibold text-title mb-1"
              >
                Alimento Restante (kg):
              </label>
              <input
                type="number"
                id="remainingKg"
                name="remainingKg"
                value={formData.remainingKg}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Ej: 450.0"
              />
            </div>

            <div>
              <label
                htmlFor="remainingBags"
                className="block text-sm font-semibold text-title mb-1"
              >
                Bultos Restantes:
              </label>
              <input
                type="number"
                id="remainingBags"
                name="remainingBags"
                value={formData.remainingBags}
                onChange={handleChange}
                min="0"
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Ej: 9"
              />
            </div>

            <div>
              <label
                htmlFor="responsiblePerson"
                className="block text-sm font-semibold text-title mb-1"
              >
                Persona Responsable:
              </label>
              <input
                type="text"
                id="responsiblePerson"
                name="responsiblePerson"
                value={formData.responsiblePerson}
                onChange={handleChange}
                maxLength={100}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Nombre del responsable"
              />
            </div>

            <div className="col-span-1 md:col-span-2">
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

        <DialogFooter>
          <button
            type="submit"
            form="feeding-form"
            disabled={guardando}
            className="w-full bg-green-1-navbar text-white font-medium py-2 px-4 rounded-md hover:bg-green-2-navbar shadow-md focus:outline-none focus:ring-2 focus:ring-green-1-navbar disabled:opacity-50 transition"
          >
            {guardando ? "Guardando..." : "Guardar Alimentación"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}