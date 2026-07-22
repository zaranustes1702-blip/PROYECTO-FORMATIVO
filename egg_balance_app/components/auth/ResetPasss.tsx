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

type ProsResetPassword = {
  textButton: string;
};

export default function ResetPassword(props: ProsResetPassword) {
  return (
    <Dialog>
      <form>
        <DialogTrigger >
          <a className="text-sm text-green-1-navbar hover:text-green hover:underline mt-1 transition-colors cursor-pointer">
            {props.textButton}
          </a>
        </DialogTrigger>

        <DialogContent className="sm:max-w-sm rounded-2xl border-border bg-white">

          <DialogHeader>
            <DialogTitle className="text-center font-bold text-xl text-title">
              Recuperar Contraseña
            </DialogTitle>

            <DialogDescription className="text-center text-parrafo">
              Ingrese su correo para restablecer la contraseña.
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

          </FieldGroup>

          <DialogFooter className="flex flex-row gap-2 mt-4">

            <DialogClose />

            <Button className="w-full bg-green-2-navbar hover:bg-green-1-navbar text-white rounded-xl py-2.5 font-semibold shadow-md hover:shadow-lg hover:scale-[1.01] transition-all">
              Reestablecer
            </Button>

          </DialogFooter>

        </DialogContent>
      </form>
    </Dialog>
  );
}