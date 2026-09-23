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
import { API_BIRD_BATCH_URL } from "@/api/config";

export default function FormCreateBirdBatch() {
  const [open, setOpen] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const [formData, setFormData] = useState({
    entryDate: "",
    batchNumber: "",
    birdQuantity: "",
    batchWeight: "",
    birdAgeWeeks: "",
    appliedVaccines: "",
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

  // Limpia únicamente los inputs sin alterar los avisos de éxito/error
  const resetInputs = () => {
    setFormData({
      entryDate: "",
      batchNumber: "",
      birdQuantity: "",
      batchWeight: "",
      birdAgeWeeks: "",
      appliedVaccines: "",
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
      entryDate: formData.entryDate,
      batchNumber: formData.batchNumber.trim(),
      birdQuantity: Number(formData.birdQuantity) || 0,
      batchWeight: Number(formData.batchWeight) || 0,
      birdAgeWeeks: Number(formData.birdAgeWeeks) || 0,
      appliedVaccines: formData.appliedVaccines.trim(),
      active: formData.active === "true",
    };

    try {
      const response = await fetch(`${API_BIRD_BATCH_URL}/CreateBirdBatch`, {
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
        // En caso de que el backend responda con texto plano o sin cuerpo
      }

      if (!response.ok) {
        throw new Error(
          resultado?.message ||
            resultado?.mensaje ||
            resultado?.error ||
            `Error ${response.status}: No se pudo registrar el lote de aves`
        );
      }

      // 1. Mostrar aviso exitoso y vaciar inputs
      setMensajeExito("¡Lote de aves registrado correctamente!");
      resetInputs();

      // 2. Esperar 1.8 segundos para que el usuario visualice el mensaje antes de cerrar
      setTimeout(() => {
        setOpen(false);
        setMensajeExito("");
      }, 1800);
    } catch (error: any) {
      console.error("Error al registrar lote de aves:", error);
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
        <span>Agregar Lote</span>
      </DialogTrigger>

      <DialogContent className="bg-white sm:max-w-[425px] md:max-w-[800px] border border-border shadow-xl">
        <DialogHeader className="font-bold text-2xl text-center text-title">
          Crear Lote de Aves
        </DialogHeader>
        <DialogDescription className="text-center text-parrafo">
          Complete los campos para registrar un nuevo lote de aves en la granja.
        </DialogDescription>

        {/* Notificación de éxito destacada */}
        {mensajeExito && (
          <div className="w-full rounded-md border border-green-600 bg-green-50 p-3 text-center text-sm font-semibold text-green-800 animate-in fade-in">
            {mensajeExito}
          </div>
        )}

        {/* Notificación de error si falla la API */}
        {mensajeError && (
          <div className="w-full rounded-md border border-red-500 bg-red-50 p-3 text-center text-sm font-semibold text-red-700 animate-in fade-in">
            {mensajeError}
          </div>
        )}

        <form id="bird-batch-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="entryDate"
                className="block text-sm font-semibold text-title mb-1"
              >
                Fecha de Ingreso:
              </label>
              <input
                type="date"
                id="entryDate"
                name="entryDate"
                value={formData.entryDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              />
            </div>

            <div>
              <label
                htmlFor="batchNumber"
                className="block text-sm font-semibold text-title mb-1"
              >
                Número del Lote:
              </label>
              <input
                type="text"
                id="batchNumber"
                name="batchNumber"
                value={formData.batchNumber}
                onChange={handleChange}
                maxLength={255}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Ej: L001"
              />
            </div>

            <div>
              <label
                htmlFor="birdQuantity"
                className="block text-sm font-semibold text-title mb-1"
              >
                Cantidad de Aves:
              </label>
              <input
                type="number"
                id="birdQuantity"
                name="birdQuantity"
                value={formData.birdQuantity}
                onChange={handleChange}
                min="1"
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Ej: 2500"
              />
            </div>

            <div>
              <label
                htmlFor="batchWeight"
                className="block text-sm font-semibold text-title mb-1"
              >
                Peso del Lote (kg):
              </label>
              <input
                type="number"
                id="batchWeight"
                name="batchWeight"
                value={formData.batchWeight}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Ej: 1250.50"
              />
            </div>

            <div>
              <label
                htmlFor="birdAgeWeeks"
                className="block text-sm font-semibold text-title mb-1"
              >
                Edad en Semanas:
              </label>
              <input
                type="number"
                id="birdAgeWeeks"
                name="birdAgeWeeks"
                value={formData.birdAgeWeeks}
                onChange={handleChange}
                min="0"
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Ej: 18"
              />
            </div>

            <div>
              <label
                htmlFor="appliedVaccines"
                className="block text-sm font-semibold text-title mb-1"
              >
                Vacunas Aplicadas:
              </label>
              <input
                type="text"
                id="appliedVaccines"
                name="appliedVaccines"
                value={formData.appliedVaccines}
                onChange={handleChange}
                maxLength={255}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Ej: Gumboro, Newcastle, Bronquitis"
              />
            </div>

            <div className="col-span-2">
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
            form="bird-batch-form"
            disabled={guardando}
            className="w-full bg-green-1-navbar text-white font-medium py-2 px-4 rounded-md hover:bg-green-2-navbar shadow-md focus:outline-none focus:ring-2 focus:ring-green-1-navbar disabled:opacity-50 transition"
          >
            {guardando ? "Guardando..." : "Guardar Lote"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}