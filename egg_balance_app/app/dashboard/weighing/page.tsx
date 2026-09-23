import { Input } from "@/components/ui/input";
import FormCreateWeighing from "@/components/weighing/formCreate";
import TablaWeighing from "@/components/weighing/tablaWeighing";

export default function WeighingPage() {
  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-white p-6 gap-6">
      {/* Barra superior de Data Table shadcn: Input de filtro + Botón de acción */}
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filtrar pesaje..."
          className="max-w-sm"
          readOnly
        />
        <FormCreateWeighing />
      </div>

      <div className="w-full overflow-x-auto">
        <TablaWeighing />
      </div>
    </div>
  );
}