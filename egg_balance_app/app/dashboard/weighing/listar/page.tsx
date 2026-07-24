import TablaWeighing from "@/components/weighing/tablaWeighing";

function ListWeighingPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-title mb-6">
                Lista de Pesajes
            </h1>

            <TablaWeighing />
        </div>
    );
}

export default ListWeighingPage;