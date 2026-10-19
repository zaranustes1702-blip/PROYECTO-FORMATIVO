"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ResetPassword from "@/components/auth/ResetPasss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeClosed } from "lucide-react";

export default function Login() {
  const [openDialog, setOpenDialog] = useState(false);
  const [openReset, setOpenReset] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Cierra Login y abre Reset
  const goToReset = () => {
    setOpenDialog(false);
    setOpenReset(true);
  };

  // Cierra Reset y abre Login (para el botón "Volver")
  const goToLogin = () => {
    setOpenReset(false);
    setOpenDialog(true);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        let token =
          data?.info?.token ||
          data?.data?.token ||
          (typeof data?.data === "string" ? data.data : null) ||
          data?.token;
        if (data.success && token) {
          localStorage.setItem("token", token);
          setOpenDialog(false);
          router.push("/dashboard");
        } else {
          alert(
            typeof data?.message === "object"
              ? JSON.stringify(data.message)
              : data?.message || "Credenciales incorrectas"
          );
        }
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger className="group w-full sm:w-auto flex items-center justify-center gap-3 !bg-[#2C3C23] hover:!bg-[#2E7D32] !text-white font-medium px-7 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
          Iniciar Sesión
          <span className="flex items-center justify-center w-6 h-6 rounded-full !bg-[#F4C430] !text-[#3A2A1A] text-xs font-bold transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </DialogTrigger>

        <DialogContent className="sm:max-w-sm rounded-2xl !border-[#2E7D32] !bg-white">
          <DialogHeader>
            <DialogTitle className="text-center font-bold text-xl !text-[#3A2A1A]">
              Ingreso
            </DialogTitle>
            <DialogDescription className="text-center !text-[#2C3C23]">
              Ingrese sus credenciales para poder ingresar al sistema.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1 text-left">
              <Label htmlFor="usuario" className="!text-[#3A2A1A] font-medium text-sm">
                Usuario:
              </Label>
              <Input
                id="usuario"
                type="email"
                required
                placeholder="****@gmail.com"
                value={email}
                className="rounded-xl !border-[#2E7D32] focus:!ring-[#2E7D32] focus:!border-[#2E7D32]"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1 text-left">
              <Label htmlFor="password" className="!text-[#3A2A1A] font-medium text-sm">
                Contraseña:
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="********"
                  value={password}
                  className="rounded-xl !border-[#2E7D32] focus:!ring-[#2E7D32] focus:!border-[#2E7D32] pr-10"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={goToReset}
                className="text-xs text-green-1-navbar hover:text-green-2-navbar hover:underline bg-transparent border-none p-0 cursor-pointer"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <DialogFooter className="mt-1">
              <Button
                type="submit"
                className="w-full !bg-[#2C3C23] hover:!bg-[#2E7D32] !text-white rounded-xl py-2.5 font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                Ingresar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ResetPassword recibe onBack para regresar al Login */}
      <ResetPassword open={openReset} setOpen={setOpenReset} onBack={goToLogin} />
    </div>
  );
}