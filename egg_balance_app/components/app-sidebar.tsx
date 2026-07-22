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
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const data = [
  {
    group: "Gestión de Aves",
    items: [
      { title: "Galpones", icon: Warehouse },
      { title: "Lotes de Aves", icon: Bird },
      { title: "Pesaje", icon: Scale },
      { title: "Mortalidad", icon: Skull },
      { title: "Alimentación", icon: Wheat },
    ],
  },
  {
    group: "Producción",
    items: [
      { title: "Producción de Huevos", icon: Egg },
    ],
  },
  {
    group: "Salud",
    items: [
      { title: "Salud", icon: HeartPulse },
      { title: "Cuarentena", icon: ShieldAlert },
    ],
  },
  {
    group: "Visitas",
    items: [
      { title: "Registro de Visitas", icon: ClipboardList },
    ],
  },
  {
    group: "Inventario",
    items: [
      { title: "Medicamentos", icon: Package },
      { title: "Alimentos", icon: Package },
    ],
  },
]

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <Egg />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  Egg Balance
                </span>
                <span className="truncate text-xs">
                  Sistema Avícola
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

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
                    <CollapsibleTrigger>
                      <SidebarMenuButton>
                        <item.icon />
                        <span>{item.title}</span>

                        <ChevronRight
                          className="
                            ml-auto
                            transition-transform
                            duration-200
                            group-data-[state=open]/collapsible:rotate-90
                          "
                        />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton>
                            Crear
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>

                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton>
                            Listar
                          </SidebarMenuSubButton>
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

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <User />
              <span>Administrador</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}