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
  API_MORTALITY_CREATE_URL,
  API_BIRD_BATCH_ALL_URL,
  API_RESPONSIBLE_ALL_URL,
} from "@/api/config";

interface FormCreateMortalityProps {
  onMortalityCreated?: () => void;
}

export default function FormCreateMortality({ onMortalityCreated }: FormCreateMortalityProps) {
  const [open, setOpen] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  // Listas para los select
  const [lotes, setLotes] = useState<any[]>([]);
  const [responsables, setResponsables] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    id_lote: "",
    id_responsable: "",
    mortalityDate: "",
    mortalityTime: "",
    dailyMortality: "",
    possibleCauseOfDeath: "",
    necropsyPerformed: "false",
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

        // Solo responsables activos
        const resResponsables = await fetch(`${API_RESPONSIBLE_ALL_URL}?limit=500`);
        const dataResponsables = await resResponsables.json();
        const listaResponsables = dataResponsables.info || [];
        setResponsables(listaResponsables.filter((r: any) => r.active));
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
      id_responsable: "",
      mortalityDate: "",
      mortalityTime: "",
      dailyMortality: "",
      possibleCauseOfDeath: "",
      necropsyPerformed: "false",
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
      id_responsable: Number(formData.id_responsable),
      mortalityDate: formData.mortalityDate,
      mortalityTime: formData.mortalityTime,
      dailyMortality: Number(formData.dailyMortality),
      possibleCauseOfDeath: formData.possibleCauseOfDeath.trim(),
      necropsyPerformed: formData.necropsyPerformed === "true",
      observations: formData.observations.trim(),
      active: formData.active === "true",
    };

    try {
      const response = await fetch(API_MORTALITY_CREATE_URL, {
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
            `Error ${response.status}: No se pudo registrar el registro de mortalidad`
        );
      }

      setMensajeExito("¡Registro de mortalidad guardado correctamente!");
      resetInputs();

      // Avisa a la página para que la tabla se recargue de inmediato
      if (onMortalityCreated) {
        onMortalityCreated();
      }

      setTimeout(() => {
        setOpen(false);
        setMensajeExito("");
      }, 1500);
    } catch (error: any) {
      console.error("Error al registrar el registro de mortalidad:", error);
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
        <span>Registrar Mortalidad</span>
      </DialogTrigger>

      <DialogContent className="bg-white sm:max-w-[425px] md:max-w-[800px] max-h-[90vh] overflow-y-auto border border-border rounded-2xl shadow-xl">
        <DialogHeader className="font-bold text-2xl text-center text-title select-none pointer-events-none">
          <DialogTitle className="text-center font-bold text-2xl text-title select-none pointer-events-none">
            Registrar Mortalidad
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

        <form id="mortality-form" onSubmit={handleSubmit} className="space-y-4">
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
                htmlFor="id_responsable"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Responsable:
              </label>
              <select
                id="id_responsable"
                name="id_responsable"
                value={formData.id_responsable}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title focus:outline-none focus:border-[#C5B8A5]"
              >
                <option value="">Seleccione un responsable</option>
                {responsables.map((responsable: any) => (
                  <option key={responsable.id} value={responsable.id}>
                    {responsable.fullName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="mortalityDate"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Fecha:
              </label>
              <input
                type="date"
                id="mortalityDate"
                name="mortalityDate"
                value={formData.mortalityDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
              />
            </div>

            <div>
              <label
                htmlFor="mortalityTime"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Hora:
              </label>
              <input
                type="time"
                id="mortalityTime"
                name="mortalityTime"
                value={formData.mortalityTime}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
              />
            </div>

            <div>
              <label
                htmlFor="dailyMortality"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Mortalidad del Día:
              </label>
              <input
                type="number"
                id="dailyMortality"
                name="dailyMortality"
                value={formData.dailyMortality}
                onChange={handleChange}
                min="0"
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                placeholder="Ej: 3"
              />
            </div>

            <div>
              <label
                htmlFor="possibleCauseOfDeath"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Posible Causa de Muerte:
              </label>
              <input
                type="text"
                id="possibleCauseOfDeath"
                name="possibleCauseOfDeath"
                value={formData.possibleCauseOfDeath}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                placeholder="Ej: Calor"
              />
            </div>

            <div>
              <label
                htmlFor="necropsyPerformed"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Necropsia Realizada:
              </label>
              <select
                id="necropsyPerformed"
                name="necropsyPerformed"
                value={formData.necropsyPerformed}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title focus:outline-none focus:border-[#C5B8A5]"
              >
                <option value="false">No</option>
                <option value="true">Sí</option>
              </select>
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
              form="mortality-form"
              disabled={guardando}
              className="flex-1 bg-green-1-navbar text-white font-medium py-2.5 px-4 rounded-xl hover:bg-green-2-navbar shadow-md focus:outline-none focus:ring-2 focus:ring-green-1-navbar disabled:opacity-50 transition"
            >
              {guardando ? "Guardando..." : "Guardar Mortalidad"}
            </button>
          </div>
        </DialogFooter>

        <DialogDescription className="text-center text-parrafo select-none pointer-events-none">
          Complete los campos para registrar la mortalidad de un lote.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
