import FormCreateQuarantine from "@/components/quarantine/formCreate";
import TablaQuarantine from "@/components/quarantine/tablaQuarantine";

function Quarantine() {
    return (
        <div>
            <h1>Quarantine</h1>
            <FormCreateQuarantine />
            <TablaQuarantine />
        </div>
    );
}

export default Quarantine;