import TablaFeeding from "@/components/feeding/tablaFeeding";

export default function ListFeedingPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-title mb-6">
        Lista de Alimentación
      </h1>

      <TablaFeeding />
    </div>
  );
}