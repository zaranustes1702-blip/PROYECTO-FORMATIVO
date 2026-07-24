import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ResetPassword from "@/components/auth/ResetPasss";

export default function Login() {
  return (
    <Dialog>
      <form>

        {/* BOTÓN QUE ABRE EL MODAL */}
        <DialogTrigger
          className="
            group
            w-full sm:w-auto
            flex items-center justify-center gap-3
            !bg-[#2C3C23]
            hover:!bg-[#2E7D32]
            !text-white
            font-medium
            px-7 py-3
            rounded-full
            shadow-lg
            hover:shadow-xl
            transition-all duration-300
          "
        >
          Iniciar Sesión

          <span
            className="
              flex items-center justify-center
              w-6 h-6
              rounded-full
              !bg-[#F4C430]
              !text-[#3A2A1A]
              text-xs font-bold
              transition-transform duration-300
              group-hover:translate-x-1
            "
          >
            →
          </span>
        </DialogTrigger>

        {/* MODAL */}
        <DialogContent
          className="
            sm:max-w-sm
            rounded-2xl
            !border-[#2E7D32]
            !bg-white
          "
        >

          <DialogHeader>

            <DialogTitle
              className="
                text-center
                font-bold
                text-xl
                !text-[#3A2A1A]
              "
            >
              Ingreso
            </DialogTitle>

            <DialogDescription
              className="
                text-center
                !text-[#2C3C23]
              "
            >
              Ingrese sus credenciales para poder ingresar al sistema.
            </DialogDescription>

          </DialogHeader>

          <FieldGroup className="space-y-4">

            <Field>

              <Label
                htmlFor="usuario"
                className="!text-[#3A2A1A]"
              >
                Usuario
              </Label>

              <Input
                id="usuario"
                name="usuario"
                placeholder="****@gmail.com"
                className="
                  rounded-xl
                  !border-[#2E7D32]
                  focus:!ring-[#2E7D32]
                  focus:!border-[#2E7D32]
                "
              />

            </Field>

            <Field>

              <Label
                htmlFor="contrasena"
                className="!text-[#3A2A1A]"
              >
                Contraseña
              </Label>

              <Input
                id="contrasena"
                name="contrasena"
                placeholder="********"
                type="password"
                className="
                  rounded-xl
                  !border-[#2E7D32]
                  focus:!ring-[#2E7D32]
                  focus:!border-[#2E7D32]
                "
              />

              <ResetPassword
                textButton="¿Olvidaste tu contraseña?"
              />

            </Field>

          </FieldGroup>

          <DialogFooter className="mt-4">

            <Button
              type="submit"
              className="
                w-full
                !bg-[#2C3C23]
                hover:!bg-[#2E7D32]
                !text-white
                rounded-xl
                py-2.5
                font-semibold
                shadow-md
                hover:shadow-lg
                hover:scale-[1.01]
                transition-all
              "
            >
              Ingresar
            </Button>

          </DialogFooter>

        </DialogContent>

      </form>
    </Dialog>
  );
}