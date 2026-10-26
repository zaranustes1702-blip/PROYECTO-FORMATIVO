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
  API_QUARANTINE_CREATE_URL,
  API_QUARANTINE_UPDATE_URL,
  API_BIRD_BATCH_ALL_URL,
  API_SUPPLY_ALL_URL,
} from "@/api/config";

interface FormCreateQuarantineProps {
  onQuarantineCreated?: () => void;
  initialData?: any;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function FormCreateQuarantine({
  onQuarantineCreated,
  initialData,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: FormCreateQuarantineProps) {
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
    quarantineDate: "",
    affectedBirds: "",
    symptoms: "",
    diagnosis: "",
    treatmentApplied: "",
    dosage: "",
    treatmentDuration: "",
    quarantineEndDate: "",
    observations: "",
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
        quarantineDate: cleanDate(initialData.quarantineDate),
        affectedBirds: String(initialData.affectedBirds ?? ""),
        symptoms: initialData.symptoms || "",
        diagnosis: initialData.diagnosis || "",
        treatmentApplied: initialData.treatmentApplied || "",
        dosage: initialData.dosage || "",
        treatmentDuration: initialData.treatmentDuration || "",
        quarantineEndDate: cleanDate(initialData.quarantineEndDate),
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
      id_lote: "",
      id_supply: "",
      quarantineDate: "",
      affectedBirds: "",
      symptoms: "",
      diagnosis: "",
      treatmentApplied: "",
      dosage: "",
      treatmentDuration: "",
      quarantineEndDate: "",
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
      id_lote: Number(formData.id_lote),
      id_supply: formData.id_supply,
      quarantineDate: formData.quarantineDate,
      affectedBirds: Number(formData.affectedBirds),
      symptoms: formData.symptoms.trim(),
      diagnosis: formData.diagnosis.trim(),
      treatmentApplied: formData.treatmentApplied.trim(),
      dosage: formData.dosage.trim(),
      treatmentDuration: formData.treatmentDuration.trim(),
      quarantineEndDate: formData.quarantineEndDate || null,
      observations: formData.observations.trim(),
      active: formData.active === "true",
    };

    try {
      const token = localStorage.getItem("token");
      const url = isEdit
        ? API_QUARANTINE_UPDATE_URL(initialData.id)
        : API_QUARANTINE_CREATE_URL;
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
            `Error ${response.status}: No se pudo ${isEdit ? "actualizar" : "registrar"} la cuarentena`
        );
      }

      setMensajeExito(isEdit ? "¡Cuarentena actualizada correctamente!" : "¡Cuarentena guardada correctamente!");
      if (!isEdit) resetInputs();

      if (onQuarantineCreated) {
        onQuarantineCreated();
      }

      setTimeout(() => {
        handleOpenChange(false);
        setMensajeExito("");
      }, 1200);
    } catch (error: any) {
      console.error(`Error al ${isEdit ? "actualizar" : "registrar"} la cuarentena:`, error);
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
          <span>Registrar Cuarentena</span>
        </DialogTrigger>
      )}

      <DialogContent className="bg-white sm:max-w-[425px] md:max-w-[800px] max-h-[90vh] overflow-y-auto border border-border rounded-2xl shadow-xl">
        <DialogHeader className="font-bold text-2xl text-center text-title select-none pointer-events-none">
          <DialogTitle className="text-center font-bold text-2xl text-title select-none pointer-events-none">
            {isEdit ? "Editar Cuarentena" : "Registrar Cuarentena"}
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

        <form id="quarantine-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="quarantineDate"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Fecha de Inicio:
              </label>
              <input
                type="date"
                id="quarantineDate"
                name="quarantineDate"
                value={formData.quarantineDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
              />
            </div>

            <div>
              <label
                htmlFor="quarantineEndDate"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Fecha de Finalización:
              </label>
              <input
                type="date"
                id="quarantineEndDate"
                name="quarantineEndDate"
                value={formData.quarantineEndDate}
                onChange={handleChange}
                min={formData.quarantineDate || undefined}
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
                <option value="">Seleccione un medicamento...</option>
                {insumos.map((i) => (
                  <option key={i.id_supply} value={i.id_supply}>
                    {i.supplyName} ({i.reference})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="affectedBirds"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Aves Afectadas (Cantidad):
              </label>
              <input
                type="number"
                id="affectedBirds"
                name="affectedBirds"
                value={formData.affectedBirds}
                onChange={handleChange}
                min="1"
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                placeholder="Ej: 15"
              />
            </div>

            <div>
              <label
                htmlFor="treatmentDuration"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Duración del Tratamiento:
              </label>
              <input
                type="text"
                id="treatmentDuration"
                name="treatmentDuration"
                value={formData.treatmentDuration}
                onChange={handleChange}
                maxLength={50}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                placeholder="Ej: 7 días"
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="dosage"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Dosis:
              </label>
              <input
                type="text"
                id="dosage"
                name="dosage"
                value={formData.dosage}
                onChange={handleChange}
                maxLength={100}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                placeholder="Ej: 2 ml por litro de agua"
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="symptoms"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Síntomas:
              </label>
              <textarea
                id="symptoms"
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                rows={2}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                placeholder="Describa los síntomas observados..."
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="diagnosis"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Diagnóstico:
              </label>
              <textarea
                id="diagnosis"
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleChange}
                rows={2}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                placeholder="Diagnóstico veterinario..."
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="treatmentApplied"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Tratamiento Aplicado:
              </label>
              <textarea
                id="treatmentApplied"
                name="treatmentApplied"
                value={formData.treatmentApplied}
                onChange={handleChange}
                rows={2}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                placeholder="Tratamiento prescrito..."
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
              form="quarantine-form"
              disabled={guardando}
              className="flex-1 bg-green-1-navbar text-white font-medium py-2.5 px-4 rounded-xl hover:bg-green-2-navbar shadow-md focus:outline-none focus:ring-2 focus:ring-green-1-navbar disabled:opacity-50 transition cursor-pointer"
            >
              {guardando ? (isEdit ? "Actualizando..." : "Guardando...") : (isEdit ? "Actualizar Cuarentena" : "Guardar Cuarentena")}
            </button>
          </div>
        </DialogFooter>

        <DialogDescription className="text-center text-parrafo select-none pointer-events-none">
          {isEdit ? "Modifique la información de la cuarentena registrada." : "Complete los campos para registrar la cuarentena de un lote."}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
