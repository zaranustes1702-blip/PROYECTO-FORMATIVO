import TablaResponsible from "@/components/responsible/tablaResponsible";

function ListResponsiblePage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-title mb-6">
                Lista de Responsables
            </h1>

            <TablaResponsible />
        </div>
    );
}

export default ListResponsiblePage;