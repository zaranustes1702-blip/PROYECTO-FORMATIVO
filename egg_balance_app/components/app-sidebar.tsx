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
  ChevronDown,
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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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

  // Verifica si la ruta actual pertenece al módulo
  const isActive = (route: string) => {
    return pathname === `/dashboard/${route}` ||
      pathname?.startsWith(`/dashboard/${route}/`);
  };

  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      className="relative flex h-full flex-col border-r bg-white text-[#3A2A1A]"
    >

      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}

      <SidebarHeader className="bg-white">

        <SidebarMenu>

          <SidebarMenuItem>

            <SidebarMenuButton
              size="lg"
              className="
                bg-white
                text-[#3A2A1A]
                hover:bg-[#F2E9D4]
                hover:text-[#3A2A1A]
                group-data-[collapsible=icon]:justify-center
              "
            >

              <Egg className="size-5 shrink-0" />

              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">

                <span className="truncate font-semibold">
                  Egg Balance
                </span>

                <span className="truncate text-xs text-[#666161]">
                  Sistema Avícola
                </span>

              </div>

            </SidebarMenuButton>

          </SidebarMenuItem>

        </SidebarMenu>

      </SidebarHeader>


      {/* ===================================================== */}
      {/* CONTENIDO */}
      {/* ===================================================== */}

      <SidebarContent className="bg-white text-[#3A2A1A]">

        {data.map((group) => (

          <SidebarGroup key={group.group}>

            {/* TÍTULO DEL GRUPO */}

            <SidebarGroupLabel
              className="
                flex
                items-center
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-[#A5937B]
                group-data-[collapsible=icon]:justify-center
                group-data-[collapsible=icon]:px-0
              "
            >

              <span className="group-data-[collapsible=icon]:hidden">
                {group.group}
              </span>

            </SidebarGroupLabel>


            {/* MENÚ */}

            <SidebarMenu>

              {group.items.map((item) => {

                const active = isActive(item.route);

                return (

                  <Collapsible
                    key={item.title}
                    defaultOpen={active}
                    className="group/collapsible"
                  >

                    <SidebarMenuItem>

                      {/* ================================================= */}
                      {/* BOTÓN PRINCIPAL */}
                      {/* ================================================= */}

                      <CollapsibleTrigger
                        className="text-[#3A2A1A]"
                      >

                        <SidebarMenuButton
                          tooltip={item.title}
                          className={`
                            cursor-pointer
                            text-[#3A2A1A]
                            hover:bg-[#F2E9D4]
                            hover:text-[#3A2A1A]
                            group-data-[collapsible=icon]:justify-center
                            ${
                              active
                                ? "bg-[#F2E9D4] text-[#3A2A1A] hover:bg-[#F2E9D4]"
                                : ""
                            }
                          `}
                        >

                          <item.icon className="size-5 shrink-0" />

                          <span className="group-data-[collapsible=icon]:hidden">
                            {item.title}
                          </span>

                          <ChevronDown
                            className="
                              ml-auto
                              size-4
                              transition-transform
                              duration-200
                              group-data-[collapsible=icon]:hidden
                              group-data-[state=open]/collapsible:rotate-180
                            "
                          />

                        </SidebarMenuButton>

                      </CollapsibleTrigger>


                      {/* ================================================= */}
                      {/* SUBMENÚ */}
                      {/* ================================================= */}

                      <CollapsibleContent
                        className="
                          group-data-[collapsible=icon]:hidden
                        "
                      >

                        <SidebarMenuSub>

                          {/* CREAR */}

                          <SidebarMenuSubItem>

                            <SidebarMenuSubButton
                              className={`
                                cursor-pointer
                                text-[#666161]
                                hover:bg-[#F2E9D4]
                                hover:text-[#3A2A1A]
                                ${
                                  pathname ===
                                  `/dashboard/${item.route}/crear`
                                    ? "bg-[#F2E9D4] text-[#3A2A1A]"
                                    : ""
                                }
                              `}
                              onClick={() =>
                                router.push(
                                  `/dashboard/${item.route}/crear`
                                )
                              }
                            >

                              <span>
                                Crear
                              </span>

                            </SidebarMenuSubButton>

                          </SidebarMenuSubItem>


                          {/* LISTAR */}

                          <SidebarMenuSubItem>

                            <SidebarMenuSubButton
                              className={`
                                cursor-pointer
                                text-[#666161]
                                hover:bg-[#F2E9D4]
                                hover:text-[#3A2A1A]
                                ${
                                  pathname ===
                                  `/dashboard/${item.route}/listar`
                                    ? "bg-[#F2E9D4] text-[#3A2A1A]"
                                    : ""
                                }
                              `}
                              onClick={() =>
                                router.push(
                                  `/dashboard/${item.route}/listar`
                                )
                              }
                            >

                              <span>
                                Listar
                              </span>

                            </SidebarMenuSubButton>

                          </SidebarMenuSubItem>

                        </SidebarMenuSub>

                      </CollapsibleContent>

                    </SidebarMenuItem>

                  </Collapsible>

                );

              })}

            </SidebarMenu>

          </SidebarGroup>

        ))}

      </SidebarContent>


      {/* ===================================================== */}
      {/* FOOTER */}
      {/* ===================================================== */}

      <SidebarFooter className="bg-white">

        <SidebarMenu>

          <SidebarMenuItem>

            <SidebarMenuButton
              tooltip="Administrador"
              className="
                bg-white
                text-[#3A2A1A]
                hover:bg-[#F2E9D4]
                hover:text-[#3A2A1A]
                group-data-[collapsible=icon]:justify-center
              "
            >

              <User className="size-5 shrink-0" />

              <span className="group-data-[collapsible=icon]:hidden">
                Administrador
              </span>

            </SidebarMenuButton>

          </SidebarMenuItem>

        </SidebarMenu>

      </SidebarFooter>


      {/* ===================================================== */}
      {/* RAIL */}
      {/* ===================================================== */}

      <SidebarRail />

    </Sidebar>
  );
}