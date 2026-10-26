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
  API_STOCK_ENTRY_CREATE_URL,
  API_STOCK_ENTRY_UPDATE_URL,
  API_SUPPLY_ALL_URL,
  API_BARN_ALL_URL,
} from "@/api/config";

interface FormCreateStockEntryProps {
  onStockEntryCreated?: () => void;
  initialData?: any;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function FormCreateStockEntry({
  onStockEntryCreated,
  initialData,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: FormCreateStockEntryProps) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isControlled ? controlledOpen : internalOpen;
  const isEdit = Boolean(initialData);

  const [guardando, setGuardando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const [insumos, setInsumos] = useState<any[]>([]);
  const [galpones, setGalpones] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    id_supply: "",
    id_barn: "",
    cantidad_inicial: "",
    unid_entrada: "",
    vencimiento: "",
    precio_unitario: "",
    active: "true",
  });

  useEffect(() => {
    if (!open) return;

    const cargarListas = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers: any = token ? { Authorization: `Bearer ${token}` } : {};

        const resInsumos = await fetch(`${API_SUPPLY_ALL_URL}?limit=500`, { headers });
        const dataInsumos = await resInsumos.json();
        const listaInsumos = dataInsumos.info || [];
        setInsumos(listaInsumos);

        const resGalpones = await fetch(`${API_BARN_ALL_URL}?limit=500`, { headers });
        const dataGalpones = await resGalpones.json();
        const listaGalpones = dataGalpones.info || [];
        setGalpones(listaGalpones);
      } catch (error) {
        console.error("Error al cargar insumos o galpones:", error);
        setMensajeError("No se pudieron cargar los insumos o galpones.");
      }
    };

