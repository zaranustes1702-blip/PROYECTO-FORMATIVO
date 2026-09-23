import { Input } from "@/components/ui/input";
import FormCreateHealth from "@/components/health/formCreate";
import TablaHealth from "@/components/health/tablaHealth";

export default function HealthPage() {
  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-white p-6 gap-6">
      {/* Barra superior de Data Table shadcn: Input de filtro + Botón de acción */}
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filtrar salud..."
          className="max-w-sm"
          readOnly
        />
        <FormCreateHealth />
      </div>

      <div className="w-full overflow-x-auto">
        <TablaHealth />
      </div>
    </div>
  );
}