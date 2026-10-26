"use client";

import { useEffect, useState } from "react";
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
import { API_VISIT_CREATE_URL, API_VISIT_UPDATE_URL } from "@/api/config";

interface FormCreateVisitProps {
  onVisitCreated?: () => void;
  initialData?: any;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function FormCreateVisit({
  onVisitCreated,
  initialData,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: FormCreateVisitProps) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isControlled ? controlledOpen : internalOpen;
  const isEdit = Boolean(initialData);

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

  useEffect(() => {
    if (initialData && open) {
      const cleanDate = (d?: string | null) => (d ? d.split("T")[0] : "");
      setFormData({
        visitDate: cleanDate(initialData.visitDate),
        visitorName: initialData.visitorName || "",
        institution: initialData.institutionOrganization || initialData.institution || "",
        visitReason: initialData.visitReason || "",
        responsiblePerson: initialData.responsiblePerson || "",
        observations: initialData.observations || "",
        active: initialData.active ? "true" : "false",
      });
      setMensajeExito("");
      setMensajeError("");
    } else if (!initialData && open) {
      resetInputs();
      setMensajeExito("");
      setMensajeError("");
    }
  }, [initialData, open]);

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
    if (isControlled && setControlledOpen) {
      setControlledOpen(nuevoEstado);
    } else {
      setInternalOpen(nuevoEstado);
    }
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
      observations: formData.observations.trim() || "Sin observaciones",
      active: formData.active === "true",
    };

    try {
      const token = localStorage.getItem("token");
      const url = isEdit
        ? API_VISIT_UPDATE_URL(initialData.id)
        : API_VISIT_CREATE_URL;
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
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
        let detalleError = "";
        if (Array.isArray(resultado?.info)) {
          detalleError = resultado.info
            .map((item: any) =>
              typeof item === "string" ? item : item?.message || ""
            )
            .filter(Boolean)
            .join(". ");
        }

        throw new Error(
          detalleError ||
            resultado?.message ||
            resultado?.mensaje ||
            resultado?.error ||
            `Error ${response.status}: No se pudo ${isEdit ? "actualizar" : "registrar"} la visita`
        );
      }

      setMensajeExito(isEdit ? "¡Visita actualizada correctamente!" : "¡Visita registrada correctamente!");
      if (!isEdit) resetInputs();

      if (onVisitCreated) {
        onVisitCreated();
      }

      setTimeout(() => {
        handleOpenChange(false);
        setMensajeExito("");
      }, 1200);
    } catch (error: any) {
      console.error(`Error al ${isEdit ? "actualizar" : "registrar"} visita:`, error);
      setMensajeError(
        error.message || "Ocurrió un error inesperado al conectar con el servidor"
      );
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {!isControlled && !isEdit && (
        <DialogTrigger className="inline-flex items-center justify-center gap-2 bg-green-1-navbar hover:bg-green-2-navbar text-white font-medium px-5 py-2.5 rounded-xl shadow-sm hover:shadow hover:scale-[1.01] transition-all cursor-pointer">
          <Plus className="w-5 h-5 text-white" />
          <span>Registrar Visita</span>
        </DialogTrigger>
      )}

      <DialogContent className="bg-white sm:max-w-[425px] md:max-w-[800px] border border-border rounded-2xl shadow-xl">
        <DialogHeader className="font-bold text-2xl text-center text-title select-none pointer-events-none">
          <DialogTitle className="text-center font-bold text-2xl text-title select-none pointer-events-none">
            {isEdit ? "Editar Visita" : "Registrar Visita"}
          </DialogTitle>
        </DialogHeader>

        {mensajeExito && (
          <div className="w-full rounded-xl border border-green-600 bg-green-50 p-3 text-center text-sm font-semibold text-green-800 animate-in fade-in select-none pointer-events-none">
            {mensajeExito}
          </div>
        )}

        {mensajeError && (
          <div className="w-full rounded-xl border border-red-500 bg-red-50 p-3 text-center text-sm font-semibold text-red-700 animate-in fade-in select-none pointer-events-none">
            {mensajeError}
          </div>
        )}

        <form id="visit-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="visitDate"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Fecha de la Visita:
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
                minLength={3}
                maxLength={50}
                required
                placeholder="Nombre completo"
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              />
            </div>

            <div>
              <label
                htmlFor="institution"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Institución u Organización:
              </label>
              <input
                type="text"
                id="institution"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                maxLength={100}
                required
                placeholder="SENA, ICA, Empresa, etc."
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              />
            </div>

            <div>
              <label
                htmlFor="responsiblePerson"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Persona Responsable:
              </label>
              <input
                type="text"
                id="responsiblePerson"
                name="responsiblePerson"
                value={formData.responsiblePerson}
                onChange={handleChange}
                maxLength={50}
                required
                placeholder="Quién atendió o autorizó la visita"
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
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
                maxLength={100}
                required
                placeholder="Inspección sanitaria, auditoría, práctica formativa..."
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
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
          </div>
        </form>

        <DialogFooter>
          <div className="flex w-full gap-3">
            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              disabled={guardando}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2.5 px-4 rounded-xl shadow-sm focus:outline-none disabled:opacity-50 transition cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              form="visit-form"
              disabled={guardando}
              className="flex-1 bg-green-1-navbar text-white font-medium py-2.5 px-4 rounded-xl hover:bg-green-2-navbar shadow-md focus:outline-none focus:ring-2 focus:ring-green-1-navbar disabled:opacity-50 transition cursor-pointer"
            >
              {guardando ? (isEdit ? "Actualizando..." : "Guardando...") : (isEdit ? "Actualizar Visita" : "Guardar Visita")}
            </button>
          </div>
        </DialogFooter>

        <DialogDescription className="text-center text-parrafo select-none pointer-events-none">
          {isEdit ? "Modifique la información de la visita registrada." : "Complete los campos para registrar el ingreso de un visitante."}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}