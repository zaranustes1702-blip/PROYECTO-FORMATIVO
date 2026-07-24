import TablaUser from "@/components/user/tablaUser";

function ListUserPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-title mb-6">
                Lista de Usuarios
            </h1>

            <TablaUser />
        </div>
    );
}

export default ListUserPage;