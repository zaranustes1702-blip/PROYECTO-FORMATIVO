import FormCreateEggProduction from "@/components/eggProduction/formCreate";
import TablaEggProduction from "@/components/eggProduction/tablaeggProduction";

function EggProduction() {
    return (
        <div>
            <h1>Egg Production</h1>
            <FormCreateEggProduction />
            <TablaEggProduction />
        </div>
    );
}

export default EggProduction;