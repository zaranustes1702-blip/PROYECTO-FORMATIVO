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
  API_EGG_PRODUCTION_CREATE_URL,
  API_BIRD_BATCH_ALL_URL,
  API_RESPONSIBLE_ALL_URL,
} from "@/api/config";

interface FormCreateEggProductionProps {
  onEggProductionCreated?: () => void;
}

export default function FormCreateEggProduction({ onEggProductionCreated }: FormCreateEggProductionProps) {
  const [open, setOpen] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  // Listas para los select
  const [lotes, setLotes] = useState<any[]>([]);
  const [responsables, setResponsables] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    id_lote: "",
    id_responsibleAm: "",
    id_responsiblePm: "",
    date: "",
    hourAm: "",
    hourPm: "",
    shift: "",
    jumboEggsAm: "0",
    aaaEggsAm: "0",
    aaEggsAm: "0",
    aEggsAm: "0",
    bEggsAm: "0",
    cEggsAm: "0",
    brokenEggsAm: "0",
    jumboEggsPm: "0",
    aaaEggsPm: "0",
    aaEggsPm: "0",
    aEggsPm: "0",
    bEggsPm: "0",
    cEggsPm: "0",
    brokenEggsPm: "0",
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

  // Totales: se calculan con las cantidades de cada tipo (el servidor los vuelve a calcular)
  const n = (campo: string) => Number((formData as any)[campo]) || 0;

  const goodEggsAm =
    n("jumboEggsAm") + n("aaaEggsAm") + n("aaEggsAm") + n("aEggsAm") + n("bEggsAm") + n("cEggsAm");
  const goodEggsPm =
    n("jumboEggsPm") + n("aaaEggsPm") + n("aaEggsPm") + n("aEggsPm") + n("bEggsPm") + n("cEggsPm");

  const totalAm = goodEggsAm + n("brokenEggsAm");
  const totalPm = goodEggsPm + n("brokenEggsPm");
  const brokenEggs = n("brokenEggsAm") + n("brokenEggsPm");
  const goodEggs = goodEggsAm + goodEggsPm;
  const totalDay = totalAm + totalPm;

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
      id_responsibleAm: "",
      id_responsiblePm: "",
      date: "",
      hourAm: "",
      hourPm: "",
      shift: "",
      jumboEggsAm: "0",
      aaaEggsAm: "0",
      aaEggsAm: "0",
      aEggsAm: "0",
      bEggsAm: "0",
      cEggsAm: "0",
      brokenEggsAm: "0",
      jumboEggsPm: "0",
      aaaEggsPm: "0",
      aaEggsPm: "0",
      aEggsPm: "0",
      bEggsPm: "0",
      cEggsPm: "0",
      brokenEggsPm: "0",
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
      id_responsibleAm: Number(formData.id_responsibleAm),
      id_responsiblePm: Number(formData.id_responsiblePm),
      date: formData.date,
      hourAm: formData.hourAm,
      hourPm: formData.hourPm,
      shift: formData.shift,
      jumboEggsAm: Number(formData.jumboEggsAm),
      aaaEggsAm: Number(formData.aaaEggsAm),
      aaEggsAm: Number(formData.aaEggsAm),
      aEggsAm: Number(formData.aEggsAm),
      bEggsAm: Number(formData.bEggsAm),
      cEggsAm: Number(formData.cEggsAm),
      brokenEggsAm: Number(formData.brokenEggsAm),
      jumboEggsPm: Number(formData.jumboEggsPm),
      aaaEggsPm: Number(formData.aaaEggsPm),
      aaEggsPm: Number(formData.aaEggsPm),
      aEggsPm: Number(formData.aEggsPm),
      bEggsPm: Number(formData.bEggsPm),
      cEggsPm: Number(formData.cEggsPm),
      brokenEggsPm: Number(formData.brokenEggsPm),
      observations: formData.observations.trim(),
      active: formData.active === "true",
    };

    try {
      const response = await fetch(API_EGG_PRODUCTION_CREATE_URL, {
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
            `Error ${response.status}: No se pudo registrar la producción de huevos`
        );
      }

      setMensajeExito("¡Producción de huevos guardada correctamente!");
      resetInputs();

      // Avisa a la página para que la tabla se recargue de inmediato
      if (onEggProductionCreated) {
        onEggProductionCreated();
      }

      setTimeout(() => {
        setOpen(false);
        setMensajeExito("");
      }, 1500);
    } catch (error: any) {
      console.error("Error al registrar la producción de huevos:", error);
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
        <span>Registrar Producción</span>
      </DialogTrigger>

      <DialogContent className="bg-white sm:max-w-[425px] md:max-w-[800px] max-h-[90vh] overflow-y-auto border border-border rounded-2xl shadow-xl">
        <DialogHeader className="font-bold text-2xl text-center text-title select-none pointer-events-none">
          <DialogTitle className="text-center font-bold text-2xl text-title select-none pointer-events-none">
            Registrar Producción de Huevos
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

        <form id="egg-production-form" onSubmit={handleSubmit} className="space-y-4">
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
                htmlFor="shift"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Jornada:
              </label>
              <select
                id="shift"
                name="shift"
                value={formData.shift}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title focus:outline-none focus:border-[#C5B8A5]"
              >
                <option value="">Seleccione una jornada</option>
                <option value="Mañana">Mañana</option>
                <option value="Tarde">Tarde</option>
                <option value="Noche">Noche</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="date"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Fecha:
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
              />
            </div>

            <p className="col-span-2 text-base font-bold text-title select-none pointer-events-none">
              Recolección de la mañana (AM)
            </p>

            <div>
              <label
                htmlFor="id_responsibleAm"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Responsable AM:
              </label>
              <select
                id="id_responsibleAm"
                name="id_responsibleAm"
                value={formData.id_responsibleAm}
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
                htmlFor="hourAm"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Hora AM:
              </label>
              <input
                type="time"
                id="hourAm"
                name="hourAm"
                value={formData.hourAm}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
              />
            </div>

            <div className="col-span-2 grid grid-cols-4 md:grid-cols-7 gap-3">
              <div>
                <label
                  htmlFor="jumboEggsAm"
                  className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
                >
                  Jumbo:
                </label>
                <input
                  type="number"
                  id="jumboEggsAm"
                  name="jumboEggsAm"
                  value={formData.jumboEggsAm}
                  onChange={handleChange}
                  min="0"
                  required
                  className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                />
              </div>
              <div>
                <label
                  htmlFor="aaaEggsAm"
                  className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
                >
                  AAA:
                </label>
                <input
                  type="number"
                  id="aaaEggsAm"
                  name="aaaEggsAm"
                  value={formData.aaaEggsAm}
                  onChange={handleChange}
                  min="0"
                  required
                  className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                />
              </div>
              <div>
                <label
                  htmlFor="aaEggsAm"
                  className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
                >
                  AA:
                </label>
                <input
                  type="number"
                  id="aaEggsAm"
                  name="aaEggsAm"
                  value={formData.aaEggsAm}
                  onChange={handleChange}
                  min="0"
                  required
                  className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                />
              </div>
              <div>
                <label
                  htmlFor="aEggsAm"
                  className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
                >
                  A:
                </label>
                <input
                  type="number"
                  id="aEggsAm"
                  name="aEggsAm"
                  value={formData.aEggsAm}
                  onChange={handleChange}
                  min="0"
                  required
                  className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                />
              </div>
              <div>
                <label
                  htmlFor="bEggsAm"
                  className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
                >
                  B:
                </label>
                <input
                  type="number"
                  id="bEggsAm"
                  name="bEggsAm"
                  value={formData.bEggsAm}
                  onChange={handleChange}
                  min="0"
                  required
                  className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                />
              </div>
              <div>
                <label
                  htmlFor="cEggsAm"
                  className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
                >
                  C:
                </label>
                <input
                  type="number"
                  id="cEggsAm"
                  name="cEggsAm"
                  value={formData.cEggsAm}
                  onChange={handleChange}
                  min="0"
                  required
                  className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                />
              </div>
              <div>
                <label
                  htmlFor="brokenEggsAm"
                  className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
                >
                  Rotos:
                </label>
                <input
                  type="number"
                  id="brokenEggsAm"
                  name="brokenEggsAm"
                  value={formData.brokenEggsAm}
                  onChange={handleChange}
                  min="0"
                  required
                  className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                />
              </div>
            </div>

            <p className="col-span-2 text-base font-bold text-title select-none pointer-events-none">
              Recolección de la tarde (PM)
            </p>

            <div>
              <label
                htmlFor="id_responsiblePm"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Responsable PM:
              </label>
              <select
                id="id_responsiblePm"
                name="id_responsiblePm"
                value={formData.id_responsiblePm}
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
                htmlFor="hourPm"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Hora PM:
              </label>
              <input
                type="time"
                id="hourPm"
                name="hourPm"
                value={formData.hourPm}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
              />
            </div>

            <div className="col-span-2 grid grid-cols-4 md:grid-cols-7 gap-3">
              <div>
                <label
                  htmlFor="jumboEggsPm"
                  className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
                >
                  Jumbo:
                </label>
                <input
                  type="number"
                  id="jumboEggsPm"
                  name="jumboEggsPm"
                  value={formData.jumboEggsPm}
                  onChange={handleChange}
                  min="0"
                  required
                  className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                />
              </div>
              <div>
                <label
                  htmlFor="aaaEggsPm"
                  className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
                >
                  AAA:
                </label>
                <input
                  type="number"
                  id="aaaEggsPm"
                  name="aaaEggsPm"
                  value={formData.aaaEggsPm}
                  onChange={handleChange}
                  min="0"
                  required
                  className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                />
              </div>
              <div>
                <label
                  htmlFor="aaEggsPm"
                  className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
                >
                  AA:
                </label>
                <input
                  type="number"
                  id="aaEggsPm"
                  name="aaEggsPm"
                  value={formData.aaEggsPm}
                  onChange={handleChange}
                  min="0"
                  required
                  className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                />
              </div>
              <div>
                <label
                  htmlFor="aEggsPm"
                  className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
                >
                  A:
                </label>
                <input
                  type="number"
                  id="aEggsPm"
                  name="aEggsPm"
                  value={formData.aEggsPm}
                  onChange={handleChange}
                  min="0"
                  required
                  className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                />
              </div>
              <div>
                <label
                  htmlFor="bEggsPm"
                  className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
                >
                  B:
                </label>
                <input
                  type="number"
                  id="bEggsPm"
                  name="bEggsPm"
                  value={formData.bEggsPm}
                  onChange={handleChange}
                  min="0"
                  required
                  className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                />
              </div>
              <div>
                <label
                  htmlFor="cEggsPm"
                  className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
                >
                  C:
                </label>
                <input
                  type="number"
                  id="cEggsPm"
                  name="cEggsPm"
                  value={formData.cEggsPm}
                  onChange={handleChange}
                  min="0"
                  required
                  className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                />
              </div>
              <div>
                <label
                  htmlFor="brokenEggsPm"
                  className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
                >
                  Rotos:
                </label>
                <input
                  type="number"
                  id="brokenEggsPm"
                  name="brokenEggsPm"
                  value={formData.brokenEggsPm}
                  onChange={handleChange}
                  min="0"
                  required
                  className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                />
              </div>
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

            <div className="col-span-2 rounded-xl border border-[#E8DFD1] bg-[#FCFBF9] p-4 select-none pointer-events-none">
              <p className="text-sm font-bold text-title mb-2">Totales (se calculan solos)</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-parrafo">
                <p>Total AM: <span className="font-semibold">{totalAm}</span></p>
                <p>Total PM: <span className="font-semibold">{totalPm}</span></p>
                <p>Huevos rotos: <span className="font-semibold">{brokenEggs}</span></p>
                <p>Huevos buenos: <span className="font-semibold">{goodEggs}</span></p>
                <p>Total del día: <span className="font-semibold">{totalDay}</span></p>
              </div>
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
              form="egg-production-form"
              disabled={guardando}
              className="flex-1 bg-green-1-navbar text-white font-medium py-2.5 px-4 rounded-xl hover:bg-green-2-navbar shadow-md focus:outline-none focus:ring-2 focus:ring-green-1-navbar disabled:opacity-50 transition"
            >
              {guardando ? "Guardando..." : "Guardar Producción"}
            </button>
          </div>
        </DialogFooter>

        <DialogDescription className="text-center text-parrafo select-none pointer-events-none">
          Escriba las cantidades de cada tipo de huevo de la mañana y de la tarde; los totales se calculan solos.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
