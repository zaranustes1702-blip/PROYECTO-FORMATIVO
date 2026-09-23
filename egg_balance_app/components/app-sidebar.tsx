"use client";

import {
  Bird,
  ClipboardList,
  Egg,
  HeartPulse,
  Package,
  ShieldAlert,
  Skull,
  Wheat,
  Warehouse,
  Scale,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";

import { usePathname, useRouter } from "next/navigation";

const data = [
  {
    group: "Gestión de Aves",
    items: [
      {
        title: "Galpones",
        icon: Warehouse,
        route: "barn",
      },
      {
        title: "Lotes de Aves",
        icon: Bird,
        route: "birdBatch",
      },
      {
        title: "Pesaje",
        icon: Scale,
        route: "weighing",
      },
      {
        title: "Mortalidad",
        icon: Skull,
        route: "mortality",
      },
      {
        title: "Alimentación",
        icon: Wheat,
        route: "feeding",
      },
    ],
  },
  {
    group: "Producción",
    items: [
      {
        title: "Producción de Huevos",
        icon: Egg,
        route: "eggProduction",
      },
    ],
  },
  {
    group: "Salud",
    items: [
      {
        title: "Salud",
        icon: HeartPulse,
        route: "health",
      },
      {
        title: "Cuarentena",
        icon: ShieldAlert,
        route: "quarantine",
      },
    ],
  },
  {
    group: "Visitas",
    items: [
      {
        title: "Registro de Visitas",
        icon: ClipboardList,
        route: "visit",
      },
    ],
  },
  {
    group: "Inventario",
    items: [
      {
        title: "Alimentos y medicamentos",
        icon: Package,
        route: "supply",
      },
    ],
  },
  {
    group: "Administración",
    items: [
      {
        title: "Responsables",
        icon: User,
        route: "responsible",
      },
      {
        title: "Usuarios",
        icon: User,
        route: "user",
      },
    ],
  },
];

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const checkIsActive = (route: string) => {
    return (
      pathname === `/dashboard/${route}` ||
      pathname?.startsWith(`/dashboard/${route}/`)
    );
  };

  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      className="relative flex h-full flex-col border-r border-[#E8DFD1]/80 bg-[#FCFBF9] text-[#3A2A1A]"
    >
      {/* HEADER */}
      <SidebarHeader className="border-b border-[#EFE8DD] bg-[#FCFBF9] pb-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="
                rounded-lg bg-white/70 p-2 text-[#3A2A1A] shadow-sm transition-all
                hover:bg-[#F2E9D4]/60 hover:text-green-800
                group-data-[collapsible=icon]:justify-center
              "
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-green-50 text-green-700 border border-green-200/60 shadow-xs">
                <Egg className="size-5" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-bold tracking-tight text-[#2D2115]">
                  Egg Balance
                </span>
                <span className="truncate text-xs font-medium text-green-700">
                  Sistema Avícola
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* CONTENIDO */}
      <SidebarContent className="bg-[#FCFBF9] px-2 py-3 text-[#3A2A1A]">
        {data.map((group) => (
          <SidebarGroup key={group.group} className="py-1">
            <SidebarGroupLabel
              className="
                mb-1 px-2.5 text-[11px] font-bold tracking-wider uppercase text-[#8C7A65]
                group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0
              "
            >
              <span className="group-data-[collapsible=icon]:hidden">
                {group.group}
              </span>
            </SidebarGroupLabel>

            <SidebarMenu className="gap-1">
              {group.items.map((item) => {
                const active = checkIsActive(item.route);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      title={item.title}
                      onClick={() => router.push(`/dashboard/${item.route}`)}
                      className={`
                        relative flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5
                        text-left text-sm font-medium transition-all duration-150
                        group-data-[collapsible=icon]:justify-center
                        ${
                          active
                            ? "bg-green-50/90 text-green-900 font-semibold shadow-xs border-l-4 border-green-600 rounded-l-none"
                            : "text-[#4A3B2C] hover:bg-[#F3EBD8]/50 hover:text-green-900 hover:translate-x-0.5"
                        }
                      `}
                    >
                      <item.icon
                        className={`size-[18px] shrink-0 transition-colors ${
                          active
                            ? "text-green-700"
                            : "text-[#7B6A56] group-hover:text-green-700"
                        }`}
                      />
                      <span className="truncate group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="border-t border-[#EFE8DD] bg-[#FCFBF9] pt-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="
                flex items-center gap-2 rounded-lg bg-white/60 px-3 py-2 text-[#3A2A1A] transition-colors
                hover:bg-green-50/60 hover:text-green-800
                group-data-[collapsible=icon]:justify-center
              "
            >
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#EFE8DD] text-[#5A4836]">
                <User className="size-4" />
              </div>
              <div className="flex flex-col text-left group-data-[collapsible=icon]:hidden">
                <span className="text-xs font-semibold text-[#2D2115]">
                  Administrador
                </span>
                <span className="text-[10px] text-gray-500">En línea</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}