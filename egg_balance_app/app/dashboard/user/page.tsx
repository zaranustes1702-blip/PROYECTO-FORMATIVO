import { Input } from "@/components/ui/input";
import FormCreateUser from "@/components/user/formCreate";
import TablaUser from "@/components/user/tablaUser";

export default function UserPage() {
  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-white p-6 gap-6">
      {/* Barra superior de Data Table shadcn: Input de filtro + Botón de acción */}
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filtrar usuario..."
          className="max-w-sm"
          readOnly
        />
        <FormCreateUser />
      </div>

      <div className="w-full overflow-x-auto">
        <TablaUser />
      </div>
    </div>
  );
}