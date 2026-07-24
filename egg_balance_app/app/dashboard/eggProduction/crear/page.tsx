import FormCreateEggProduction from "@/components/eggProduction/formCreate";

export default function CreateEggProductionPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-title">
        Registrar Producción de Huevos
      </h1>

      <FormCreateEggProduction />
    </div>
  );
}