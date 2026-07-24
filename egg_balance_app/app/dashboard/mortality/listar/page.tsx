import TablaMortality from "@/components/mortality/tablaMortality";

function ListMortalityPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-title mb-6">
                Registros de Mortalidad
            </h1>

            <TablaMortality />
        </div>
    );
}

export default ListMortalityPage;