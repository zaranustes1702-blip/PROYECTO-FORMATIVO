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
  API_WEIGHING_CREATE_URL,
  API_WEIGHING_UPDATE_URL,
  API_BIRD_BATCH_ALL_URL,
  API_RESPONSIBLE_ALL_URL,
} from "@/api/config";

interface FormCreateWeighingProps {
  onWeighingCreated?: () => void;
  initialData?: any;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const RANGO_UNIFORMIDAD = 0.1;
const META_UNIFORMIDAD = 80;

export default function FormCreateWeighing({
  onWeighingCreated,
  initialData,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: FormCreateWeighingProps) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isControlled ? controlledOpen : internalOpen;
  const isEdit = Boolean(initialData);

  const [guardando, setGuardando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const [formData, setFormData] = useState({
    id_birdBatch: "",
    weighingDate: "",
    weighingTime: "",
    responsiblePerson: "",
    weighedBirds: "",
    totalWeightKg: "",
    averageWeightGrams: "",
    avesEnRango: "",
    batchUniformityPercentage: "",
    active: "true",
  });

  const [responsables, setResponsables] = useState<any[]>([]);
  const [lotes, setLotes] = useState<any[]>([]);

  const [promedioManual, setPromedioManual] = useState(false);
  const [uniformidadManual, setUniformidadManual] = useState(false);

  useEffect(() => {
    if (!open) return;

    const cargarDatos = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers: any = token ? { Authorization: `Bearer ${token}` } : {};

        const resResponsables = await fetch(`${API_RESPONSIBLE_ALL_URL}?limit=500`, { headers });
        const resJsonResp = await resResponsables.json();
        const listaResp = resJsonResp.info || resJsonResp.data || [];
        setResponsables(listaResp);

        const resLotes = await fetch(`${API_BIRD_BATCH_ALL_URL}?limit=500`, { headers });
        const resJsonLotes = await resLotes.json();
        const listaLotes = resJsonLotes.info || resJsonLotes.data || [];
        setLotes(listaLotes);
      } catch (error) {
        console.error("Error al cargar responsables o lotes:", error);
      }
    };

    cargarDatos();
  }, [open]);

  useEffect(() => {
    if (initialData && open) {
      const cleanDate = (d?: string | null) => (d ? d.split("T")[0] : "");
      const cleanTime = (t?: string | null) => (t ? String(t).slice(0, 5) : "");
      setFormData({
        id_birdBatch: String(initialData.id_birdBatch ?? ""),
        weighingDate: cleanDate(initialData.weighingDate),
        weighingTime: cleanTime(initialData.weighingTime),
        responsiblePerson: initialData.responsiblePerson || "",
        weighedBirds: String(initialData.birdsWeighed ?? initialData.weighedBirds ?? ""),
        totalWeightKg: String(initialData.totalWeightKg ?? ""),
        averageWeightGrams: String(initialData.averageWeightGrams ?? ""),
        avesEnRango: initialData.avesEnRango
          ? String(initialData.avesEnRango)
          : (() => {
              const b = Number(initialData.birdsWeighed ?? initialData.weighedBirds ?? 0);
              const u = Number(initialData.uniformityPercentage ?? initialData.batchUniformityPercentage ?? 0);
              return b > 0 && u > 0 ? String(Math.round((b * u) / 100)) : "";
            })(),
        batchUniformityPercentage: String(initialData.uniformityPercentage ?? initialData.batchUniformityPercentage ?? ""),
        active: initialData.active ? "true" : "false",
      });
      setPromedioManual(true);
      setUniformidadManual(true);
      setMensajeExito("");
      setMensajeError("");
    } else if (!initialData && open) {
      resetInputs();
      setMensajeExito("");
      setMensajeError("");
    }
  }, [initialData, open]);

  const promedio = Number(formData.averageWeightGrams);
  const rangoMinimo = promedio > 0 ? (promedio * (1 - RANGO_UNIFORMIDAD)).toFixed(0) : "";
  const rangoMaximo = promedio > 0 ? (promedio * (1 + RANGO_UNIFORMIDAD)).toFixed(0) : "";
  const uniformidad = Number(formData.batchUniformityPercentage);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    if (name === "averageWeightGrams") {
      setPromedioManual(true);
    }

