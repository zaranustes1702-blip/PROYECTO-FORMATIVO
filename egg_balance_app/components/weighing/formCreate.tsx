function FormCreateWeighing() {
    return (
        <div className="p-4 max-w-xl bg-white rounded-lg shadow border border-border">

            <h1 className="text-xl font-semibold mb-4 text-title">
                Formulario de Pesaje
            </h1>

            <form className="flex flex-col gap-3">

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-title">
                        ID del Pesaje
                    </label>

                    <input
                        type="text"
                        name="weighingId"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-title">
                        Fecha
                    </label>

                    <input
                        type="date"
                        name="date"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-title">
                        Hora
                    </label>

                    <input
                        type="time"
                        name="time"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-title">
                        Responsable
                    </label>

                    <input
                        type="text"
                        name="responsible"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-title">
                        Gallina Pesada
                    </label>

                    <input
                        type="text"
                        name="weighedHen"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-title">
                        Peso Total (Kg)
                    </label>

                    <input
                        type="number"
                        step="0.01"
                        name="totalWeightKg"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-title">
                        Peso Promedio (g)
                    </label>

                    <input
                        type="number"
                        step="0.01"
                        name="averageWeightGrams"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-title">
                        Uniformidad (%)
                    </label>

                    <input
                        type="number"
                        step="0.01"
                        name="batchUniformityPercentage"
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

export default FormCreateWeighing;