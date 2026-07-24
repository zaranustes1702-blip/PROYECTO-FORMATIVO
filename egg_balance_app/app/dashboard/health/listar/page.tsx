import TablaHealth from "@/components/health/tablaHealth";

function ListHealthPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-title mb-6">
                Registros de Sanidad
            </h1>

            <TablaHealth />
        </div>
    );
}

export default ListHealthPage;