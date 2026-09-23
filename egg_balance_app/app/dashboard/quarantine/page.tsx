import { Input } from "@/components/ui/input";
import FormCreateQuarantine from "@/components/quarantine/formCreate";
import TablaQuarantine from "@/components/quarantine/tablaQuarantine";

export default function QuarantinePage() {
  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-white p-6 gap-6">
      {/* Barra superior de Data Table shadcn: Input de filtro + Botón de acción */}
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filtrar cuarentena..."
          className="max-w-sm"
          readOnly
        />
        <FormCreateQuarantine />
      </div>

      <div className="w-full overflow-x-auto">
        <TablaQuarantine />
      </div>
    </div>
  );
}