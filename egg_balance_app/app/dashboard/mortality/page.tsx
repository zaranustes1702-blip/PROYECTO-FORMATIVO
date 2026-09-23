import { Input } from "@/components/ui/input";
import FormCreateMortality from "@/components/mortality/formCreate";
import TablaMortality from "@/components/mortality/tablaMortality";

export default function MortalityPage() {
  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-white p-6 gap-6">
      {/* Barra superior de Data Table shadcn: Input de filtro + Botón de acción */}
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filtrar mortalidad..."
          className="max-w-sm"
          readOnly
        />
        <FormCreateMortality />
      </div>

      <div className="w-full overflow-x-auto">
        <TablaMortality />
      </div>
    </div>
  );
}