import TablaBarn from "@/components/barn/tablaBarn";

export default function ListarBarnPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-title mb-6">
        Lista de Galpones
      </h1>

      <TablaBarn />
    </div>
  );
}