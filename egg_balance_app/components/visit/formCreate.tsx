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
import { API_VISIT_URL } from "@/api/config";

export default function FormCreateVisit() {
  const [open, setOpen] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const [formData, setFormData] = useState({
    visitDate: "",
    visitorName: "",
    institution: "",
    visitReason: "",
    responsiblePerson: "",
    observations: "",
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
      visitDate: "",
      visitorName: "",
      institution: "",
      visitReason: "",
      responsiblePerson: "",
      observations: "",
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
      visitDate: formData.visitDate,
      visitorName: formData.visitorName.trim(),
      institution: formData.institution.trim(),
      visitReason: formData.visitReason.trim(),
      responsiblePerson: formData.responsiblePerson.trim(),
      observations: formData.observations.trim(),
      active: formData.active === "true",
    };

    try {
      const response = await fetch(`${API_VISIT_URL}/CreateVisit`, {
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
        // En caso de que no devuelva JSON
      }

      if (!response.ok) {
        throw new Error(
          resultado?.message ||
            resultado?.mensaje ||
            resultado?.error ||
            `Error ${response.status}: No se pudo registrar la visita`
        );
      }

      setMensajeExito("¡Visita registrada correctamente!");
      resetInputs();

      setTimeout(() => {
        setOpen(false);
        setMensajeExito("");
      }, 1800);
    } catch (error: any) {
      console.error("Error al registrar visita:", error);
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
        <span>Registrar Visita</span>
      </DialogTrigger>

      <DialogContent className="bg-white sm:max-w-[425px] md:max-w-[850px] max-h-[90vh] overflow-y-auto border border-border shadow-xl">
        <DialogHeader className="font-bold text-2xl text-center text-title">
          Registrar Visita
        </DialogHeader>
        <DialogDescription className="text-center text-parrafo">
          Complete los campos para registrar el ingreso de un visitante.
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

        <form id="visit-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="visitDate"
                className="block text-sm font-semibold text-title mb-1"
              >
                Fecha:
              </label>
              <input
                type="date"
                id="visitDate"
                name="visitDate"
                value={formData.visitDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              />
            </div>

            <div>
              <label
                htmlFor="visitorName"
                className="block text-sm font-semibold text-title mb-1"
              >
                Nombre del Visitante:
              </label>
              <input
                type="text"
                id="visitorName"
                name="visitorName"
                value={formData.visitorName}
                onChange={handleChange}
                maxLength={100}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Nombre completo"
              />
            </div>

            <div>
              <label
                htmlFor="institution"
                className="block text-sm font-semibold text-title mb-1"
              >
                Institución o Empresa:
              </label>
              <input
                type="text"
                id="institution"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                maxLength={100}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Empresa o entidad de procedencia"
              />
            </div>

            <div>
              <label
                htmlFor="responsiblePerson"
                className="block text-sm font-semibold text-title mb-1"
              >
                Responsable que Atiende:
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
                placeholder="Persona encargada de la atención"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="visitReason"
                className="block text-sm font-semibold text-title mb-1"
              >
                Motivo de la Visita:
              </label>
              <input
                type="text"
                id="visitReason"
                name="visitReason"
                value={formData.visitReason}
                onChange={handleChange}
                maxLength={255}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Objetivo o motivo de la visita"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="observations"
                className="block text-sm font-semibold text-title mb-1"
              >
                Observaciones:
              </label>
              <textarea
                id="observations"
                name="observations"
                rows={3}
                maxLength={255}
                value={formData.observations}
                onChange={handleChange}
                placeholder="Detalles adicionales, medidas de bioseguridad o recomendaciones"
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
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
            form="visit-form"
            disabled={guardando}
            className="w-full bg-green-1-navbar text-white font-medium py-2 px-4 rounded-md hover:bg-green-2-navbar shadow-md focus:outline-none focus:ring-2 focus:ring-green-1-navbar disabled:opacity-50 transition"
          >
            {guardando ? "Guardando..." : "Guardar Visita"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}