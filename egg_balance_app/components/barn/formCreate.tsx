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
import { API_BARN_CREATE_URL, API_BARN_UPDATE_URL } from "@/api/config";

interface FormCreationBarnProps {
  onBarnCreated?: () => void;
  initialData?: any;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

// Densidad de referencia para calcular la capacidad (aves por m²).
const AVES_POR_M2 = 7;

export default function FormCreationBarn({
  onBarnCreated,
  initialData,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: FormCreationBarnProps) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isControlled ? controlledOpen : internalOpen;
  const isEdit = Boolean(initialData);

  const [guardando, setGuardando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const [formData, setFormData] = useState({
    barnName: "",
    largo: "",
    ancho: "",
    barnSize: "",
    maxBirdCapacity: "",
    active: "true",
  });

  const [capacidadManual, setCapacidadManual] = useState(false);

  useEffect(() => {
    if (initialData && open) {
      let largoStr = "";
      let anchoStr = "";
      if (initialData.barnSize) {
        const match = String(initialData.barnSize).match(/([\d.]+)\s*x\s*([\d.]+)/i);
        if (match) {
          largoStr = match[1];
          anchoStr = match[2];
        }
      }

      setFormData({
        barnName: initialData.barnName || "",
        largo: largoStr,
        ancho: anchoStr,
        barnSize: initialData.barnSize || "",
        maxBirdCapacity: String(initialData.maxBirdCapacity ?? ""),
        active: initialData.active ? "true" : "false",
      });
      setCapacidadManual(true);
      setMensajeExito("");
      setMensajeError("");
    } else if (!initialData && open) {
      resetInputs();
      setMensajeExito("");
      setMensajeError("");
    }
  }, [initialData, open]);

  const medidasValidas = Number(formData.largo) > 0 && Number(formData.ancho) > 0;
  const area = medidasValidas ? Number(formData.largo) * Number(formData.ancho) : 0;
  const capacidadSugerida = Math.floor(area * AVES_POR_M2);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    if (name === "maxBirdCapacity") {
      setCapacidadManual(true);
    }

    setFormData((prev) => {
      const actualizados = { ...prev, [name]: value };

      if (name === "largo" || name === "ancho") {
        const largo = Number(actualizados.largo);
        const ancho = Number(actualizados.ancho);
        const valido = largo > 0 && ancho > 0;

        actualizados.barnSize = valido ? `${largo} x ${ancho} metros` : "";

        if (valido && !capacidadManual) {
          actualizados.maxBirdCapacity = String(
            Math.floor(largo * ancho * AVES_POR_M2)
          );
        }
      }

      return actualizados;
    });
  };

  const resetInputs = () => {
    setFormData({
      barnName: "",
      largo: "",
      ancho: "",
      barnSize: "",
      maxBirdCapacity: "",
      active: "true",
    });
    setCapacidadManual(false);
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
      barnName: formData.barnName.trim(),
      barnSize: formData.barnSize.trim() || `${formData.largo || 0} x ${formData.ancho || 0} metros`,
      maxBirdCapacity: Number(formData.maxBirdCapacity) || 0,
      active: formData.active === "true",
    };

    try {
      const token = localStorage.getItem("token");
      const url = isEdit
        ? API_BARN_UPDATE_URL(initialData.id)
        : API_BARN_CREATE_URL;
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
        // En caso de respuesta vacía
      }

      if (!response.ok) {
        throw new Error(
          resultado?.message ||
            resultado?.mensaje ||
            resultado?.error ||
            `Error ${response.status}: No se pudo ${isEdit ? "actualizar" : "registrar"} el galpón`
        );
      }

      setMensajeExito(isEdit ? "¡Galpón actualizado correctamente!" : "¡Galpón registrado correctamente!");
      if (!isEdit) resetInputs();

      if (onBarnCreated) {
        onBarnCreated();
      }

      setTimeout(() => {
        handleOpenChange(false);
        setMensajeExito("");
      }, 1200);
    } catch (error: any) {
      console.error(`Error al ${isEdit ? "actualizar" : "registrar"} galpón:`, error);
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
          <span>Registrar Galpón</span>
        </DialogTrigger>
      )}

      <DialogContent className="bg-white sm:max-w-[425px] md:max-w-[800px] border border-border rounded-2xl shadow-xl">
        <DialogHeader className="font-bold text-2xl text-center text-title select-none pointer-events-none">
          <DialogTitle className="text-center font-bold text-2xl text-title select-none pointer-events-none">
            {isEdit ? "Editar Galpón" : "Registrar Galpón"}
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

        <form id="barn-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="barnName"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
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
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                placeholder="Ej: Galpón Principal"
              />
            </div>

            <div>
              <label
                htmlFor="largo"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Largo (m):
              </label>
              <input
                type="number"
                id="largo"
                name="largo"
                min="0.1"
                step="0.01"
                value={formData.largo}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                placeholder="Ej: 20"
              />
            </div>

            <div>
              <label
                htmlFor="ancho"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Ancho (m):
              </label>
              <input
                type="number"
                id="ancho"
                name="ancho"
                min="0.1"
                step="0.01"
                value={formData.ancho}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                placeholder="Ej: 10"
              />
            </div>

            <div>
              <label
                htmlFor="barnSize"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Tamaño del Galpón (automático):
              </label>
              <input
                type="text"
                id="barnSize"
                name="barnSize"
                value={formData.barnSize}
                readOnly
                className="w-full px-3 py-2 bg-[#FCFBF9] border border-border rounded-xl text-parrafo placeholder-gray-400 focus:outline-none"
                placeholder="Se calcula con el largo y el ancho"
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="maxBirdCapacity"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
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
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                placeholder="Ej: 1400"
              />
              <p className="mt-1 text-xs text-parrafo select-none pointer-events-none">
                {medidasValidas
                  ? `Área: ${area.toFixed(2)} m² · Sugerida: ${capacidadSugerida} aves (${AVES_POR_M2} aves/m²)`
                  : "Ingrese largo y ancho para calcular la capacidad."}
                {capacidadManual && " · Editada manualmente."}
              </p>
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
              form="barn-form"
              disabled={guardando}
              className="flex-1 bg-green-1-navbar text-white font-medium py-2.5 px-4 rounded-xl hover:bg-green-2-navbar shadow-md focus:outline-none focus:ring-2 focus:ring-green-1-navbar disabled:opacity-50 transition cursor-pointer"
            >
              {guardando ? (isEdit ? "Actualizando..." : "Guardando...") : (isEdit ? "Actualizar Galpón" : "Guardar Galpón")}
            </button>
          </div>
        </DialogFooter>

        <DialogDescription className="text-center text-parrafo select-none pointer-events-none">
          {isEdit ? "Modifique los campos y guarde los cambios del galpón." : "Complete los campos para registrar un nuevo galpón avícola."}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
