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
  API_USER_CREATE_URL,
  API_USER_UPDATE_URL,
} from "@/api/config";

interface FormCreateUserProps {
  onUserCreated?: () => void;
  initialData?: any;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function FormCreateUser({
  onUserCreated,
  initialData,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: FormCreateUserProps) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isControlled ? controlledOpen : internalOpen;
  const isEdit = Boolean(initialData);

  const [guardando, setGuardando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    documentId: "",
    postJob: "",
    active: "true",
  });

  useEffect(() => {
    if (initialData && open) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        password: "", // Contraseña vacía al editar a menos que desee cambiarla
        documentId: initialData.documentId || "",
        postJob: initialData.postJob || "",
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
      name: "",
      email: "",
      password: "",
      documentId: "",
      postJob: "",
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

    const datosEnviar: any = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      documentId: formData.documentId.trim(),
      postJob: formData.postJob,
      active: formData.active === "true",
    };

    if (formData.password && formData.password.trim() !== "") {
      datosEnviar.password = formData.password;
    } else if (!isEdit) {
      datosEnviar.password = formData.password;
    }

    try {
      const token = localStorage.getItem("token");
      const url = isEdit
        ? API_USER_UPDATE_URL(initialData.userId)
        : API_USER_CREATE_URL;
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
        // En caso de que no devuelva JSON
      }

      if (!response.ok) {
        throw new Error(
          resultado?.message ||
            resultado?.mensaje ||
            resultado?.error ||
            `Error ${response.status}: No se pudo ${isEdit ? "actualizar" : "registrar"} el usuario`
        );
      }

      setMensajeExito(isEdit ? "¡Usuario actualizado correctamente!" : "¡Usuario registrado correctamente!");
      if (!isEdit) resetInputs();

      if (onUserCreated) {
        onUserCreated();
      }

      setTimeout(() => {
        handleOpenChange(false);
        setMensajeExito("");
      }, 1200);
    } catch (error: any) {
      console.error(`Error al ${isEdit ? "actualizar" : "registrar"} usuario:`, error);
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
          <span>Registrar Usuario</span>
        </DialogTrigger>
      )}

      <DialogContent className="bg-white sm:max-w-[425px] md:max-w-[800px] border border-border rounded-2xl shadow-xl">
        <DialogHeader className="font-bold text-2xl text-center text-title select-none pointer-events-none">
          <DialogTitle className="text-center font-bold text-2xl text-title select-none pointer-events-none">
            {isEdit ? "Editar Usuario" : "Registrar Usuario"}
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

        <form id="user-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Nombre Completo:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                maxLength={50}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Ej: Laura Martínez"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Correo Electrónico:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                maxLength={50}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="ejemplo@correo.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                {isEdit ? "Nueva Contraseña (opcional):" : "Contraseña Temporal:"}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required={!isEdit}
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder={isEdit ? "Dejar en blanco para no cambiar" : "Mínimo 8 caracteres"}
              />
            </div>

            <div>
              <label
                htmlFor="documentId"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Documento de Identidad:
              </label>
              <input
                type="text"
                id="documentId"
                name="documentId"
                value={formData.documentId}
                onChange={handleChange}
                maxLength={20}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                placeholder="Ej: 1023456789"
              />
            </div>

            <div>
              <label
                htmlFor="postJob"
                className="block text-sm font-semibold text-title mb-1 select-none pointer-events-none"
              >
                Cargo:
              </label>
              <select
                id="postJob"
                name="postJob"
                value={formData.postJob}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title focus:outline-none focus:ring-2 focus:ring-green-1-navbar cursor-pointer"
              >
                <option value="">Seleccione un cargo</option>
                <option value="Aprendiz">Aprendiz</option>
                <option value="Instructor">Instructor</option>
                <option value="Gestor">Gestor</option>
                <option value="Gestor líder">Gestor líder</option>
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
                className="w-full px-3 py-2 bg-white border border-border rounded-xl text-title focus:outline-none focus:ring-2 focus:ring-green-1-navbar cursor-pointer"
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
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2.5 px-4 rounded-xl shadow-sm focus:outline-none disabled:opacity-50 transition cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              form="user-form"
              disabled={guardando}
              className="flex-1 bg-green-1-navbar text-white font-medium py-2.5 px-4 rounded-xl hover:bg-green-2-navbar shadow-md focus:outline-none focus:ring-2 focus:ring-green-1-navbar disabled:opacity-50 transition cursor-pointer"
            >
              {guardando ? (isEdit ? "Actualizando..." : "Registrando...") : (isEdit ? "Actualizar Usuario" : "Guardar Usuario")}
            </button>
          </div>
        </DialogFooter>

        <DialogDescription className="text-center text-parrafo select-none pointer-events-none">
          {isEdit ? "Modifique los datos del usuario seleccionado." : "Complete los campos para registrar un nuevo usuario."}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}