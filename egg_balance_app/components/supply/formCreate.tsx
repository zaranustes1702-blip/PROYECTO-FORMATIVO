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
import { API_SUPPLY_URL } from "@/api/config";

export default function FormCreateSupply() {
  const [open, setOpen] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const [formData, setFormData] = useState({
    id: "",
    supplyType: "",
    entryDate: "",
    supplyName: "",
    unitMeasure: "",
    quantity: "",
    unitValue: "",
    totalValue: "",
    reference: "",
    expirationDate: "",
    balance: "",
    weight: "",
    observations: "",
    active: "true",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const actualizados = { ...prev, [name]: value };

      // Cálculo automático de totalValue si cambian cantidad o valor unitario
      if (name === "quantity" || name === "unitValue") {
        const cant = name === "quantity" ? Number(value) : Number(prev.quantity);
        const val = name === "unitValue" ? Number(value) : Number(prev.unitValue);
        if (!isNaN(cant) && !isNaN(val) && cant >= 0 && val >= 0) {
          actualizados.totalValue = (cant * val).toFixed(2);
        }
      }

      return actualizados;
    });
  };

  const resetInputs = () => {
    setFormData({
      id: "",
      supplyType: "",
      entryDate: "",
      supplyName: "",
      unitMeasure: "",
      quantity: "",
      unitValue: "",
      totalValue: "",
      reference: "",
      expirationDate: "",
      balance: "",
      weight: "",
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
      id: formData.id.trim(),
      supplyType: formData.supplyType.trim(),
      entryDate: formData.entryDate,
      supplyName: formData.supplyName.trim(),
      unitMeasure: formData.unitMeasure.trim(),
      quantity: Number(formData.quantity) || 0,
      unitValue: Number(formData.unitValue) || 0,
      totalValue: Number(formData.totalValue) || 0,
      reference: formData.reference.trim(),
      expirationDate: formData.expirationDate || null,
      balance: Number(formData.balance) || 0,
      weight: formData.weight ? Number(formData.weight) : null,
      observations: formData.observations.trim(),
      active: formData.active === "true",
    };

    try {
      const response = await fetch(`${API_SUPPLY_URL}/CreateSupply`, {
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
        // En caso de no recibir JSON
      }

      if (!response.ok) {
        throw new Error(
          resultado?.message ||
            resultado?.mensaje ||
            resultado?.error ||
            `Error ${response.status}: No se pudo registrar el suministro`
        );
      }

      setMensajeExito("¡Suministro registrado correctamente!");
      resetInputs();

      setTimeout(() => {
        setOpen(false);
        setMensajeExito("");
      }, 1800);
    } catch (error: any) {
      console.error("Error al registrar suministro:", error);
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
        <span>Registrar Suministro</span>
      </DialogTrigger>

      <DialogContent className="bg-white sm:max-w-[425px] md:max-w-[850px] max-h-[90vh] overflow-y-auto border border-border shadow-xl">
        <DialogHeader className="font-bold text-2xl text-center text-title">
          Registrar Suministro
        </DialogHeader>
        <DialogDescription className="text-center text-parrafo">
          Complete los campos para registrar un nuevo insumo en el inventario.
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

        <form id="supply-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="id"
                className="block text-sm font-semibold text-title mb-1"
              >
                Código / Identificador:
              </label>
              <input
                type="text"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Código único del insumo"
              />
            </div>

            <div>
              <label
                htmlFor="supplyType"
                className="block text-sm font-semibold text-title mb-1"
              >
                Tipo de Suministro:
              </label>
              <input
                type="text"
                id="supplyType"
                name="supplyType"
                value={formData.supplyType}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Ej: Alimento, Medicamento, Vacuna"
              />
            </div>

            <div>
              <label
                htmlFor="entryDate"
                className="block text-sm font-semibold text-title mb-1"
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
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              />
            </div>

            <div>
              <label
                htmlFor="supplyName"
                className="block text-sm font-semibold text-title mb-1"
              >
                Nombre del Suministro:
              </label>
              <input
                type="text"
                id="supplyName"
                name="supplyName"
                value={formData.supplyName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Nombre del producto o insumo"
              />
            </div>

            <div>
              <label
                htmlFor="unitMeasure"
                className="block text-sm font-semibold text-title mb-1"
              >
                Unidad de Medida:
              </label>
              <input
                type="text"
                id="unitMeasure"
                name="unitMeasure"
                value={formData.unitMeasure}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Ej: kg, bulto, litro, dosis"
              />
            </div>

            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-semibold text-title mb-1"
              >
                Cantidad:
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="0"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Cantidad ingresada"
              />
            </div>

            <div>
              <label
                htmlFor="unitValue"
                className="block text-sm font-semibold text-title mb-1"
              >
                Valor Unitario ($):
              </label>
              <input
                type="number"
                id="unitValue"
                name="unitValue"
                min="0"
                step="0.01"
                value={formData.unitValue}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Precio unitario"
              />
            </div>

            <div>
              <label
                htmlFor="totalValue"
                className="block text-sm font-semibold text-title mb-1"
              >
                Valor Total ($):
              </label>
              <input
                type="number"
                id="totalValue"
                name="totalValue"
                min="0"
                step="0.01"
                value={formData.totalValue}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Costo total acumulado"
              />
            </div>

            <div>
              <label
                htmlFor="reference"
                className="block text-sm font-semibold text-title mb-1"
              >
                Referencia / Factura:
              </label>
              <input
                type="text"
                id="reference"
                name="reference"
                value={formData.reference}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="N° factura o lote proveedor"
              />
            </div>

            <div>
              <label
                htmlFor="expirationDate"
                className="block text-sm font-semibold text-title mb-1"
              >
                Fecha de Vencimiento (Opcional):
              </label>
              <input
                type="date"
                id="expirationDate"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
              />
            </div>

            <div>
              <label
                htmlFor="balance"
                className="block text-sm font-semibold text-title mb-1"
              >
                Saldo / Stock Restante:
              </label>
              <input
                type="number"
                id="balance"
                name="balance"
                min="0"
                value={formData.balance}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Saldo disponible"
              />
            </div>

            <div>
              <label
                htmlFor="weight"
                className="block text-sm font-semibold text-title mb-1"
              >
                Peso en kg (Opcional):
              </label>
              <input
                type="number"
                id="weight"
                name="weight"
                min="0"
                step="0.01"
                value={formData.weight}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white border border-border rounded-md text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Peso total en kg"
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
                placeholder="Detalles sobre el empaque, lote o entrega"
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
            form="supply-form"
            disabled={guardando}
            className="w-full bg-green-1-navbar text-white font-medium py-2 px-4 rounded-md hover:bg-green-2-navbar shadow-md focus:outline-none focus:ring-2 focus:ring-green-1-navbar disabled:opacity-50 transition"
          >
            {guardando ? "Guardando..." : "Guardar Suministro"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}