    cargarListas();
  }, [open]);

  useEffect(() => {
    if (initialData && open) {
      const cleanDate = (d?: string | null) => (d ? d.split("T")[0] : "");
      setFormData({
        id_supply: String(initialData.id_supply ?? ""),
        id_barn: String(initialData.id_barn ?? ""),
        cantidad_inicial: String(initialData.cantidad_inicial ?? ""),
        unid_entrada: initialData.unid_entrada || "",
        vencimiento: cleanDate(initialData.vencimiento),
        precio_unitario: String(initialData.precio_unitario ?? ""),
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

  const precioTotal =
    (Number(formData.cantidad_inicial) || 0) *
    (Number(formData.precio_unitario) || 0);

  const insumoElegido = insumos.find((i) => i.id_supply === formData.id_supply);

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
      id_supply: "",
      id_barn: "",
      cantidad_inicial: "",
      unid_entrada: "",
      vencimiento: "",
      precio_unitario: "",
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
      id_supply: formData.id_supply,
      id_barn: Number(formData.id_barn),
      cantidad_inicial: Number(formData.cantidad_inicial),
      unid_entrada: formData.unid_entrada,
      vencimiento: formData.vencimiento,
      precio_unitario: Number(formData.precio_unitario),
      precio_total: precioTotal,
      active: formData.active === "true",
    };

    try {
      const token = localStorage.getItem("token");
      const url = isEdit
        ? API_STOCK_ENTRY_UPDATE_URL(initialData.id_stockEntry)
        : API_STOCK_ENTRY_CREATE_URL;
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
            `Error ${response.status}: No se pudo ${isEdit ? "actualizar" : "registrar"} la entrada`
        );
      }

      setMensajeExito(isEdit ? "¡Entrada actualizada correctamente!" : "¡Entrada registrada correctamente!");
      if (!isEdit) resetInputs();

      if (onStockEntryCreated) {
        onStockEntryCreated();
      }

      setTimeout(() => {
        handleOpenChange(false);
        setMensajeExito("");
      }, 1200);
    } catch (error: any) {
      console.error(`Error al ${isEdit ? "actualizar" : "registrar"} entrada:`, error);
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
          <span>Registrar Entrada</span>
        </DialogTrigger>
      )}

      <DialogContent className="bg-white sm:max-w-[425px] md:max-w-[800px] max-h-[90vh] overflow-y-auto border border-border rounded-2xl shadow-xl">
        <DialogHeader className="font-bold text-2xl text-center text-title select-none pointer-events-none">
          <DialogTitle className="text-center font-bold text-2xl text-title select-none pointer-events-none">
            {isEdit ? "Editar Entrada de Insumo" : "Registrar Entrada de Insumo"}
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

        <form id="stock-entry-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="id_supply"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Insumo:
              </label>
              <select
                id="id_supply"
                name="id_supply"
                value={formData.id_supply}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title focus:outline-none focus:border-[#C5B8A5] cursor-pointer"
              >
                <option value="">Seleccione un insumo...</option>
                {insumos.map((i) => (
                  <option key={i.id_supply} value={i.id_supply}>
                    {i.supplyName} ({i.supplyType === "alimentacion" ? "Alimento" : "Medicamento"})
                  </option>
                ))}
              </select>
              {insumoElegido && (
                <p className="mt-1 text-xs text-parrafo select-none pointer-events-none">
                  Ref: {insumoElegido.reference} · Tipo: {insumoElegido.supplyType}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="id_barn"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Galpón:
              </label>
              <select
                id="id_barn"
                name="id_barn"
                value={formData.id_barn}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title focus:outline-none focus:border-[#C5B8A5] cursor-pointer"
              >
                <option value="">Seleccione un galpón...</option>
                {galpones.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.barnName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="cantidad_inicial"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Cantidad Inicial:
              </label>
              <input
                type="number"
                id="cantidad_inicial"
                name="cantidad_inicial"
                value={formData.cantidad_inicial}
                onChange={handleChange}
                min="0.01"
                step="0.01"
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                placeholder="Ej: 50"
              />
            </div>

            <div>
              <label
                htmlFor="unid_entrada"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Unidad de Medida:
              </label>
              <select
                id="unid_entrada"
                name="unid_entrada"
                value={formData.unid_entrada}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title focus:outline-none focus:border-[#C5B8A5] cursor-pointer"
              >
                <option value="">Seleccione una unidad...</option>
                <option value="Bultos">Bultos</option>
                <option value="Kilos">Kilos</option>
                <option value="Gramos">Gramos</option>
                <option value="Litros">Litros</option>
                <option value="Mililitros">Mililitros</option>
                <option value="Unidades">Unidades</option>
                <option value="Frascos">Frascos</option>
                <option value="Cajas">Cajas</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="vencimiento"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Fecha de Vencimiento:
              </label>
              <input
                type="date"
                id="vencimiento"
                name="vencimiento"
                value={formData.vencimiento}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
              />
            </div>

            <div>
              <label
                htmlFor="precio_unitario"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Precio Unitario:
              </label>
              <input
                type="number"
                id="precio_unitario"
                name="precio_unitario"
                value={formData.precio_unitario}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                placeholder="Ej: 125000"
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="precio_total"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Precio Total (automático):
              </label>
              <input
                type="text"
                id="precio_total"
                value={`$${precioTotal.toFixed(2)}`}
                readOnly
                className="w-full px-3 py-2 bg-[#FCFBF9] border border-border rounded-xl text-parrafo focus:outline-none"
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
              form="stock-entry-form"
              disabled={guardando}
              className="flex-1 bg-green-1-navbar text-white font-medium py-2.5 px-4 rounded-xl hover:bg-green-2-navbar shadow-md focus:outline-none focus:ring-2 focus:ring-green-1-navbar disabled:opacity-50 transition cursor-pointer"
            >
              {guardando ? (isEdit ? "Actualizando..." : "Guardando...") : (isEdit ? "Actualizar Entrada" : "Guardar Entrada")}
            </button>
          </div>
        </DialogFooter>

        <DialogDescription className="text-center text-parrafo select-none pointer-events-none">
          {isEdit ? "Modifique los datos del ingreso de insumo." : "Registre el ingreso de un insumo a un galpón. La cantidad de salida se llena sola con Alimentación."}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
