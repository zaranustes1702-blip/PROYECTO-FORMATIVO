import { Input } from "@/components/ui/input";
import FormCreateEggProduction from "@/components/eggProduction/formCreate";
import TablaEggProduction from "@/components/eggProduction/tablaeggProduction";

export default function EggProductionPage() {
  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-white p-6 gap-6">
      {/* Barra superior de Data Table shadcn: Input de filtro + Botón de acción */}
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filtrar producción..."
          className="max-w-sm"
          readOnly
        />
        <FormCreateEggProduction />
      </div>

      <div className="w-full overflow-x-auto">
        <TablaEggProduction />
      </div>
    </div>
  );
}