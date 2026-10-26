import FormCreateFeeding from "@/components/feeding/formCreate";

function CreateFoodPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-title mb-6">
                Registrar Alimento
            </h1>

            <FormCreateFeeding />
        </div>
    );
}

export default CreateFoodPage;