import FormCreateMortality from "@/components/mortality/formCreate";
import TablaMortality from "@/components/mortality/tablaMortality";

function Mortality() {
    return (
        <div>
            <h1>Mortality</h1>
            <FormCreateMortality />
            <TablaMortality />
        </div>
    );
}

export default Mortality;