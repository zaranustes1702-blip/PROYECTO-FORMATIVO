import TablaEggProduction from "@/components/eggProduction/tablaeggProduction";

export default function ListEggProductionPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-title">
        Producción de Huevos
      </h1>

      <TablaEggProduction />
    </div>
  );
}