import TablaBirdBatch from "@/components/birdBatch/tablabirdBatch";

export default function ListarBirdBatchPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-title mb-6">
        Lotes de Aves
      </h1>

      <TablaBirdBatch />
    </div>
  );
}