"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { CirclePlus } from "lucide-react";
import { API_MORTALITY_URL } from "@/api/config";

export default function FormCreateMortality() {
  const [open, setOpen] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const [lotes, setLotes] = useState<any[]>([]);
  const [responsables, setResponsables] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    mortalityDate: "",
    mortalityTime: "",
    dailyMortality: "",
    possibleCauseOfDeath: "",
    necropsyPerformed: "false",
    observations: "",
    lotId: "",
    responsibleId: "",
    active: "true",
  });

  useEffect(() => {
    const cargarDatosRelacionados = async () => {
      try {
        const [resLotes, resResp] = await Promise.all([
          fetch("http://localhost:3000/api/lots/LotAll"),
          fetch("http://localhost:3000/api/responsibles/ResponsibleAll"),
        ]);

        if (resLotes.ok) {
          const dataLotes = await resLotes.json();
          setLotes(Array.isArray(dataLotes) ? dataLotes : dataLotes.data || []);
        }

        if (resResp.ok) {
          const dataResp = await resResp.json();
          setResponsables(Array.isArray(dataResp) ? dataResp : dataResp.data || []);
        }
      } catch (error) {
        console.error("Error al cargar datos foráneos:", error);
      }
    };

    cargarDatosRelacionados();
  }, []);

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
      mortalityDate: "",
      mortalityTime: "",
      dailyMortality: "",
      possibleCauseOfDeath: "",
      necropsyPerformed: "false",
      observations: "",
      lotId: "",
      responsibleId: "",
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
      mortalityDate: formData.mortalityDate,
      mortalityTime: formData.mortalityTime,
      dailyMortality: Number(formData.dailyMortality) || 0,
      possibleCauseOfDeath: formData.possibleCauseOfDeath.trim(),
      necropsyPerformed: formData.necropsyPerformed === "true",
      observations: formData.observations.trim(),
      lotId: formData.lotId ? Number(formData.lotId) : null,
      responsibleId: formData.responsibleId ? Number(formData.responsibleId) : null,
      active: formData.active === "true",
    };

    try {
      const response = await fetch(`${API_MORTALITY_URL}/CreateMortality`, {
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
        // En caso de que la respuesta venga sin JSON
      }

      if (!response.ok) {
        throw new Error(
          resultado?.message ||
            resultado?.mensaje ||
            resultado?.error ||
            `Error ${response.status}: No se pudo registrar la mortalidad`
        );
      }

      setMensajeExito("¡Mortalidad registrada correctamente!");
      resetInputs();

      setTimeout(() => {
        setOpen(false);
        setMensajeExito("");
      }, 1800);
    } catch (error: any) {
      console.error("Error al registrar mortalidad:", error);
      setMensajeError(
        error.message || "Ocurrió un error inesperado al conectar con el servidor"
      );
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger className="inline-flex items-center text-green-1-navbar font-semibold hover:text-green-2-navbar cursor-pointer">
        <CirclePlus className="w-8 h-8 mr-2 text-green-1-navbar" />
        <span>Registrar Mortalidad</span>
      </DialogTrigger>

      <DialogContent className="bg-white sm:max-w-[425px] md:max-w-[850px] max-h-[90vh] overflow-y-auto border border-border shadow-xl">
        <DialogHeader className="font-bold text-2xl text-center text-title">
          Registrar Mortalidad
        </DialogHeader>
        <DialogDescription className="text-center text-parrafo">
          Complete los campos para registrar bajas y causas de mortalidad.
        </DialogDescription>

        {mensajeExito && (
          <div className="w-full rounded-md border border-green-600 bg-green-50 p-3 text-center text-sm font-semibold text-green-800 animate-in fade-in">
            {mensajeExito}
          </div>
        )}

        {mensajeError && (
          <div className="w-full rounded-md border border-red-500 bg-red-50 p-3 text-center text-sm font-semibold text-red-700 animate-in fade-in">
            {mensajeError}
          </div>
        )}

        <form id="mortality-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="lotId"
                className="block text-sm font-semibold text-title mb-1"
              >
                Lote de Aves:
              </label>
              <select
                id="lotId"
                name="lotId"
                value={formData.lotId}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              >
                <option value="">Seleccione un lote</option>
                {lotes.map((lote: any, index: number) => (
                  <option
                    key={lote.id || lote.Id_Lote || index}
                    value={lote.id || lote.Id_Lote}
                  >
                    Lote #{lote.id || lote.Id_Lote} - {lote.Raz_Ave_Lote || lote.breed || "Aves"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="responsibleId"
                className="block text-sm font-semibold text-title mb-1"
              >
                Responsable:
              </label>
              <select
                id="responsibleId"
                name="responsibleId"
                value={formData.responsibleId}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              >
                <option value="">Seleccione un responsable</option>
                {responsables.map((resp: any, index: number) => (
                  <option
                    key={resp.id || resp.Id_Responsable || index}
                    value={resp.id || resp.Id_Responsable}
                  >
                    {resp.name || resp.Nom_Responsable || "Responsable"} ({resp.role || resp.Tipo_Responsable || "Personal"})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="mortalityDate"
                className="block text-sm font-semibold text-title mb-1"
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
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              />
            </div>

            <div>
              <label
                htmlFor="mortalityTime"
                className="block text-sm font-semibold text-title mb-1"
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
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              />
            </div>

            <div>
              <label
                htmlFor="dailyMortality"
                className="block text-sm font-semibold text-title mb-1"
              >
                Mortalidad del día (Aves):
              </label>
              <input
                type="number"
                id="dailyMortality"
                name="dailyMortality"
                min="1"
                value={formData.dailyMortality}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Cantidad de aves muertas"
              />
            </div>

            <div>
              <label
                htmlFor="possibleCauseOfDeath"
                className="block text-sm font-semibold text-title mb-1"
              >
                Posible causa:
              </label>
              <input
                type="text"
                id="possibleCauseOfDeath"
                name="possibleCauseOfDeath"
                maxLength={100}
                value={formData.possibleCauseOfDeath}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Ej: Estrés calórico / Respiratorio"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="necropsyPerformed"
                className="block text-sm font-semibold text-title mb-1"
              >
                Necropsia realizada:
              </label>
              <select
                id="necropsyPerformed"
                name="necropsyPerformed"
                value={formData.necropsyPerformed}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              >
                <option value="false">No</option>
                <option value="true">Sí</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="observations"
                className="block text-sm font-semibold text-title mb-1"
              >
                Observaciones:
              </label>
              <textarea
                id="observations"
                name="observations"
                rows={3}
                value={formData.observations}
                onChange={handleChange}
                placeholder="Detalles u observaciones adicionales"
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="active"
                className="block text-sm font-semibold text-title mb-1"
              >
                Estado:
              </label>
              <select
                id="active"
                name="active"
                value={formData.active}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              >
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </select>
            </div>
          </div>
        </form>

        <DialogFooter className="mt-4">
          <button
            type="submit"
            form="mortality-form"
            disabled={guardando}
            className="w-full bg-green-1-navbar text-white font-medium py-2 px-4 rounded-md hover:bg-green-2-navbar shadow-md focus:outline-none focus:ring-2 focus:ring-green-1-navbar disabled:opacity-50 transition"
          >
            {guardando ? "Guardando..." : "Guardar Registro"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}