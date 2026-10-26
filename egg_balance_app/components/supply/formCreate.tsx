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
import { API_SUPPLY_CREATE_URL, API_SUPPLY_UPDATE_URL } from "@/api/config";

interface FormCreateSupplyProps {
  onSupplyCreated?: () => void;
  initialData?: any;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function FormCreateSupply({
  onSupplyCreated,
  initialData,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: FormCreateSupplyProps) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isControlled ? controlledOpen : internalOpen;
  const isEdit = Boolean(initialData);

  const [guardando, setGuardando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const [formData, setFormData] = useState({
    id_supply: "",
    supplyName: "",
    supplyType: "",
    reference: "",
    minimumStock: "",
    observations: "",
    active: "true",
  });

  useEffect(() => {
    if (initialData && open) {
      setFormData({
        id_supply: initialData.id_supply || "",
        supplyName: initialData.supplyName || "",
        supplyType: initialData.supplyType || "",
        reference: initialData.reference || "",
        minimumStock: String(initialData.minimumStock ?? ""),
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
      id_supply: "",
      supplyName: "",
      supplyType: "",
      reference: "",
      minimumStock: "",
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
      id_supply: formData.id_supply.trim(),
      supplyName: formData.supplyName.trim(),
      supplyType: formData.supplyType,
      reference: formData.reference.trim(),
      minimumStock: Number(formData.minimumStock) || 0,
      observations: formData.observations.trim(),
      active: formData.active === "true",
    };

    try {
      const token = localStorage.getItem("token");
      const url = isEdit
        ? API_SUPPLY_UPDATE_URL(initialData.id_supply)
        : API_SUPPLY_CREATE_URL;
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
        const detalle = Array.isArray(resultado?.info)
          ? resultado.info.join(" · ")
          : "";

        throw new Error(
          detalle ||
            resultado?.message ||
            `Error ${response.status}: No se pudo ${isEdit ? "actualizar" : "registrar"} el insumo`
        );
      }

      setMensajeExito(isEdit ? "¡Insumo actualizado correctamente!" : "¡Insumo registrado correctamente!");
      if (!isEdit) resetInputs();

      if (onSupplyCreated) {
        onSupplyCreated();
      }

      setTimeout(() => {
        handleOpenChange(false);
        setMensajeExito("");
      }, 1200);
    } catch (error: any) {
      console.error(`Error al ${isEdit ? "actualizar" : "registrar"} insumo:`, error);
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
          <span>Registrar Insumo</span>
        </DialogTrigger>
      )}

      <DialogContent className="bg-white sm:max-w-[425px] md:max-w-[800px] border border-border rounded-2xl shadow-xl">
        <DialogHeader className="font-bold text-2xl text-center text-title select-none pointer-events-none">
          <DialogTitle className="text-center font-bold text-2xl text-title select-none pointer-events-none">
            {isEdit ? "Editar Insumo" : "Crear Insumo"}
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

        <form id="supply-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="id_supply"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                ID del Insumo (Código):
              </label>
              <input
                type="text"
                id="id_supply"
                name="id_supply"
                value={formData.id_supply}
                onChange={handleChange}
                maxLength={20}
                required
                readOnly={isEdit}
                className={`w-full px-3 py-2 border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5] ${isEdit ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
                placeholder="Ej: ALIM-001 o MED-001"
              />
            </div>

            <div>
              <label
                htmlFor="supplyName"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Nombre del Insumo:
              </label>
              <input
                type="text"
                id="supplyName"
                name="supplyName"
                value={formData.supplyName}
                onChange={handleChange}
                maxLength={50}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                placeholder="Ej: Concentrado Fase 1"
              />
            </div>

            <div>
              <label
                htmlFor="supplyType"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Tipo de Insumo:
              </label>
              <select
                id="supplyType"
                name="supplyType"
                value={formData.supplyType}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title focus:outline-none focus:border-[#C5B8A5] cursor-pointer"
              >
                <option value="">Seleccione un tipo...</option>
                <option value="alimentacion">Alimentación</option>
                <option value="medicamentos">Medicamentos</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="reference"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Referencia:
              </label>
              <input
                type="text"
                id="reference"
                name="reference"
                value={formData.reference}
                onChange={handleChange}
                maxLength={50}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                placeholder="Ej: Bulto 40kg, Frasco 500ml..."
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="minimumStock"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Stock Mínimo (Alerta):
              </label>
              <input
                type="number"
                id="minimumStock"
                name="minimumStock"
                value={formData.minimumStock}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                placeholder="Ej: 10"
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
                value={formData.observations}
                onChange={handleChange}
                maxLength={255}
                rows={3}
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                placeholder="Opcional"
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
              form="supply-form"
              disabled={guardando}
              className="flex-1 bg-green-1-navbar text-white font-medium py-2.5 px-4 rounded-xl hover:bg-green-2-navbar shadow-md focus:outline-none focus:ring-2 focus:ring-green-1-navbar disabled:opacity-50 transition cursor-pointer"
            >
              {guardando ? (isEdit ? "Actualizando..." : "Guardando...") : (isEdit ? "Actualizar Insumo" : "Guardar Insumo")}
            </button>
          </div>
        </DialogFooter>

        <DialogDescription className="text-center text-parrafo select-none pointer-events-none">
          {isEdit ? "Modifique la información del insumo." : "Complete los campos para registrar un nuevo insumo (medicamentos o alimentación)."}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
