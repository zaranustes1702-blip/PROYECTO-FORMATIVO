
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Plus } from "lucide-react";
import { API_VISIT_URL } from "@/api/config";

interface FormCreateVisitProps {
  onVisitCreated?: () => void;
}

export default function FormCreateVisit({
  onVisitCreated,
}: FormCreateVisitProps) {
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
      institutionOrganization: formData.institution.trim(),
      visitReason: formData.visitReason.trim(),
      responsiblePerson: formData.responsiblePerson.trim(),
      observations:
        formData.observations.trim() || "Sin observaciones",
      active: formData.active === "true",
    };

    try {
      const response = await fetch(
        `${API_VISIT_URL}/CreateVisit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datosEnviar),
        },
      );

      let resultado: any = null;

      try {
        resultado = await response.json();
      } catch {
        // La respuesta no contiene JSON
      }

      if (!response.ok) {
        let detalleError = "";

        if (Array.isArray(resultado?.info)) {
          detalleError = resultado.info
            .map((item: any) =>
              typeof item === "string"
                ? item
                : item?.message || "",
            )
            .filter(Boolean)
            .join(". ");
        }

        throw new Error(
          detalleError ||
            resultado?.message ||
            resultado?.mensaje ||
            resultado?.error ||
            `Error ${response.status}: No se pudo registrar la visita`,
        );
      }

      setMensajeExito(
        "¡Visita registrada correctamente!",
      );

      resetInputs();

      if (onVisitCreated) {
        onVisitCreated();
      }

      setTimeout(() => {
        setOpen(false);
        setMensajeExito("");
      }, 1500);

    } catch (error: any) {
      console.error(
        "Error al registrar visita:",
        error,
      );

      setMensajeError(
        error.message ||
          "Ocurrió un error inesperado al conectar con el servidor",
      );

    } finally {
      setGuardando(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
    >
      <DialogTrigger className="inline-flex items-center justify-center gap-2 bg-green-1-navbar hover:bg-green-2-navbar text-white font-medium px-5 py-2.5 rounded-xl shadow-sm hover:shadow hover:scale-[1.01] transition-all cursor-pointer">
        <Plus className="w-5 h-5 text-white" />
        <span>Registrar Visita</span>
      </DialogTrigger>

      <DialogContent className="bg-white sm:max-w-[425px] md:max-w-[800px] border border-border rounded-2xl shadow-xl">
        <DialogHeader className="font-bold text-2xl text-center text-title select-none pointer-events-none">
          <DialogTitle className="text-center font-bold text-2xl text-title select-none pointer-events-none">
            Registrar Visita
          </DialogTitle>
        </DialogHeader>

        {mensajeExito && (
          <div className="w-full rounded-xl border border-green-600 bg-green-50 p-3 text-center text-sm font-semibold text-green-800 animate-in fade-in select-none pointer-events-none">
            {mensajeExito}
          </div>
        )}

        {mensajeError && (
          <div className="w-full rounded-xl border border-red-500 bg-red-50 p-3 text-center text-sm font-semibold text-red-700 animate-in fade-in">
            {mensajeError}
          </div>
        )}

        <form
          id="visit-form"
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="visitDate"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
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
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              />
            </div>

            <div>
              <label
                htmlFor="visitorName"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Nombre del Visitante:
              </label>

              <input
                type="text"
                id="visitorName"
                name="visitorName"
                value={formData.visitorName}
                onChange={handleChange}
                maxLength={50}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Nombre completo"
              />
            </div>

            <div>
              <label
                htmlFor="institution"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Institución o Empresa:
              </label>

              <input
                type="text"
                id="institution"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                maxLength={50}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Empresa o entidad de procedencia"
              />
            </div>

            <div>
              <label
                htmlFor="responsiblePerson"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Responsable que Atiende:
              </label>

              <input
                type="text"
                id="responsiblePerson"
                name="responsiblePerson"
                value={formData.responsiblePerson}
                onChange={handleChange}
                maxLength={50}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Persona encargada de la atención"
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="visitReason"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Motivo de la Visita:
              </label>

              <input
                type="text"
                id="visitReason"
                name="visitReason"
                value={formData.visitReason}
                onChange={handleChange}
                maxLength={50}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Objetivo o motivo de la visita"
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="observations"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Observaciones:
              </label>

              <textarea
                id="observations"
                name="observations"
                rows={3}
                maxLength={100}
                value={formData.observations}
                onChange={handleChange}
                placeholder="Detalles adicionales, medidas de bioseguridad o recomendaciones"
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="active"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Estado:
              </label>

              <select
                id="active"
                name="active"
                value={formData.active}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              >
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </select>
            </div>
          </div>
        </form>

        <DialogFooter>
          <div className="flex w-full gap-3">
            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              disabled={guardando}
              className="flex-1 bg-[#E8DFD1] hover:bg-[#D9CCB8] text-[#3A2A1A] font-medium py-2.5 px-4 rounded-xl shadow-sm focus:outline-none disabled:opacity-50 transition"
            >
              Cancelar
            </button>

            <button
              type="submit"
              form="visit-form"
              disabled={guardando}
              className="flex-1 bg-green-1-navbar text-white font-medium py-2.5 px-4 rounded-xl hover:bg-green-2-navbar shadow-md focus:outline-none focus:ring-2 focus:ring-green-1-navbar disabled:opacity-50 transition"
            >
              {guardando
                ? "Guardando..."
                : "Guardar Visita"}
            </button>
          </div>
        </DialogFooter>

        <DialogDescription className="text-center text-parrafo select-none pointer-events-none">
          Complete los campos para registrar el ingreso de un visitante.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}