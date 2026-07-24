import TablaQuarantine from "@/components/quarantine/tablaQuarantine";

function ListQuarantinePage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-title mb-6">
                Registros de Cuarentena
            </h1>

            <TablaQuarantine />
        </div>
    );
}

export default ListQuarantinePage;