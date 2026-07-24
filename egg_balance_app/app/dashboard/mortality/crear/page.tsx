import FormCreateMortality from "@/components/mortality/formCreate";

function CreateMortalityPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-title mb-6">
                Registrar Mortalidad
            </h1>

            <FormCreateMortality />
        </div>
    );
}

export default CreateMortalityPage;