    if (name === "batchUniformityPercentage") {
      setUniformidadManual(true);
    }

    setFormData((prev) => {
      const actualizados = { ...prev, [name]: value };

      const aves = Number(actualizados.weighedBirds);
      const pesoTotal = Number(actualizados.totalWeightKg);
      const enRango = Number(actualizados.avesEnRango);

      if (
        (name === "weighedBirds" || name === "totalWeightKg") &&
        !promedioManual &&
        aves > 0 &&
        pesoTotal > 0
      ) {
        actualizados.averageWeightGrams = ((pesoTotal * 1000) / aves).toFixed(2);
      }

      if (
        (name === "weighedBirds" || name === "avesEnRango") &&
        !uniformidadManual &&
        aves > 0 &&
        actualizados.avesEnRango !== "" &&
        enRango >= 0 &&
        enRango <= aves
      ) {
        actualizados.batchUniformityPercentage = ((enRango / aves) * 100).toFixed(2);
      }

      return actualizados;
    });
  };

  const resetInputs = () => {
    setFormData({
      id_birdBatch: "",
      weighingDate: "",
      weighingTime: "",
      responsiblePerson: "",
      weighedBirds: "",
      totalWeightKg: "",
      averageWeightGrams: "",
      avesEnRango: "",
      batchUniformityPercentage: "",
      active: "true",
    });
    setPromedioManual(false);
    setUniformidadManual(false);
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
      id_birdBatch: Number(formData.id_birdBatch) || 0,
      weighingDate: formData.weighingDate,
      weighingTime: formData.weighingTime,
      responsiblePerson: formData.responsiblePerson.trim(),
      weighedBirds: Number(formData.weighedBirds) || 0,
      totalWeightKg: Number(formData.totalWeightKg) || 0,
      averageWeightGrams: Number(formData.averageWeightGrams) || 0,
      batchUniformityPercentage: Number(formData.batchUniformityPercentage) || 0,
      active: formData.active === "true",
    };

    try {
      const token = localStorage.getItem("token");
      const url = isEdit
        ? API_WEIGHING_UPDATE_URL(initialData.id)
        : API_WEIGHING_CREATE_URL;
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
            `Error ${response.status}: No se pudo ${isEdit ? "actualizar" : "registrar"} el pesaje`
        );
      }

      setMensajeExito(isEdit ? "¡Pesaje actualizado correctamente!" : "¡Pesaje registrado correctamente!");
      if (!isEdit) resetInputs();

      if (onWeighingCreated) {
        onWeighingCreated();
      }

      setTimeout(() => {
        handleOpenChange(false);
        setMensajeExito("");
      }, 1200);
    } catch (error: any) {
      console.error(`Error al ${isEdit ? "actualizar" : "registrar"} pesaje:`, error);
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
          <span>Registrar Pesaje</span>
        </DialogTrigger>
      )}

      <DialogContent className="bg-white sm:max-w-[425px] md:max-w-[800px] border border-border rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="font-bold text-2xl text-center text-title select-none pointer-events-none">
          <DialogTitle className="text-center font-bold text-2xl text-title select-none pointer-events-none">
            {isEdit ? "Editar Pesaje" : "Registrar Pesaje"}
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

        <form id="weighing-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="weighingDate"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Fecha del Pesaje:
              </label>
              <input
                type="date"
                id="weighingDate"
                name="weighingDate"
                value={formData.weighingDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              />
            </div>

            <div>
              <label
                htmlFor="weighingTime"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Hora del Pesaje:
              </label>
              <input
                type="time"
                id="weighingTime"
                name="weighingTime"
                value={formData.weighingTime}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              />
            </div>

            <div>
              <label
                htmlFor="id_birdBatch"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Lote de Aves:
              </label>
              <select
                id="id_birdBatch"
                name="id_birdBatch"
                value={formData.id_birdBatch}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title focus:outline-none focus:ring-2 focus:ring-green-1-navbar cursor-pointer"
              >
                <option value="">Selecciona un lote...</option>
                {lotes.map((lote) => (
                  <option key={lote.id} value={lote.id}>
                    {lote.batchNumber} - {lote.birdBreed} ({lote.birdQuantity} aves)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="responsiblePerson"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Persona Responsable:
              </label>
              <select
                id="responsiblePerson"
                name="responsiblePerson"
                value={formData.responsiblePerson}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title focus:outline-none focus:ring-2 focus:ring-green-1-navbar cursor-pointer"
              >
                <option value="">Selecciona un responsable...</option>
                {responsables.map((r) => (
                  <option key={r.id} value={r.fullName}>
                    {r.fullName} ({r.responsibleType})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="weighedBirds"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Aves Pesadas (Muestra):
              </label>
              <input
                type="number"
                id="weighedBirds"
                name="weighedBirds"
                min="1"
                value={formData.weighedBirds}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Ej: 50"
              />
            </div>

            <div>
              <label
                htmlFor="totalWeightKg"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Peso Total de la Muestra (kg):
              </label>
              <input
                type="number"
                id="totalWeightKg"
                name="totalWeightKg"
                min="0.01"
                step="0.01"
                value={formData.totalWeightKg}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Ej: 95.5"
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="averageWeightGrams"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Peso Promedio por Ave (Gramos, automático):
              </label>
              <input
                type="number"
                id="averageWeightGrams"
                name="averageWeightGrams"
                min="1"
                step="0.01"
                value={formData.averageWeightGrams}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Se calcula solo con las aves y el peso total"
              />
              <p className="mt-1 text-xs text-parrafo select-none pointer-events-none">
                {promedio > 0
                  ? `Rango ±10%: de ${rangoMinimo} g a ${rangoMaximo} g (para uniformidad).`
                  : "Ingrese aves y peso total para calcular el promedio."}
                {promedioManual && " · Editado a mano."}
              </p>
            </div>

            <div>
              <label
                htmlFor="avesEnRango"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Aves en el Rango ±10%:
              </label>
              <input
                type="number"
                id="avesEnRango"
                name="avesEnRango"
                min="0"
                max={formData.weighedBirds || undefined}
                value={formData.avesEnRango}
                onChange={handleChange}
                disabled={!promedio}
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar disabled:bg-gray-100 disabled:text-gray-400"
                placeholder={promedio ? `Entre ${rangoMinimo} y ${rangoMaximo} g` : "Primero ingrese las aves"}
              />
            </div>

            <div>
              <label
                htmlFor="batchUniformityPercentage"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Uniformidad del Lote (%):
              </label>
              <input
                type="number"
                id="batchUniformityPercentage"
                name="batchUniformityPercentage"
                min="0"
                max="100"
                step="0.01"
                value={formData.batchUniformityPercentage}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Se calcula con las aves en rango"
              />
              <p className="mt-1 text-xs text-parrafo select-none pointer-events-none">
                {formData.batchUniformityPercentage !== ""
                  ? uniformidad >= META_UNIFORMIDAD
                    ? `Cumple la meta Hy-Line (${META_UNIFORMIDAD}% o más).`
                    : `Por debajo de la meta Hy-Line (${META_UNIFORMIDAD}% o más).`
                  : `Meta Hy-Line: ${META_UNIFORMIDAD}% o más.`}
                {uniformidadManual && " · Editada manualmente."}
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
              form="weighing-form"
              disabled={guardando}
              className="flex-1 bg-green-1-navbar text-white font-medium py-2.5 px-4 rounded-xl hover:bg-green-2-navbar shadow-md focus:outline-none focus:ring-2 focus:ring-green-1-navbar disabled:opacity-50 transition cursor-pointer"
            >
              {guardando ? (isEdit ? "Actualizando..." : "Guardando...") : (isEdit ? "Actualizar Pesaje" : "Guardar Pesaje")}
            </button>
          </div>
        </DialogFooter>

        <DialogDescription className="text-center text-parrafo select-none pointer-events-none">
          {isEdit ? "Modifique la información del pesaje registrado." : "Complete los campos para registrar el peso corporal y la uniformidad de las aves."}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
