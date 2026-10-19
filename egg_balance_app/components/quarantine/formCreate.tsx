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
  API_BIRD_BATCH_ALL_URL,
  API_SUPPLY_ALL_URL,
} from "@/api/config";

interface FormCreateQuarantineProps {
  onQuarantineCreated?: () => void;
}

export default function FormCreateQuarantine({ onQuarantineCreated }: FormCreateQuarantineProps) {
  const [open, setOpen] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  // Listas para los select
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

  // Cada vez que se abre el formulario se cargan las listas de los select
  useEffect(() => {
    if (!open) return;

    const cargarListas = async () => {
      try {
        // Solo lotes activos
        const resLotes = await fetch(`${API_BIRD_BATCH_ALL_URL}?limit=500`);
        const dataLotes = await resLotes.json();
        const listaLotes = dataLotes.info || [];
        setLotes(listaLotes.filter((l: any) => l.active));

        // Solo insumos activos de tipo medicamentos
        const resInsumos = await fetch(`${API_SUPPLY_ALL_URL}?limit=500`);
        const dataInsumos = await resInsumos.json();
        const listaInsumos = dataInsumos.info || [];
        setInsumos(
          listaInsumos.filter((i: any) => i.active && i.supplyType === "medicamentos")
        );
      } catch (error) {
        console.error("Error al cargar las listas:", error);
        setMensajeError("No se pudieron cargar los datos de los select.");
      }
    };

    cargarListas();
  }, [open]);

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
      const response = await fetch(API_QUARANTINE_CREATE_URL, {
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
        // En caso de respuesta vacía
      }

      if (!response.ok) {
        // El backend manda la lista de errores en "info"
        const detalle = Array.isArray(resultado?.info)
          ? resultado.info.join(" · ")
          : "";

        throw new Error(
          detalle ||
            resultado?.message ||
            `Error ${response.status}: No se pudo registrar la cuarentena`
        );
      }

      setMensajeExito("¡Cuarentena guardada correctamente!");
      resetInputs();

      // Avisa a la página para que la tabla se recargue de inmediato
      if (onQuarantineCreated) {
        onQuarantineCreated();
      }

      setTimeout(() => {
        setOpen(false);
        setMensajeExito("");
      }, 1500);
    } catch (error: any) {
      console.error("Error al registrar la cuarentena:", error);
      setMensajeError(
        error.message || "Ocurrió un error inesperado al conectar con el servidor"
      );
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger className="inline-flex items-center justify-center gap-2 bg-green-1-navbar hover:bg-green-2-navbar text-white font-medium px-5 py-2.5 rounded-xl shadow-sm hover:shadow hover:scale-[1.01] transition-all cursor-pointer">
        <Plus className="w-5 h-5 text-white" />
        <span>Registrar Cuarentena</span>
      </DialogTrigger>

      <DialogContent className="bg-white sm:max-w-[425px] md:max-w-[800px] max-h-[90vh] overflow-y-auto border border-border rounded-2xl shadow-xl">
        <DialogHeader className="font-bold text-2xl text-center text-title select-none pointer-events-none">
          <DialogTitle className="text-center font-bold text-2xl text-title select-none pointer-events-none">
            Registrar Cuarentena
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
                htmlFor="id_lote"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Lote:
              </label>
              <select
                id="id_lote"
                name="id_lote"
                value={formData.id_lote}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title focus:outline-none focus:border-[#C5B8A5]"
              >
                <option value="">Seleccione un lote</option>
                {lotes.map((lote: any) => (
                  <option key={lote.id} value={lote.id}>
                    {lote.batchNumber}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="id_supply"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Insumo (medicamento):
              </label>
              <select
                id="id_supply"
                name="id_supply"
                value={formData.id_supply}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title focus:outline-none focus:border-[#C5B8A5]"
              >
                <option value="">Seleccione un insumo</option>
                {insumos.map((insumo: any) => (
                  <option key={insumo.id_supply} value={insumo.id_supply}>
                    {insumo.supplyName} ({insumo.id_supply})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="quarantineDate"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Fecha de Cuarentena:
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
                htmlFor="affectedBirds"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Aves Afectadas:
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
                placeholder="Ej: 10"
              />
            </div>

            <div>
              <label
                htmlFor="symptoms"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Síntomas:
              </label>
              <input
                type="text"
                id="symptoms"
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                placeholder="Ej: Tos y estornudos"
              />
            </div>

            <div>
              <label
                htmlFor="diagnosis"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Diagnóstico:
              </label>
              <input
                type="text"
                id="diagnosis"
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                placeholder="Ej: Coriza"
              />
            </div>

            <div>
              <label
                htmlFor="treatmentApplied"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Tratamiento Aplicado:
              </label>
              <input
                type="text"
                id="treatmentApplied"
                name="treatmentApplied"
                value={formData.treatmentApplied}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                placeholder="Ej: Antibiótico"
              />
            </div>

            <div>
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
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                placeholder="Ej: 1 ml por ave"
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
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                placeholder="Ej: 5 días"
              />
            </div>

            <div>
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
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title focus:outline-none focus:border-[#C5B8A5]"
              >
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="quarantineEndDate"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Fecha de Finalización (opcional):
              </label>
              <input
                type="date"
                id="quarantineEndDate"
                name="quarantineEndDate"
                value={formData.quarantineEndDate}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
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
              className="flex-1 bg-[#E8DFD1] hover:bg-[#D9CCB8] text-[#3A2A1A] font-medium py-2.5 px-4 rounded-xl shadow-sm focus:outline-none disabled:opacity-50 transition"
            >
              Cancelar
            </button>

            <button
              type="submit"
              form="quarantine-form"
              disabled={guardando}
              className="flex-1 bg-green-1-navbar text-white font-medium py-2.5 px-4 rounded-xl hover:bg-green-2-navbar shadow-md focus:outline-none focus:ring-2 focus:ring-green-1-navbar disabled:opacity-50 transition"
            >
              {guardando ? "Guardando..." : "Guardar Cuarentena"}
            </button>
          </div>
        </DialogFooter>

        <DialogDescription className="text-center text-parrafo select-none pointer-events-none">
          Complete los campos para registrar la cuarentena de un lote.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
