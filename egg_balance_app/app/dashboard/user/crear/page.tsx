import FormCreateUser from "@/components/user/formCreate";

function CreateUserPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-title mb-6">
                Registrar Usuario
            </h1>

            <FormCreateUser />
        </div>
    );
}

export default CreateUserPage;