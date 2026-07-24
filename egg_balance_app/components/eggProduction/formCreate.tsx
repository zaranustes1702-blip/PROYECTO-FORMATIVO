function FormCreateEggProduction() {
    return (
        <div className="p-4 max-w-xl bg-white rounded-lg shadow border border-border">

            <h1 className="text-xl font-semibold mb-4 text-title">
                Formulario de Producción de Huevos
            </h1>

            <form className="flex flex-col gap-3">

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-title">
                        Fecha
                    </label>

                    <input
                        type="date"
                        name="productionDate"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-title">
                        Número de Aves
                    </label>

                    <input
                        type="number"
                        name="birdQuantity"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-title">
                        Huevos Recolectados en la Mañana
                    </label>

                    <input
                        type="number"
                        name="collectedAM"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-title">
                        Huevos Recolectados en la Tarde
                    </label>

                    <input
                        type="number"
                        name="collectedPM"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-title">
                        Producción Diaria
                    </label>

                    <input
                        type="number"
                        name="dailyProduction"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-title">
                        Huevos Rotos
                    </label>

                    <input
                        type="number"
                        name="brokenEggs"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-title">
                        Tipo de Huevo
                    </label>

                    <select
                        name="eggType"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                    >
                        <option value="AAA">AAA</option>
                        <option value="AA">AA</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="JUMBO">JUMBO</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-title">
                        Valor Unitario
                    </label>

                    <input
                        type="number"
                        step="0.01"
                        name="unitValue"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-title">
                        Valor Total
                    </label>

                    <input
                        type="number"
                        step="0.01"
                        name="totalValue"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-title">
                        Total Semanal de Huevos
                    </label>

                    <input
                        type="number"
                        name="weeklyEggTotal"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-green-2-navbar text-white py-2 rounded hover:bg-green-1-navbar transition-colors"
                >
                    Crear
                </button>

            </form>
        </div>
    );
}

export default FormCreateEggProduction;