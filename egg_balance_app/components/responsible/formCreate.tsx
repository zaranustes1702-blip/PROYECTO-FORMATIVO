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
import {
  API_RESPONSIBLE_CREATE_URL,
  API_RESPONSIBLE_UPDATE_URL,
} from "@/api/config";

interface FormCreateResponsibleProps {
  onResponsibleCreated?: () => void;
  initialData?: any;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function FormCreateResponsible({
  onResponsibleCreated,
  initialData,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: FormCreateResponsibleProps) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isControlled ? controlledOpen : internalOpen;
  const isEdit = Boolean(initialData);

  const [guardando, setGuardando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    documentNumber: "",
    trainingRecord: "",
    role: "",
    responsibleType: "",
    active: "true",
  });

  useEffect(() => {
    if (initialData && open) {
      setFormData({
        fullName: initialData.fullName || "",
        documentNumber: initialData.documentNumber || "",
        trainingRecord: initialData.trainingRecord || "",
        role: initialData.role || "",
        responsibleType: initialData.responsibleType || "",
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
      fullName: "",
      documentNumber: "",
      trainingRecord: "",
      role: "",
      responsibleType: "",
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
      fullName: formData.fullName.trim(),
      documentNumber: formData.documentNumber.trim(),
      trainingRecord: formData.trainingRecord.trim(),
      role: formData.role.trim() || formData.responsibleType,
      responsibleType: formData.responsibleType,
      active: formData.active === "true",
    };

    try {
      const token = localStorage.getItem("token");
      const url = isEdit
        ? API_RESPONSIBLE_UPDATE_URL(initialData.id)
        : API_RESPONSIBLE_CREATE_URL;
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
        throw new Error(
          resultado?.message ||
            resultado?.mensaje ||
            resultado?.error ||
            `Error ${response.status}: No se pudo ${isEdit ? "actualizar" : "registrar"} el responsable`
        );
      }

      setMensajeExito(isEdit ? "¡Responsable actualizado correctamente!" : "¡Responsable registrado correctamente!");
      if (!isEdit) resetInputs();

      if (onResponsibleCreated) {
        onResponsibleCreated();
      }

      setTimeout(() => {
        handleOpenChange(false);
        setMensajeExito("");
      }, 1200);
    } catch (error: any) {
      console.error(`Error al ${isEdit ? "actualizar" : "registrar"} responsable:`, error);
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
          <span>Registrar Responsable</span>
        </DialogTrigger>
      )}

      <DialogContent className="bg-white sm:max-w-[425px] md:max-w-[800px] border border-border rounded-2xl shadow-xl">
        <DialogHeader className="font-bold text-2xl text-center text-title select-none pointer-events-none">
          <DialogTitle className="text-center font-bold text-2xl text-title select-none pointer-events-none">
            {isEdit ? "Editar Responsable" : "Registrar Responsable"}
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

        <form id="responsible-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Nombre Completo:
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                maxLength={50}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Ej: Juan Pérez"
              />
            </div>

            <div>
              <label
                htmlFor="documentNumber"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Número de Documento:
              </label>
              <input
                type="text"
                id="documentNumber"
                name="documentNumber"
                value={formData.documentNumber}
                onChange={handleChange}
                maxLength={20}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Ej: 1023456789"
              />
            </div>

            <div>
              <label
                htmlFor="trainingRecord"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Ficha de Formación:
              </label>
              <input
                type="text"
                id="trainingRecord"
                name="trainingRecord"
                value={formData.trainingRecord}
                onChange={handleChange}
                maxLength={20}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Ej: 2694582"
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Rol:
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                maxLength={50}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Ej: Encargado de lote"
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="responsibleType"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Tipo de Responsable:
              </label>
              <select
                id="responsibleType"
                name="responsibleType"
                value={formData.responsibleType}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title focus:outline-none focus:ring-2 focus:ring-green-1-navbar cursor-pointer"
              >
                <option value="">Selecciona una opción</option>
                <option value="Instructor">Instructor</option>
                <option value="Aprendiz">Aprendiz</option>
                <option value="Pasante">Pasante</option>
                <option value="Gestor">Gestor</option>
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
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2.5 px-4 rounded-xl shadow-sm focus:outline-none disabled:opacity-50 transition cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              form="responsible-form"
              disabled={guardando}
              className="flex-1 bg-green-1-navbar text-white font-medium py-2.5 px-4 rounded-xl hover:bg-green-2-navbar shadow-md focus:outline-none focus:ring-2 focus:ring-green-1-navbar disabled:opacity-50 transition cursor-pointer"
            >
              {guardando ? (isEdit ? "Actualizando..." : "Guardando...") : (isEdit ? "Actualizar Responsable" : "Guardar Responsable")}
            </button>
          </div>
        </DialogFooter>

        <DialogDescription className="text-center text-parrafo select-none pointer-events-none">
          {isEdit ? "Modifique la información de la persona responsable." : "Complete la información para registrar una persona responsable."}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}