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
import { API_BARN_URL } from "@/api/config";

export default function FormCreationBarn() {
  const [open, setOpen] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const [formData, setFormData] = useState({
    barnName: "",
    barnSize: "",
    maxBirdCapacity: "",
    birdBreed: "",
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
      barnName: "",
      barnSize: "",
      maxBirdCapacity: "",
      birdBreed: "",
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
      barnName: formData.barnName.trim(),
      barnSize: formData.barnSize.trim(),
      maxBirdCapacity: Number(formData.maxBirdCapacity) || 0,
      birdBreed: formData.birdBreed,
      active: formData.active === "true",
    };

    try {
      const response = await fetch(`${API_BARN_URL}/CreateBarn`, {
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
            `Error ${response.status}: No se pudo registrar el galpón`
        );
      }

      // 1. Mostrar aviso exitoso y vaciar inputs
      setMensajeExito("¡Galpón registrado correctamente!");
      resetInputs();

      // 2. Esperar 1.8 segundos para que el usuario visualice el mensaje antes de cerrar
      setTimeout(() => {
        setOpen(false);
        setMensajeExito("");
      }, 1800);
    } catch (error: any) {
      console.error("Error al registrar galpón:", error);
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
        <span>Agregar Galpón</span>
      </DialogTrigger>

      <DialogContent className="bg-white sm:max-w-[425px] md:max-w-[800px] border border-border shadow-xl">
        <DialogHeader className="font-bold text-2xl text-center text-title">
          Crear Galpón
        </DialogHeader>
        <DialogDescription className="text-center text-parrafo">
          Complete los campos para registrar un nuevo galpón avícola.
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

        <form id="barn-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="barnName"
                className="block text-sm font-semibold text-title mb-1"
              >
                Nombre del Galpón:
              </label>
              <input
                type="text"
                id="barnName"
                name="barnName"
                value={formData.barnName}
                onChange={handleChange}
                maxLength={30}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Ej: Galpón Principal"
              />
            </div>

            <div>
              <label
                htmlFor="barnSize"
                className="block text-sm font-semibold text-title mb-1"
              >
                Tamaño del Galpón:
              </label>
              <input
                type="text"
                id="barnSize"
                name="barnSize"
                value={formData.barnSize}
                onChange={handleChange}
                maxLength={30}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Ej: 20 x 10 metros"
              />
            </div>

            <div>
              <label
                htmlFor="maxBirdCapacity"
                className="block text-sm font-semibold text-title mb-1"
              >
                Capacidad Máxima (Aves):
              </label>
              <input
                type="number"
                id="maxBirdCapacity"
                name="maxBirdCapacity"
                value={formData.maxBirdCapacity}
                onChange={handleChange}
                min="1"
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Ej: 5000"
              />
            </div>

            <div>
              <label
                htmlFor="birdBreed"
                className="block text-sm font-semibold text-title mb-1"
              >
                Raza o Línea:
              </label>
              <select
                id="birdBreed"
                name="birdBreed"
                value={formData.birdBreed}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              >
                <option value="">Seleccione una raza o línea</option>
                <option value="Hy-Line Brown">Hy-Line Brown</option>
                <option value="Otra">Otra</option>
              </select>
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
            form="barn-form"
            disabled={guardando}
            className="w-full bg-green-1-navbar text-white font-medium py-2 px-4 rounded-md hover:bg-green-2-navbar shadow-md focus:outline-none focus:ring-2 focus:ring-green-1-navbar disabled:opacity-50 transition"
          >
            {guardando ? "Guardando..." : "Guardar Galpón"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}