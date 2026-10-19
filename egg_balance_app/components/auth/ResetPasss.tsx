"use client";

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
  onBack: () => void; // Nueva prop
};

export default function ResetPassword({ open, setOpen, onBack }: PropsResetPassword) {
  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    // tu lógica de reset
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-sm rounded-2xl border-border bg-white">
        <DialogHeader>
          <DialogTitle className="text-center font-bold text-xl text-gray-900 select-none">
            Recuperar Contraseña
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Ingrese su correo para restablecer la contraseña.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleReset} className="flex flex-col gap-3">
          <FieldGroup className="space-y-2">
            <Field>
              <Label htmlFor="usuario-reset" className="text-gray-900 text-sm">
                Usuario
              </Label>
              <Input
                id="usuario-reset"
                name="usuario"
                placeholder="****@gmail.com"
                className="rounded-xl border-border focus:ring-1 focus:ring-green-700"
              />
            </Field>
          </FieldGroup>

          <DialogFooter className="flex flex-row gap-2 mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onBack} // 👈 Ahora vuelve al Login
              className="w-1/2 rounded-xl border-border text-gray-900 cursor-pointer"
            >
              Volver
            </Button>
            <Button
              type="submit"
              className="w-1/2 !bg-[#2C3C23] hover:!bg-[#2E7D32] !text-white rounded-xl py-2.5 font-semibold shadow-md transition-all cursor-pointer"
            >
              Restablecer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}