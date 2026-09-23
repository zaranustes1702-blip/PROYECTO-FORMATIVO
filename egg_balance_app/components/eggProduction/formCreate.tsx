"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { CirclePlus } from "lucide-react";
import { API_EGG_PRODUCTION_URL } from "@/api/config";

export default function FormCreateEggProduction() {
  const [open, setOpen] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const [formData, setFormData] = useState({
    productionDate: "",
    barnId: "",
    responsible: "",
    collectedAM: "",
    collectedPM: "",
    jumboEggs: "",
    aaaEggs: "",
    aaEggs: "",
    aEggs: "",
    bEggs: "",
    cEggs: "",
    brokenEggs: "",
    observations: "",
    active: "true",
  });

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
      productionDate: "",
      barnId: "",
      responsible: "",
      collectedAM: "",
      collectedPM: "",
      jumboEggs: "",
      aaaEggs: "",
      aaEggs: "",
      aEggs: "",
      bEggs: "",
      cEggs: "",
      brokenEggs: "",
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

    const colAM = Number(formData.collectedAM) || 0;
    const colPM = Number(formData.collectedPM) || 0;
    const totalDay = colAM + colPM;

    const jEggs = Number(formData.jumboEggs) || 0;
    const aaa = Number(formData.aaaEggs) || 0;
    const aa = Number(formData.aaEggs) || 0;
    const a = Number(formData.aEggs) || 0;
    const b = Number(formData.bEggs) || 0;
    const c = Number(formData.cEggs) || 0;
    const goodEggs = jEggs + aaa + aa + a + b + c;

    const datosEnviar = {
      productionDate: formData.productionDate,
      barnId: Number(formData.barnId) || 0,
      responsible: formData.responsible.trim(),
      collectedAM: colAM,
      collectedPM: colPM,
      jumboEggs: jEggs,
      aaaEggs: aaa,
      aaEggs: aa,
      aEggs: a,
      bEggs: b,
      cEggs: c,
      brokenEggs: Number(formData.brokenEggs) || 0,
      totalDay,
      goodEggs,
      weeklyEggTotal: totalDay,
      productionPercentage: 0,
      observations: formData.observations.trim(),
      active: formData.active === "true",
    };

    try {
      const response = await fetch(
        `${API_EGG_PRODUCTION_URL}/CreateEggProduction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datosEnviar),
        }
      );

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
            `Error ${response.status}: No se pudo registrar la producción`
        );
      }

      setMensajeExito("¡Producción registrada correctamente!");
      resetInputs();

      setTimeout(() => {
        setOpen(false);
        setMensajeExito("");
      }, 1800);
    } catch (error: any) {
      console.error("Error al registrar producción:", error);
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
        <span>Registrar Producción</span>
      </DialogTrigger>

      <DialogContent className="bg-white sm:max-w-[500px] md:max-w-[850px] max-h-[90vh] overflow-y-auto border border-border shadow-xl">
        <DialogHeader className="font-bold text-2xl text-center text-title">
          Registrar Producción de Huevos
        </DialogHeader>
        <DialogDescription className="text-center text-parrafo">
          Complete los campos para registrar la recolección y clasificación diaria.
        </DialogDescription>

        {/* Notificación de éxito destacada */}
        {mensajeExito && (
          <div className="w-full rounded-md border border-green-600 bg-green-50 p-3 text-center text-sm font-semibold text-green-800 animate-in fade-in">
            {mensajeExito}
          </div>
        )}

        {/* Notificación de error si falla la API */}
        {mensajeError && (
          <div className="w-full rounded-md border border-red-500 bg-red-50 p-3 text-center text-sm font-semibold text-red-700 animate-in fade-in">
            {mensajeError}
          </div>
        )}

        <form id="egg-production-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="productionDate"
                className="block text-sm font-semibold text-title mb-1"
              >
                Fecha de Producción:
              </label>
              <input
                type="date"
                id="productionDate"
                name="productionDate"
                value={formData.productionDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              />
            </div>

            <div>
              <label
                htmlFor="barnId"
                className="block text-sm font-semibold text-title mb-1"
              >
                ID del Galpón:
              </label>
              <input
                type="number"
                id="barnId"
                name="barnId"
                min="1"
                value={formData.barnId}
                onChange={handleChange}
                placeholder="Ej: 1"
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="responsible"
                className="block text-sm font-semibold text-title mb-1"
              >
                Responsable:
              </label>
              <input
                type="text"
                id="responsible"
                name="responsible"
                maxLength={100}
                value={formData.responsible}
                onChange={handleChange}
                placeholder="Nombre del responsable"
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              />
            </div>

            <div>
              <label
                htmlFor="collectedAM"
                className="block text-sm font-semibold text-title mb-1"
              >
                Recolectados AM:
              </label>
              <input
                type="number"
                id="collectedAM"
                name="collectedAM"
                min="0"
                value={formData.collectedAM}
                onChange={handleChange}
                placeholder="0"
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              />
            </div>

            <div>
              <label
                htmlFor="collectedPM"
                className="block text-sm font-semibold text-title mb-1"
              >
                Recolectados PM:
              </label>
              <input
                type="number"
                id="collectedPM"
                name="collectedPM"
                min="0"
                value={formData.collectedPM}
                onChange={handleChange}
                placeholder="0"
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              />
            </div>

            <div>
              <label
                htmlFor="jumboEggs"
                className="block text-sm font-semibold text-title mb-1"
              >
                Huevos Jumbo:
              </label>
              <input
                type="number"
                id="jumboEggs"
                name="jumboEggs"
                min="0"
                value={formData.jumboEggs}
                onChange={handleChange}
                placeholder="0"
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              />
            </div>

            <div>
              <label
                htmlFor="aaaEggs"
                className="block text-sm font-semibold text-title mb-1"
              >
                Huevos AAA:
              </label>
              <input
                type="number"
                id="aaaEggs"
                name="aaaEggs"
                min="0"
                value={formData.aaaEggs}
                onChange={handleChange}
                placeholder="0"
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              />
            </div>

            <div>
              <label
                htmlFor="aaEggs"
                className="block text-sm font-semibold text-title mb-1"
              >
                Huevos AA:
              </label>
              <input
                type="number"
                id="aaEggs"
                name="aaEggs"
                min="0"
                value={formData.aaEggs}
                onChange={handleChange}
                placeholder="0"
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              />
            </div>

            <div>
              <label
                htmlFor="aEggs"
                className="block text-sm font-semibold text-title mb-1"
              >
                Huevos A:
              </label>
              <input
                type="number"
                id="aEggs"
                name="aEggs"
                min="0"
                value={formData.aEggs}
                onChange={handleChange}
                placeholder="0"
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              />
            </div>

            <div>
              <label
                htmlFor="bEggs"
                className="block text-sm font-semibold text-title mb-1"
              >
                Huevos B:
              </label>
              <input
                type="number"
                id="bEggs"
                name="bEggs"
                min="0"
                value={formData.bEggs}
                onChange={handleChange}
                placeholder="0"
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              />
            </div>

            <div>
              <label
                htmlFor="cEggs"
                className="block text-sm font-semibold text-title mb-1"
              >
                Huevos C:
              </label>
              <input
                type="number"
                id="cEggs"
                name="cEggs"
                min="0"
                value={formData.cEggs}
                onChange={handleChange}
                placeholder="0"
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="brokenEggs"
                className="block text-sm font-semibold text-title mb-1"
              >
                Huevos Rotos:
              </label>
              <input
                type="number"
                id="brokenEggs"
                name="brokenEggs"
                min="0"
                value={formData.brokenEggs}
                onChange={handleChange}
                placeholder="0"
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              />
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
                maxLength={255}
                value={formData.observations}
                onChange={handleChange}
                placeholder="Notas o detalles adicionales"
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
            form="egg-production-form"
            disabled={guardando}
            className="w-full bg-green-1-navbar text-white font-medium py-2 px-4 rounded-md hover:bg-green-2-navbar shadow-md focus:outline-none focus:ring-2 focus:ring-green-1-navbar disabled:opacity-50 transition"
          >
            {guardando ? "Guardando..." : "Guardar Producción"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}