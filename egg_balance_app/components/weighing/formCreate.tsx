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
import { API_WEIGHING_URL } from "@/api/config";

interface FormCreateWeighingProps {
  onWeighingCreated?: () => void;
}

// Guía Hy-Line Brown: la uniformidad es el % de aves cuyo peso está
// dentro de ±10% del peso promedio. Meta recomendada: 80% o más.
const RANGO_UNIFORMIDAD = 0.1;
const META_UNIFORMIDAD = 80;

export default function FormCreateWeighing({ onWeighingCreated }: FormCreateWeighingProps) {
  const [open, setOpen] = useState(false);
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

  // Responsables cargados desde el módulo de responsables
  const [responsables, setResponsables] = useState<any[]>([]);

  // Lotes de aves cargados desde el módulo de lotes
  const [lotes, setLotes] = useState<any[]>([]);

  // Si el usuario escribe el valor a mano, ya no se recalcula solo
  const [promedioManual, setPromedioManual] = useState(false);
  const [uniformidadManual, setUniformidadManual] = useState(false);

  // Carga los responsables cada vez que se abre el formulario
  useEffect(() => {
    if (!open) return;

    const cargarResponsables = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:3000/api/responsibles/ResponsibleAll?limit=500",
          {
            method: "GET",
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          }
        );

        const resJson = await response.json();
        const lista = resJson.info || resJson.data || [];

        // Solo responsables activos
        setResponsables(
          Array.isArray(lista) ? lista.filter((resp: any) => resp.active) : []
        );
      } catch (error) {
        console.error("Error al cargar responsables:", error);
        setResponsables([]);
      }
    };

    const cargarLotes = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:3000/api/bird-batches/BirdBatchAll?limit=500",
          {
            method: "GET",
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          }
        );

        const resJson = await response.json();
        const lista = resJson.info || resJson.data || [];

        // Solo lotes activos
        setLotes(
          Array.isArray(lista) ? lista.filter((lote: any) => lote.active) : []
        );
      } catch (error) {
        console.error("Error al cargar lotes:", error);
        setLotes([]);
      }
    };

    cargarResponsables();
    cargarLotes();
  }, [open]);

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

      // Peso promedio (g) = peso total (kg) x 1000 / aves pesadas
      if (
        (name === "weighedBirds" || name === "totalWeightKg") &&
        !promedioManual &&
        aves > 0 &&
        pesoTotal > 0
      ) {
        actualizados.averageWeightGrams = ((pesoTotal * 1000) / aves).toFixed(2);
      }

      // Uniformidad (%) = aves dentro de ±10% del promedio / aves pesadas x 100
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

    // Los nombres coinciden con el modelo del backend (weighingModel)
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
      const response = await fetch(`${API_WEIGHING_URL}/CreateWeighing`, {
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
        throw new Error(
          resultado?.message ||
            resultado?.mensaje ||
            resultado?.error ||
            `Error ${response.status}: No se pudo registrar el pesaje`
        );
      }

      setMensajeExito("¡Pesaje registrado correctamente!");
      resetInputs();

      // Avisa a la página para que la tabla se recargue de inmediato
      if (onWeighingCreated) {
        onWeighingCreated();
      }

      setTimeout(() => {
        setOpen(false);
        setMensajeExito("");
      }, 1500);
    } catch (error: any) {
      console.error("Error al registrar pesaje:", error);
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
        <span>Registrar Pesaje</span>
      </DialogTrigger>

      <DialogContent className="bg-white sm:max-w-[425px] md:max-w-[800px] max-h-[90vh] overflow-y-auto border border-border rounded-2xl shadow-xl">
        <DialogHeader className="font-bold text-2xl text-center text-title select-none pointer-events-none">
          <DialogTitle className="text-center font-bold text-2xl text-title select-none pointer-events-none">
            Registrar Pesaje
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
            <div className="col-span-2">
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
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              >
                <option value="">
                  {lotes.length > 0
                    ? "Seleccione un lote"
                    : "No hay lotes activos"}
                </option>
                {lotes.map((lote: any) => (
                  <option key={lote.id} value={lote.id}>
                    {lote.batchNumber}
                    {lote.birdBreed ? ` (${lote.birdBreed})` : ""}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-parrafo select-none pointer-events-none">
                El peso promedio de este pesaje se mostrará como peso actual del lote.
              </p>
            </div>

            <div>
              <label
                htmlFor="weighingDate"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Fecha:
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
                Hora:
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
                htmlFor="responsiblePerson"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Responsable:
              </label>
              <select
                id="responsiblePerson"
                name="responsiblePerson"
                value={formData.responsiblePerson}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              >
                <option value="">
                  {responsables.length > 0
                    ? "Seleccione un responsable"
                    : "No hay responsables activos"}
                </option>
                {responsables.map((resp: any) => (
                  <option key={resp.id} value={resp.fullName}>
                    {resp.fullName}{resp.role ? ` (${resp.role})` : ""}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="weighedBirds"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Aves Pesadas (muestra):
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
                placeholder="Ej: 100"
              />
            </div>

            <div>
              <label
                htmlFor="totalWeightKg"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Peso Total (kg):
              </label>
              <input
                type="number"
                id="totalWeightKg"
                name="totalWeightKg"
                min="0"
                step="0.01"
                value={formData.totalWeightKg}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Peso de todas las aves pesadas"
              />
            </div>

            <div>
              <label
                htmlFor="averageWeightGrams"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Peso Promedio (g):
              </label>
              <input
                type="number"
                id="averageWeightGrams"
                name="averageWeightGrams"
                min="0"
                step="0.01"
                value={formData.averageWeightGrams}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Se calcula con peso total y aves"
              />
              <p className="mt-1 text-xs text-parrafo select-none pointer-events-none">
                {promedio > 0
                  ? `Rango ±10%: ${rangoMinimo} g – ${rangoMaximo} g`
                  : "Peso total (kg) x 1000 ÷ aves pesadas."}
                {promedioManual && " · Editado manualmente."}
              </p>
            </div>

            <div>
              <label
                htmlFor="avesEnRango"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Aves dentro de ±10%:
              </label>
              <input
                type="number"
                id="avesEnRango"
                name="avesEnRango"
                min="0"
                max={formData.weighedBirds || undefined}
                value={formData.avesEnRango}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Aves con peso dentro del rango"
              />
              <p className="mt-1 text-xs text-parrafo select-none pointer-events-none">
                Solo sirve para calcular la uniformidad; no se guarda.
              </p>
            </div>

            <div>
              <label
                htmlFor="batchUniformityPercentage"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Uniformidad (%):
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
              form="weighing-form"
              disabled={guardando}
              className="flex-1 bg-green-1-navbar text-white font-medium py-2.5 px-4 rounded-xl hover:bg-green-2-navbar shadow-md focus:outline-none focus:ring-2 focus:ring-green-1-navbar disabled:opacity-50 transition"
            >
              {guardando ? "Guardando..." : "Guardar Pesaje"}
            </button>
          </div>
        </DialogFooter>

        <DialogDescription className="text-center text-parrafo select-none pointer-events-none">
          Complete los campos para registrar el peso corporal y la uniformidad de las aves.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
