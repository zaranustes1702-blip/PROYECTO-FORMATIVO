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
  API_FEEDING_URL,
  API_SUPPLY_ALL_URL,
  API_STOCK_ENTRY_ALL_URL,
  API_RESPONSIBLE_ALL_URL,
} from "@/api/config";

interface FormCreateFeedingProps {
  onFeedingCreated?: () => void;
}

export default function FormCreateFeeding({
  onFeedingCreated,
}: FormCreateFeedingProps) {
  const [open, setOpen] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  // Listas para los select
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

  // Cada vez que se abre el formulario se cargan las listas
  useEffect(() => {
    if (!open) return;

    const cargarListas = async () => {
      try {
        // Solo insumos activos de tipo alimentacion
        const resInsumos = await fetch(`${API_SUPPLY_ALL_URL}?limit=500`);
        const dataInsumos = await resInsumos.json();
        const listaInsumos = dataInsumos.info || [];
        setInsumos(
          listaInsumos.filter(
            (i: any) => i.active && i.supplyType === "alimentacion"
          )
        );

        const resEntradas = await fetch(`${API_STOCK_ENTRY_ALL_URL}?limit=500`);
        const dataEntradas = await resEntradas.json();
        setEntradas(dataEntradas.info || []);

        // Solo responsables activos
        const resResponsables = await fetch(`${API_RESPONSIBLE_ALL_URL}?limit=500`);
        const dataResponsables = await resResponsables.json();
        const listaResponsables = dataResponsables.info || [];
        setResponsables(listaResponsables.filter((r: any) => r.active));
      } catch (error) {
        console.error("Error al cargar las listas:", error);
        setMensajeError("No se pudieron cargar los insumos, entradas o responsables.");
      }
    };

    cargarListas();
  }, [open]);

  // Entradas del insumo elegido que están activas y tienen disponible
  const entradasDelInsumo = entradas.filter(
    (entrada: any) =>
      entrada.id_supply === formData.id_supply &&
      entrada.active &&
      Number(entrada.disponible_entrada) > 0
  );

  const entradaElegida = entradasDelInsumo.find(
    (entrada: any) => String(entrada.id_stockEntry) === formData.id_stockEntry
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const actualizados = { ...prev, [name]: value };

      // Si cambia el insumo, hay que volver a elegir la entrada de stock
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
      const response = await fetch(`${API_FEEDING_URL}/CreateFeeding`, {
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
            `Error ${response.status}: No se pudo registrar la alimentación`
        );
      }

      setMensajeExito("¡Alimentación registrada correctamente!");
      resetInputs();

      // Avisa a la página para que la tabla se recargue de inmediato
      if (onFeedingCreated) {
        onFeedingCreated();
      }

      setTimeout(() => {
        setOpen(false);
        setMensajeExito("");
      }, 1500);
    } catch (error: any) {
      console.error("Error al registrar alimentación:", error);
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
        <span>Registrar Alimentación</span>
      </DialogTrigger>

      <DialogContent className="bg-white sm:max-w-[425px] md:max-w-[800px] max-h-[90vh] overflow-y-auto border border-border rounded-2xl shadow-xl">
        <DialogHeader className="font-bold text-2xl text-center text-title select-none pointer-events-none">
          <DialogTitle className="text-center font-bold text-2xl text-title select-none pointer-events-none">
            Registrar Alimentación
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
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title focus:outline-none focus:border-[#C5B8A5]"
              >
                <option value="">Seleccione un insumo</option>
                {insumos.map((insumo: any) => (
                  <option key={insumo.id_supply} value={insumo.id_supply}>
                    {insumo.supplyName} ({insumo.id_supply})
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
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title focus:outline-none focus:border-[#C5B8A5]"
              >
                <option value="">
                  {formData.id_supply
                    ? "Seleccione una entrada"
                    : "Primero elija un insumo"}
                </option>
                {entradasDelInsumo.map((entrada: any) => (
                  <option key={entrada.id_stockEntry} value={entrada.id_stockEntry}>
                    #{entrada.id_stockEntry} · Disponible{" "}
                    {Number(entrada.disponible_entrada).toFixed(2)} {entrada.unid_entrada}
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
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title focus:outline-none focus:border-[#C5B8A5]"
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
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title focus:outline-none focus:border-[#C5B8A5]"
              />
            </div>

            <div>
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
                max={entradaElegida ? Number(entradaElegida.disponible_entrada) : undefined}
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
              form="feeding-form"
              disabled={guardando}
              className="flex-1 bg-green-1-navbar text-white font-medium py-2.5 px-4 rounded-xl hover:bg-green-2-navbar shadow-md focus:outline-none focus:ring-2 focus:ring-green-1-navbar disabled:opacity-50 transition"
            >
              {guardando ? "Guardando..." : "Guardar Alimentación"}
            </button>
          </div>
        </DialogFooter>

        <DialogDescription className="text-center text-parrafo select-none pointer-events-none">
          Complete los campos para registrar la alimentación. La cantidad se descuenta de la entrada de stock elegida.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
