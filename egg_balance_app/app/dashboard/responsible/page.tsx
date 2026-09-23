import { Input } from "@/components/ui/input";
import FormCreateResponsible from "@/components/responsible/formCreate";
import TablaResponsible from "@/components/responsible/tablaResponsible";

export default function ResponsiblePage() {
  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-white p-6 gap-6">
      {/* Barra superior de Data Table shadcn: Input de filtro + Botón de acción */}
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filtrar responsable..."
          className="max-w-sm"
          readOnly
        />
        <FormCreateResponsible />
      </div>

      <div className="w-full overflow-x-auto">
        <TablaResponsible />
      </div>
    </div>
  );
}