"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, User, UserCog, KeyRound, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [autorizado, setAutorizado] = useState(false);

  // Sin token no se puede estar en el dashboard (ni volviendo con "atrás")
  useEffect(() => {
    const validarSesion = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setAutorizado(false);
        router.replace("/");
        return;
      }
      setAutorizado(true);
    };

    validarSesion();
    window.addEventListener("pageshow", validarSesion);
    window.addEventListener("storage", validarSesion);

    return () => {
      window.removeEventListener("pageshow", validarSesion);
      window.removeEventListener("storage", validarSesion);
    };
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setAutorizado(false);
    // replace evita que el botón "atrás" regrese al dashboard
    router.replace("/");
  };

  if (!autorizado) return null;

  return (
    <SidebarProvider defaultOpen={false} className="h-svh overflow-hidden">
      <AppSidebar />

      <SidebarInset className="flex flex-col h-full overflow-hidden">
        {/* NAVBAR — verde oscuro, h-12 */}
        <header className="flex h-12 shrink-0 items-center gap-3 border-b border-[#1F2C19] bg-[#2C3C23] px-4 text-white">
          <SidebarTrigger className="-ml-1 text-white hover:bg-white/10 hover:text-white" />

          <h1 className="font-semibold text-base text-white">
            Egg Balance
          </h1>

          <div className="flex-1" />

          {/* Notificaciones */}
          <button
            type="button"
            className="flex size-8 items-center justify-center rounded-md text-white/80 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
            aria-label="Notificaciones"
          >
            <Bell className="size-[18px]" />
          </button>

          {/* Menú de usuario (herramientas) */}
          <DropdownMenu>
            <DropdownMenuTrigger
              className="flex size-8 items-center justify-center rounded-full bg-[#F4C430] text-[#3A2A1A] transition-colors hover:bg-[#e6b800] cursor-pointer outline-none"
              aria-label="Opciones de usuario"
            >
              <User className="size-[18px]" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="w-56 rounded-xl border-[#E8DFD1] bg-white p-1 shadow-lg"
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#8C7A65]">
                  Mi cuenta
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="bg-[#EFE8DD]" />

                <DropdownMenuItem
                  onClick={() => router.push("/dashboard/profile")}
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#4A3B2C] focus:bg-[#F3EBD8]/60 focus:text-green-900"
                >
                  <UserCog className="size-4 text-[#7B6A56]" />
                  Actualizar perfil
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => router.push("/dashboard/change-password")}
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#4A3B2C] focus:bg-[#F3EBD8]/60 focus:text-green-900"
                >
                  <KeyRound className="size-4 text-[#7B6A56]" />
                  Actualizar contraseña
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="bg-[#EFE8DD]" />

              <DropdownMenuItem
                onClick={handleLogout}
                className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 focus:bg-red-50 focus:text-red-700"
              >
                <LogOut className="size-4" />
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* CONTENIDO con scroll propio */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}