import TablaFood from "@/components/food/tablaFood";

function ListFoodPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-title mb-6">
                Lista de Alimentos
            </h1>

            <TablaFood />
        </div>
    );
}

export default ListFoodPage;