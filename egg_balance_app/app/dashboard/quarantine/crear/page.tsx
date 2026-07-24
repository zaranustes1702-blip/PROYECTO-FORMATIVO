import FormCreateQuarantine from "@/components/quarantine/formCreate";

function CreateQuarantinePage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-title mb-6">
                Registrar Cuarentena
            </h1>

            <FormCreateQuarantine />
        </div>
    );
}

export default CreateQuarantinePage;