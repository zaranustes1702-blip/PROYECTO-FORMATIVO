import FormCreateFeeding from "@/components/feeding/formCreate";

export default function CreateFeedingPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-title mb-6">
        Crear Alimentación
      </h1>

      <FormCreateFeeding />
    </div>
  );
}