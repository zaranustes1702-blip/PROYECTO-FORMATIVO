import { Input } from "@/components/ui/input";
import FormCreationBarn from "@/components/barn/formCreate";
import TableBarn from "@/components/barn/tablaBarn";

export default function BarnPage() {
  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-white p-6 gap-6">
      {/* Barra superior de Data Table shadcn: Input de filtro + Botón de acción */}
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filtrar galpones..."
          className="max-w-sm"
          readOnly
        />
        <FormCreationBarn />
      </div>

      <div className="w-full overflow-x-auto">
        <TableBarn />
      </div>
    </div>
  );
}