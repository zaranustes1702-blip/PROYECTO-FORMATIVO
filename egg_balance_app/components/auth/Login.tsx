import {
  Dialog,
  DialogClose,
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

export default function Login(props: any) {
  return (
    <Dialog>
      <form>
        <DialogTrigger>
          <Button className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-green-2-navbar hover:bg-green-1-navbar text-white font-medium px-7 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
            Iniciar Sesión

            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow text-title text-xs font-bold transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-sm rounded-2xl border-border bg-white">

          <DialogHeader>
            <DialogTitle className="text-center font-bold text-xl text-title">
              Ingreso
            </DialogTitle>

            <DialogDescription className="text-center text-parrafo">
              Ingrese sus credenciales para poder ingresar al sistema.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="space-y-4">

            <Field>
              <Label
                htmlFor="usuario"
                className="text-title"
              >
                Usuario
              </Label>

              <Input
                id="usuario"
                name="usuario"
                placeholder="****@gmail.com"
                className="rounded-xl border-border focus:ring-1 focus:ring-green-1-navbar"
              />
            </Field>

            <Field>
              <Label
                htmlFor="contrasena"
                className="text-title"
              >
                Contraseña
              </Label>

              <Input
                id="contrasena"
                name="contrasena"
                placeholder="********"
                type="password"
                className="rounded-xl border-border focus:ring-1 focus:ring-green-1-navbar"
              />

              <ResetPassword textButton="¿Olvidaste tu contraseña?" />
            </Field>

          </FieldGroup>

          <DialogFooter className="flex flex-row gap-2 mt-4">

            <DialogClose />

            <Button className="w-full bg-green-2-navbar hover:bg-green-1-navbar text-white rounded-xl py-2.5 font-semibold shadow-md hover:shadow-lg hover:scale-[1.01] transition-all">
              Ingresar
            </Button>

          </DialogFooter>

        </DialogContent>
      </form>
    </Dialog>
  );
}