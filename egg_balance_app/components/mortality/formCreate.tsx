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
  API_MORTALITY_UPDATE_URL,
  API_BIRD_BATCH_ALL_URL,
  API_RESPONSIBLE_ALL_URL,
} from "@/api/config";

interface FormCreateMortalityProps {
  onMortalityCreated?: () => void;
  initialData?: any;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function FormCreateMortality({
  onMortalityCreated,
  initialData,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: FormCreateMortalityProps) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isControlled ? controlledOpen : internalOpen;
  const isEdit = Boolean(initialData);

  const [guardando, setGuardando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");

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

        const resResponsables = await fetch(`${API_RESPONSIBLE_ALL_URL}?limit=500`, { headers });
        const dataResponsables = await resResponsables.json();
        const listaResponsables = dataResponsables.info || [];
        setResponsables(listaResponsables);
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
      const cleanTime = (t?: string | null) => (t ? String(t).slice(0, 5) : "");
      setFormData({
        id_lote: String(initialData.id_lote ?? ""),
        id_responsable: String(initialData.id_responsable ?? ""),
        mortalityDate: cleanDate(initialData.mortalityDate),
        mortalityTime: cleanTime(initialData.mortalityTime),
        dailyMortality: String(initialData.dailyMortality ?? ""),
        possibleCauseOfDeath: initialData.possibleCauseOfDeath || "",
        necropsyPerformed: initialData.necropsyPerformed ? "true" : "false",
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
      const token = localStorage.getItem("token");
      const url = isEdit
        ? API_MORTALITY_UPDATE_URL(initialData.id)
        : API_MORTALITY_CREATE_URL;
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
            `Error ${response.status}: No se pudo ${isEdit ? "actualizar" : "registrar"} el registro de mortalidad`
        );
      }

      setMensajeExito(isEdit ? "¡Registro de mortalidad actualizado correctamente!" : "¡Registro de mortalidad guardado correctamente!");
      if (!isEdit) resetInputs();

      if (onMortalityCreated) {
        onMortalityCreated();
      }

      setTimeout(() => {
        handleOpenChange(false);
        setMensajeExito("");
      }, 1200);
    } catch (error: any) {
      console.error(`Error al ${isEdit ? "actualizar" : "registrar"} el registro de mortalidad:`, error);
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
          <span>Registrar Mortalidad</span>
        </DialogTrigger>
      )}

      <DialogContent className="bg-white sm:max-w-[425px] md:max-w-[800px] max-h-[90vh] overflow-y-auto border border-border rounded-2xl shadow-xl">
        <DialogHeader className="font-bold text-2xl text-center text-title select-none pointer-events-none">
          <DialogTitle className="text-center font-bold text-2xl text-title select-none pointer-events-none">
            {isEdit ? "Editar Mortalidad" : "Registrar Mortalidad"}
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
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title focus:outline-none focus:border-[#C5B8A5] cursor-pointer"
              >
                <option value="">Seleccione un responsable...</option>
                {responsables.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.fullName} ({r.responsibleType})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="dailyMortality"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Mortalidad del Día (Cantidad):
              </label>
              <input
                type="number"
                id="dailyMortality"
                name="dailyMortality"
                value={formData.dailyMortality}
                onChange={handleChange}
                min="1"
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                placeholder="Ej: 3"
              />
            </div>

            <div>
              <label
                htmlFor="necropsyPerformed"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                ¿Se realizó necropsia?
              </label>
              <select
                id="necropsyPerformed"
                name="necropsyPerformed"
                value={formData.necropsyPerformed}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title focus:outline-none focus:border-[#C5B8A5] cursor-pointer"
              >
                <option value="false">No</option>
                <option value="true">Sí</option>
              </select>
            </div>

            <div className="col-span-2">
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
                maxLength={100}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                placeholder="Ej: Golpe de calor, problemas respiratorios..."
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
              form="mortality-form"
              disabled={guardando}
              className="flex-1 bg-green-1-navbar text-white font-medium py-2.5 px-4 rounded-xl hover:bg-green-2-navbar shadow-md focus:outline-none focus:ring-2 focus:ring-green-1-navbar disabled:opacity-50 transition cursor-pointer"
            >
              {guardando ? (isEdit ? "Actualizando..." : "Guardando...") : (isEdit ? "Actualizar Mortalidad" : "Guardar Mortalidad")}
            </button>
          </div>
        </DialogFooter>

        <DialogDescription className="text-center text-parrafo select-none pointer-events-none">
          {isEdit ? "Modifique la información de la mortalidad registrada." : "Complete los campos para registrar la mortalidad de un lote."}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
