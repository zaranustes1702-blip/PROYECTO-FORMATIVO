import FormCreateFood from "@/components/food/formCreate";

function CreateFoodPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-title mb-6">
                Registrar Alimento
            </h1>

            <FormCreateFood />
        </div>
    );
}

export default CreateFoodPage;