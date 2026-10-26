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
  API_HEALTH_CREATE_URL,
  API_HEALTH_UPDATE_URL,
  API_BIRD_BATCH_ALL_URL,
  API_SUPPLY_ALL_URL,
} from "@/api/config";

interface FormCreateHealthProps {
  onHealthCreated?: () => void;
  initialData?: any;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function FormCreateHealth({
  onHealthCreated,
  initialData,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: FormCreateHealthProps) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isControlled ? controlledOpen : internalOpen;
  const isEdit = Boolean(initialData);

  const [guardando, setGuardando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const [lotes, setLotes] = useState<any[]>([]);
  const [insumos, setInsumos] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    id_lote: "",
    id_supply: "",
    healthDate: "",
    vaccineQuantity: "",
    vaccineName: "",
    active: "true",
  });

  useEffect(() => {
    if (!open) return;

    const cargarListas = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers: any = token ? { Authorization: `Bearer ${token}` } : {};

        const resLotes = await fetch(`${API_BIRD_BATCH_ALL_URL}?limit=500`, { headers });
        const dataLotes = await resLotes.json();
        const listaLotes = dataLotes.info || [];
        setLotes(listaLotes);

        const resInsumos = await fetch(`${API_SUPPLY_ALL_URL}?limit=500`, { headers });
        const dataInsumos = await resInsumos.json();
        const listaInsumos = dataInsumos.info || [];
        setInsumos(
          listaInsumos.filter((i: any) => i.supplyType === "medicamentos")
        );
      } catch (error) {
        console.error("Error al cargar las listas:", error);
        setMensajeError("No se pudieron cargar los datos de los select.");
      }
    };

    cargarListas();
  }, [open]);

  useEffect(() => {
    if (initialData && open) {
      const cleanDate = (d?: string | null) => (d ? d.split("T")[0] : "");
      setFormData({
        id_lote: String(initialData.id_lote ?? ""),
        id_supply: String(initialData.id_supply ?? ""),
        healthDate: cleanDate(initialData.healthDate),
        vaccineQuantity: String(initialData.vaccineQuantity ?? ""),
        vaccineName: initialData.vaccineName || "",
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
      id_lote: "",
      id_supply: "",
      healthDate: "",
      vaccineQuantity: "",
      vaccineName: "",
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
      id_lote: Number(formData.id_lote),
      id_supply: formData.id_supply,
      healthDate: formData.healthDate,
      vaccineQuantity: Number(formData.vaccineQuantity),
      vaccineName: formData.vaccineName.trim(),
      active: formData.active === "true",
    };

    try {
      const token = localStorage.getItem("token");
      const url = isEdit
        ? API_HEALTH_UPDATE_URL(initialData.id)
        : API_HEALTH_CREATE_URL;
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
            `Error ${response.status}: No se pudo ${isEdit ? "actualizar" : "registrar"} el registro de sanidad`
        );
      }

      setMensajeExito(isEdit ? "¡Registro de sanidad actualizado correctamente!" : "¡Registro de sanidad guardado correctamente!");
      if (!isEdit) resetInputs();

      if (onHealthCreated) {
        onHealthCreated();
      }

      setTimeout(() => {
        handleOpenChange(false);
        setMensajeExito("");
      }, 1200);
    } catch (error: any) {
      console.error(`Error al ${isEdit ? "actualizar" : "registrar"} el registro de sanidad:`, error);
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
          <span>Registrar Sanidad</span>
        </DialogTrigger>
      )}

      <DialogContent className="bg-white sm:max-w-[425px] md:max-w-[800px] max-h-[90vh] overflow-y-auto border border-border rounded-2xl shadow-xl">
        <DialogHeader className="font-bold text-2xl text-center text-title select-none pointer-events-none">
          <DialogTitle className="text-center font-bold text-2xl text-title select-none pointer-events-none">
            {isEdit ? "Editar Sanidad" : "Registrar Sanidad"}
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

        <form id="health-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="healthDate"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Fecha:
              </label>
              <input
                type="date"
                id="healthDate"
                name="healthDate"
                value={formData.healthDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
              />
            </div>

            <div>
              <label
                htmlFor="id_lote"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Lote de Aves:
              </label>
              <select
                id="id_lote"
                name="id_lote"
                value={formData.id_lote}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title focus:outline-none focus:border-[#C5B8A5] cursor-pointer"
              >
                <option value="">Seleccione un lote...</option>
                {lotes.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.batchNumber} ({l.birdBreed})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="id_supply"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Insumo (Medicamento):
              </label>
              <select
                id="id_supply"
                name="id_supply"
                value={formData.id_supply}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title focus:outline-none focus:border-[#C5B8A5] cursor-pointer"
              >
                <option value="">Seleccione un insumo...</option>
                {insumos.map((i) => (
                  <option key={i.id_supply} value={i.id_supply}>
                    {i.supplyName} ({i.reference})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="vaccineQuantity"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Cantidad de Vacunas:
              </label>
              <input
                type="number"
                id="vaccineQuantity"
                name="vaccineQuantity"
                value={formData.vaccineQuantity}
                onChange={handleChange}
                min="1"
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                placeholder="Ej: 500"
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="vaccineName"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Nombre de la Vacuna:
              </label>
              <input
                type="text"
                id="vaccineName"
                name="vaccineName"
                value={formData.vaccineName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                placeholder="Ej: Newcastle"
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
              form="health-form"
              disabled={guardando}
              className="flex-1 bg-green-1-navbar text-white font-medium py-2.5 px-4 rounded-xl hover:bg-green-2-navbar shadow-md focus:outline-none focus:ring-2 focus:ring-green-1-navbar disabled:opacity-50 transition cursor-pointer"
            >
              {guardando ? (isEdit ? "Actualizando..." : "Guardando...") : (isEdit ? "Actualizar Sanidad" : "Guardar Sanidad")}
            </button>
          </div>
        </DialogFooter>

        <DialogDescription className="text-center text-parrafo select-none pointer-events-none">
          {isEdit ? "Modifique la información de la sanidad registrada." : "Complete los campos para registrar la sanidad de un lote."}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
