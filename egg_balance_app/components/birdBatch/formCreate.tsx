function FormCreateBirdBatch() {
    return (
        <div className="p-4 max-w-xl bg-white rounded-lg shadow border border-border">

            <h1 className="text-xl font-semibold mb-4 text-title">
                Formulario de Lote
            </h1>

            <form className="flex flex-col gap-3">

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-title">
                        Fecha de Ingreso
                    </label>

                    <input
                        type="date"
                        name="entryDate"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-title">
                        Fecha de Finalización
                    </label>

                    <input
                        type="date"
                        name="Fec_Fin_Lote"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-title">
                        Número de Lote
                    </label>

                    <input
                        type="text"
                        name="batchNumber"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-title">
                        Cantidad de Aves
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
                        Peso del Lote
                    </label>

                    <input
                        type="number"
                        step="0.01"
                        name="batchWeight"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-title">
                        Edad en Semanas
                    </label>

                    <input
                        type="number"
                        name="birdAgeWeeks"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-title">
                        Vacunas Aplicadas
                    </label>

                    <input
                        type="text"
                        name="appliedVaccines"
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

export default FormCreateBirdBatch;