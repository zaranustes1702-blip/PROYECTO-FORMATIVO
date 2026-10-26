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
  API_FEEDING_CREATE_URL,
  API_FEEDING_UPDATE_URL,
  API_SUPPLY_ALL_URL,
  API_STOCK_ENTRY_ALL_URL,
  API_RESPONSIBLE_ALL_URL,
} from "@/api/config";

interface FormCreateFeedingProps {
  onFeedingCreated?: () => void;
  initialData?: any;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function FormCreateFeeding({
  onFeedingCreated,
  initialData,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: FormCreateFeedingProps) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isControlled ? controlledOpen : internalOpen;
  const isEdit = Boolean(initialData);

  const [guardando, setGuardando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const [insumos, setInsumos] = useState<any[]>([]);
  const [entradas, setEntradas] = useState<any[]>([]);
  const [responsables, setResponsables] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    id_supply: "",
    id_stockEntry: "",
    id_responsable: "",
    shift: "",
    feedingDate: "",
    feedingTime: "",
    quantity: "",
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
        setInsumos(
          listaInsumos.filter(
            (i: any) => i.supplyType === "alimentacion"
          )
        );

        const resEntradas = await fetch(`${API_STOCK_ENTRY_ALL_URL}?limit=500`, { headers });
        const dataEntradas = await resEntradas.json();
        setEntradas(dataEntradas.info || []);

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
        id_supply: String(initialData.id_supply ?? ""),
        id_stockEntry: String(initialData.id_stockEntry ?? ""),
        id_responsable: String(initialData.id_responsable ?? ""),
        shift: initialData.shift || "",
        feedingDate: cleanDate(initialData.feedingDate),
        feedingTime: cleanTime(initialData.feedingTime),
        quantity: String(initialData.quantity ?? ""),
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

  const entradasFiltradas = formData.id_supply
    ? entradas.filter((e) => e.id_supply === formData.id_supply)
    : entradas;

  const entradaElegida = entradas.find(
    (e) => String(e.id_stockEntry) === String(formData.id_stockEntry)
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const actualizados = { ...prev, [name]: value };
      if (name === "id_supply") {
        actualizados.id_stockEntry = "";
      }
      return actualizados;
    });
  };

  const resetInputs = () => {
    setFormData({
      id_supply: "",
      id_stockEntry: "",
      id_responsable: "",
      shift: "",
      feedingDate: "",
      feedingTime: "",
      quantity: "",
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
      id_stockEntry: Number(formData.id_stockEntry),
      id_responsable: Number(formData.id_responsable),
      shift: formData.shift,
      feedingDate: formData.feedingDate,
      feedingTime: formData.feedingTime,
      quantity: Number(formData.quantity),
      active: formData.active === "true",
    };

    try {
      const token = localStorage.getItem("token");
      const url = isEdit
        ? API_FEEDING_UPDATE_URL(initialData.id_feeding)
        : API_FEEDING_CREATE_URL;
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
            `Error ${response.status}: No se pudo ${isEdit ? "actualizar" : "registrar"} la alimentación`
        );
      }

      setMensajeExito(isEdit ? "¡Alimentación actualizada correctamente!" : "¡Alimentación registrada correctamente!");
      if (!isEdit) resetInputs();

      if (onFeedingCreated) {
        onFeedingCreated();
      }

      setTimeout(() => {
        handleOpenChange(false);
        setMensajeExito("");
      }, 1200);
    } catch (error: any) {
      console.error(`Error al ${isEdit ? "actualizar" : "registrar"} la alimentación:`, error);
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
          <span>Registrar Alimentación</span>
        </DialogTrigger>
      )}

      <DialogContent className="bg-white sm:max-w-[425px] md:max-w-[800px] border border-border rounded-2xl shadow-xl">
        <DialogHeader className="font-bold text-2xl text-center text-title select-none pointer-events-none">
          <DialogTitle className="text-center font-bold text-2xl text-title select-none pointer-events-none">
            {isEdit ? "Editar Alimentación" : "Registrar Alimentación"}
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

        <form id="feeding-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="feedingDate"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Fecha:
              </label>
              <input
                type="date"
                id="feedingDate"
                name="feedingDate"
                value={formData.feedingDate}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
              />
            </div>

            <div>
              <label
                htmlFor="feedingTime"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Hora:
              </label>
              <input
                type="time"
                id="feedingTime"
                name="feedingTime"
                value={formData.feedingTime}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
              />
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
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title focus:outline-none focus:border-[#C5B8A5] cursor-pointer"
              >
                <option value="">Seleccione una jornada...</option>
                <option value="Mañana">Mañana</option>
                <option value="Tarde">Tarde</option>
                <option value="Noche">Noche</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="id_supply"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Insumo (Alimento):
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
                    {i.supplyName} ({i.reference})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="id_stockEntry"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Entrada de Stock:
              </label>
              <select
                id="id_stockEntry"
                name="id_stockEntry"
                value={formData.id_stockEntry}
                onChange={handleChange}
                required
                disabled={!formData.id_supply}
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title focus:outline-none focus:border-[#C5B8A5] disabled:bg-gray-100 disabled:text-gray-400 cursor-pointer"
              >
                <option value="">
                  {formData.id_supply
                    ? "Seleccione la entrada..."
                    : "Elija primero el insumo..."}
                </option>
                {entradasFiltradas.map((e) => (
                  <option key={e.id_stockEntry} value={e.id_stockEntry}>
                    {`#${e.id_stockEntry} · Galpón: ${e.barn?.barnName ?? e.id_barn} · Disp: ${e.disponible_entrada} ${e.unid_entrada}`}
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

            <div className="col-span-2">
              <label
                htmlFor="quantity"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Cantidad{entradaElegida ? ` (${entradaElegida.unid_entrada})` : ""}:
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="0.01"
                step="0.01"
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:border-[#C5B8A5]"
                placeholder="Ej: 25"
              />
              <p className="mt-1 text-xs text-parrafo select-none pointer-events-none">
                {entradaElegida
                  ? `Disponible: ${Number(entradaElegida.disponible_entrada).toFixed(2)} ${entradaElegida.unid_entrada}`
                  : "Elija una entrada de stock para ver lo disponible."}
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
              form="feeding-form"
              disabled={guardando}
              className="flex-1 bg-green-1-navbar text-white font-medium py-2.5 px-4 rounded-xl hover:bg-green-2-navbar shadow-md focus:outline-none focus:ring-2 focus:ring-green-1-navbar disabled:opacity-50 transition cursor-pointer"
            >
              {guardando ? (isEdit ? "Actualizando..." : "Guardando...") : (isEdit ? "Actualizar Alimentación" : "Guardar Alimentación")}
            </button>
          </div>
        </DialogFooter>

        <DialogDescription className="text-center text-parrafo select-none pointer-events-none">
          {isEdit ? "Modifique la información de la alimentación registrada." : "Complete los campos para registrar la alimentación. La cantidad se descuenta de la entrada de stock elegida."}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
