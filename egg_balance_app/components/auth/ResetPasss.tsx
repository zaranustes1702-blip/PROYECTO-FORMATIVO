
"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type PropsResetPassword = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onBack: () => void;
};

export default function ResetPassword({
  open,
  setOpen,
  onBack,
}: PropsResetPassword) {
  const [email, setEmail] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleReset = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    console.log("Botón Restablecer presionado");

    if (!email.trim()) {
      alert("Por favor, ingresa tu correo electrónico.");
      return;
    }

    try {
      setCargando(true);

      const response = await fetch(
        "http://localhost:3000/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
          }),
        }
      );

      const data = await response.json();

      console.log("Respuesta del servidor:", data);

      if (!response.ok || data.success === false) {
        alert(
          data.message ||
            "No se pudo procesar la recuperación de contraseña."
        );
        return;
      }

      alert(
        data.message ||
          "Solicitud de recuperación procesada correctamente."
      );

      setEmail("");
      setOpen(false);
    } catch (error) {
      console.error(
        "Error al recuperar la contraseña:",
        error
      );

      alert(
        "No se pudo conectar con el servidor. Verifica que el backend esté funcionando y que la URL sea correcta."
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm rounded-2xl border-border bg-white">
        <DialogHeader>
          <DialogTitle className="text-center font-bold text-xl text-gray-900 select-none">
            Recuperar Contraseña
          </DialogTitle>

          <DialogDescription className="text-center text-gray-600">
            Ingresa tu correo electrónico para solicitar la recuperación de tu contraseña.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleReset}
          className="flex flex-col gap-3"
        >
          <FieldGroup className="space-y-2">
            <Field>
              <Label
                htmlFor="usuario-reset"
                className="text-gray-900 text-sm"
              >
                Correo electrónico
              </Label>

              <Input
                id="usuario-reset"
                name="email"
                type="email"
                placeholder="usuario@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={cargando}
                autoComplete="email"
                className="rounded-xl border-border focus:ring-1 focus:ring-green-700"
              />
            </Field>
          </FieldGroup>

          <DialogFooter className="flex flex-row gap-2 mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              disabled={cargando}
              className="w-1/2 rounded-xl border-border text-gray-900 cursor-pointer"
            >
              Volver
            </Button>

            <Button
              type="submit"
              disabled={cargando}
              className="w-1/2 !bg-[#2C3C23] hover:!bg-[#2E7D32] !text-white rounded-xl py-2.5 font-semibold shadow-md transition-all cursor-pointer"
            >
              {cargando
                ? "Procesando..."
                : "Restablecer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
