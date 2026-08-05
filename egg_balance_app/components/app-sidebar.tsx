import Link from "next/link";

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
  ChevronRight,
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
  SidebarRail,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
  return (
    <Sidebar collapsible="icon">

      {/* HEADER */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>

            <button
              type="button"
              className="
                flex
                w-full
                items-center
                gap-2
                rounded-md
                p-2
                text-left
                transition-colors
                hover:bg-sidebar-accent
                hover:text-sidebar-accent-foreground
              "
            >
              <Egg />

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  Egg Balance
                </span>

                <span className="truncate text-xs">
                  Sistema Avícola
                </span>
              </div>
            </button>

          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* CONTENIDO */}
      <SidebarContent>

        {data.map((group) => (

          <SidebarGroup key={group.group}>

            <SidebarGroupLabel>
              {group.group}
            </SidebarGroupLabel>

            <SidebarMenu>

              {group.items.map((item) => (

                <Collapsible
                  key={item.title}
                  className="group/collapsible"
                >

                  <SidebarMenuItem>

                    {/* BOTÓN PRINCIPAL */}
                    <CollapsibleTrigger
                      className="
                        flex
                        w-full
                        items-center
                        gap-2
                        rounded-md
                        px-2
                        py-2
                        text-sm
                        transition-colors
                        hover:bg-sidebar-accent
                        hover:text-sidebar-accent-foreground
                      "
                    >

                      <item.icon />

                      <span>
                        {item.title}
                      </span>

                      <ChevronRight
                        className="
                          ml-auto
                          transition-transform
                          duration-200
                          group-data-[state=open]/collapsible:rotate-90
                        "
                      />

                    </CollapsibleTrigger>

                    {/* SUBMENÚ */}
                    <CollapsibleContent>

                      <SidebarMenuSub>

                        {/* CREAR */}
                        <SidebarMenuSubItem>
                          <Link
                            href={`/dashboard/${item.route}/crear`}
                            className="
                              flex
                              h-7
                              w-full
                              items-center
                              rounded-md
                              px-2
                              text-sm
                              text-sidebar-foreground
                              transition-colors
                              hover:bg-sidebar-accent
                              hover:text-sidebar-accent-foreground
                            "
                          >
                            Crear
                          </Link>
                        </SidebarMenuSubItem>

                        {/* LISTAR */}
                        <SidebarMenuSubItem>
                          <Link
                            href={`/dashboard/${item.route}/listar`}
                            className="
                              flex
                              h-7
                              w-full
                              items-center
                              rounded-md
                              px-2
                              text-sm
                              text-sidebar-foreground
                              transition-colors
                              hover:bg-sidebar-accent
                              hover:text-sidebar-accent-foreground
                            "
                          >
                            Listar
                          </Link>
                        </SidebarMenuSubItem>

                      </SidebarMenuSub>

                    </CollapsibleContent>

                  </SidebarMenuItem>

                </Collapsible>

              ))}

            </SidebarMenu>

          </SidebarGroup>

        ))}

      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter>

        <SidebarMenu>

          <SidebarMenuItem>

            <button
              type="button"
              className="
                flex
                w-full
                items-center
                gap-2
                rounded-md
                p-2
                text-left
                transition-colors
                hover:bg-sidebar-accent
                hover:text-sidebar-accent-foreground
              "
            >
              <User />

              <span>
                Administrador
              </span>
            </button>

          </SidebarMenuItem>

        </SidebarMenu>

      </SidebarFooter>

      <SidebarRail />

    </Sidebar>
  );
}