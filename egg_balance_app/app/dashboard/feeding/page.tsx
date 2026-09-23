import { Input } from "@/components/ui/input";
import FormCreateFeeding from "@/components/feeding/formCreate";
import TablaFeeding from "@/components/feeding/tablaFeeding";

export default function FeedingPage() {
  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-white p-6 gap-6">
      {/* Barra superior de Data Table shadcn: Input de filtro + Botón de acción */}
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filtrar alimentación..."
          className="max-w-sm"
          readOnly
        />
        <FormCreateFeeding />
      </div>

      <div className="w-full overflow-x-auto">
        <TablaFeeding />
      </div>
    </div>
  );
}