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
import { API_BIRD_BATCH_CREATE_URL, API_BIRD_BATCH_UPDATE_URL } from "@/api/config";

interface FormCreateBirdBatchProps {
  onBirdBatchCreated?: () => void;
  initialData?: any;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

// Vacunas del programa de referencia para gallinas ponedoras Hy-Line Brown.
const VACUNAS_HY_LINE = [
  "Marek",
  "Newcastle",
  "Bronquitis Infecciosa",
  "Gumboro",
  "Viruela Aviar",
  "Encefalomielitis Aviar",
  "Laringotraqueítis",
  "Mycoplasma gallisepticum",
  "Coriza Infecciosa",
  "Síndrome de Baja Postura (EDS)",
  "Salmonella",
  "Coccidiosis",
  "Metapneumovirus",
  "Cólera Aviar",
];

const RAZAS_AVE = ["Hy-Line Brown"];

export default function FormCreateBirdBatch({
  onBirdBatchCreated,
  initialData,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: FormCreateBirdBatchProps) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isControlled ? controlledOpen : internalOpen;
  const isEdit = Boolean(initialData);

  const [guardando, setGuardando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const [formData, setFormData] = useState({
    entryDate: "",
    endDate: "",
    batchNumber: "",
    birdBreed: "",
    birdQuantity: "",
    batchWeight: "",
    birdAgeWeeks: "",
    active: "true",
  });

  const [vacunas, setVacunas] = useState<string[]>([]);

  useEffect(() => {
    if (initialData && open) {
      const cleanDate = (d?: string | null) => (d ? d.split("T")[0] : "");
      setFormData({
        entryDate: cleanDate(initialData.entryDate),
        endDate: cleanDate(initialData.endDate),
        batchNumber: initialData.batchNumber || "",
        birdBreed: initialData.birdBreed || "",
        birdQuantity: String(initialData.birdQuantity ?? ""),
        batchWeight: String(initialData.batchWeight ?? ""),
        birdAgeWeeks: String(initialData.birdAgeWeeks ?? ""),
        active: initialData.active ? "true" : "false",
      });

      if (initialData.appliedVaccines) {
        const arr = String(initialData.appliedVaccines)
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean);
        setVacunas(arr);
      } else {
        setVacunas([]);
      }
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

  const handleVacunaChange = (vacuna: string) => {
    setVacunas((prev) =>
      prev.includes(vacuna)
        ? prev.filter((v) => v !== vacuna)
        : [...prev, vacuna]
    );
  };

  const resetInputs = () => {
    setFormData({
      entryDate: "",
      endDate: "",
      batchNumber: "",
      birdBreed: "",
      birdQuantity: "",
      batchWeight: "",
      birdAgeWeeks: "",
      active: "true",
    });
    setVacunas([]);
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
    setMensajeExito("");
    setMensajeError("");

    if (vacunas.length === 0) {
      setMensajeError("Seleccione al menos una vacuna aplicada");
      return;
    }

    setGuardando(true);

    const datosEnviar = {
      entryDate: formData.entryDate,
      endDate: formData.endDate,
      batchNumber: formData.batchNumber.trim(),
      birdBreed: formData.birdBreed,
      birdQuantity: Number(formData.birdQuantity) || 0,
      batchWeight: Number(formData.batchWeight) || 0,
      birdAgeWeeks: Number(formData.birdAgeWeeks) || 0,
      appliedVaccines: VACUNAS_HY_LINE.filter((v) => vacunas.includes(v)).join(", ") || vacunas.join(", "),
      active: formData.active === "true",
    };

    try {
      const token = localStorage.getItem("token");
      const url = isEdit
        ? API_BIRD_BATCH_UPDATE_URL(initialData.id)
        : API_BIRD_BATCH_CREATE_URL;
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
        // En caso de que el backend responda con texto plano o sin cuerpo
      }

      if (!response.ok) {
        throw new Error(
          resultado?.message ||
          resultado?.mensaje ||
          resultado?.error ||
          `Error ${response.status}: No se pudo ${isEdit ? "actualizar" : "registrar"} el lote de aves`
        );
      }

      setMensajeExito(isEdit ? "¡Lote de aves actualizado correctamente!" : "¡Lote de aves registrado correctamente!");
      if (!isEdit) resetInputs();

      if (onBirdBatchCreated) {
        onBirdBatchCreated();
      }

      setTimeout(() => {
        handleOpenChange(false);
        setMensajeExito("");
      }, 1200);
    } catch (error: any) {
      console.error(`Error al ${isEdit ? "actualizar" : "registrar"} lote de aves:`, error);
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
          <span>Registrar Lote</span>
        </DialogTrigger>
      )}

      <DialogContent className="bg-white sm:max-w-[425px] md:max-w-[800px] border border-border rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="font-bold text-2xl text-center text-title select-none pointer-events-none">
          <DialogTitle className="text-center font-bold text-2xl text-title select-none pointer-events-none">
            {isEdit ? "Editar Lote de Aves" : "Crear Lote de Aves"}
          </DialogTitle>
        </DialogHeader>

        {mensajeExito && (
          <div className="w-full rounded-md border border-green-600 bg-green-50 p-3 text-center text-sm font-semibold text-green-800 animate-in fade-in select-none pointer-events-none">
            {mensajeExito}
          </div>
        )}

        {mensajeError && (
          <div className="w-full rounded-md border border-red-500 bg-red-50 p-3 text-center text-sm font-semibold text-red-700 animate-in fade-in select-none pointer-events-none">
            {mensajeError}
          </div>
        )}

        <form id="bird-batch-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="entryDate"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Fecha de Ingreso:
              </label>
              <input
                type="date"
                id="entryDate"
                name="entryDate"
                value={formData.entryDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
              />
            </div>

            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Fecha de Finalización:
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                min={formData.entryDate || undefined}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
              />
            </div>

            <div>
              <label
                htmlFor="batchNumber"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Número de Lote:
              </label>
              <input
                type="text"
                id="batchNumber"
                name="batchNumber"
                value={formData.batchNumber}
                onChange={handleChange}
                maxLength={30}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                placeholder="Ej: LOTE-2026-01"
              />
            </div>

            <div>
              <label
                htmlFor="birdBreed"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Raza de Aves:
              </label>
              <select
                id="birdBreed"
                name="birdBreed"
                value={formData.birdBreed}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title focus:outline-none focus:border-[#C5B8A5] cursor-pointer"
              >
                <option value="">Seleccione una raza...</option>
                {RAZAS_AVE.map((raza) => (
                  <option key={raza} value={raza}>
                    {raza}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="birdQuantity"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Cantidad de Aves:
              </label>
              <input
                type="number"
                id="birdQuantity"
                name="birdQuantity"
                value={formData.birdQuantity}
                onChange={handleChange}
                min="1"
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                placeholder="Ej: 500"
              />
            </div>

            <div>
              <label
                htmlFor="batchWeight"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Peso Inicial del Lote (kg):
              </label>
              <input
                type="number"
                id="batchWeight"
                name="batchWeight"
                value={formData.batchWeight}
                onChange={handleChange}
                min="0.1"
                step="0.01"
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                placeholder="Ej: 750.5"
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="birdAgeWeeks"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Edad de las Aves (Semanas):
              </label>
              <input
                type="number"
                id="birdAgeWeeks"
                name="birdAgeWeeks"
                value={formData.birdAgeWeeks}
                onChange={handleChange}
                min="1"
                max="150"
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                placeholder="Ej: 18"
              />
            </div>

            <div className="col-span-2">
              <p className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none">
                Vacunas Aplicadas:
              </p>
              <div className="grid grid-cols-2 gap-2 rounded-md border border-border p-3 max-h-48 overflow-y-auto">
                {VACUNAS_HY_LINE.map((vacuna) => (
                  <div key={vacuna} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`vacuna-${vacuna}`}
                      checked={vacunas.includes(vacuna)}
                      onChange={() => handleVacunaChange(vacuna)}
                      className="size-4 cursor-pointer accent-green-700"
                    />
                    <label
                      htmlFor={`vacuna-${vacuna}`}
                      className="text-sm text-title select-none cursor-pointer"
                    >
                      {vacuna}
                    </label>
                  </div>
                ))}
              </div>
              <p className="mt-1 text-xs text-parrafo select-none pointer-events-none">
                Seleccionadas: {vacunas.length} de {VACUNAS_HY_LINE.length}
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
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md shadow-sm focus:outline-none disabled:opacity-50 transition cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              form="bird-batch-form"
              disabled={guardando}
              className="flex-1 bg-green-1-navbar text-white font-medium py-2 px-4 rounded-md hover:bg-green-2-navbar shadow-md focus:outline-none focus:ring-2 focus:ring-green-1-navbar disabled:opacity-50 transition cursor-pointer"
            >
              {guardando ? (isEdit ? "Actualizando..." : "Guardando...") : (isEdit ? "Actualizar Lote" : "Guardar Lote de Aves")}
            </button>
          </div>
        </DialogFooter>

        <DialogDescription className="text-center text-parrafo select-none pointer-events-none">
          {isEdit ? "Modifique la información del lote de aves seleccionado." : "Complete los campos para registrar un nuevo lote avícola."}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
