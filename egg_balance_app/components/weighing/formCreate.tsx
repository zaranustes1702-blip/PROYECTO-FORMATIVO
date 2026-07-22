function FormCreateWeighing() {
    return (
        <div className="p-4 max-w-xl bg-white rounded-lg shadow">
            <h1 className="text-xl font-semibold mb-4 text-[#3A2A1A]">
                Formulario de Pesaje
            </h1>

            <form className="flex flex-col gap-3">
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-[#3A2A1A]">
                        ID del Pesaje
                    </label>
                    <input
                        type="text"
                        name="weighingId"
                        className="border border-[#D8CDB8] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1E4D2B]"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-[#3A2A1A]">
                        Fecha
                    </label>
                    <input
                        type="date"
                        name="date"
                        className="border border-[#D8CDB8] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1E4D2B]"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-[#3A2A1A]">
                        Hora
                    </label>
                    <input
                        type="time"
                        name="time"
                        className="border border-[#D8CDB8] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1E4D2B]"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-[#3A2A1A]">
                        Responsable
                    </label>
                    <input
                        type="text"
                        name="responsible"
                        className="border border-[#D8CDB8] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1E4D2B]"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-[#3A2A1A]">
                        Gallina Pesada
                    </label>
                    <input
                        type="text"
                        name="weighedHen"
                        className="border border-[#D8CDB8] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1E4D2B]"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-[#3A2A1A]">
                        Peso Total (Kg)
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        name="totalWeightKg"
                        className="border border-[#D8CDB8] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1E4D2B]"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-[#3A2A1A]">
                        Peso Promedio (g)
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        name="averageWeightGrams"
                        className="border border-[#D8CDB8] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1E4D2B]"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-[#3A2A1A]">
                        Uniformidad (%)
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        name="batchUniformityPercentage"
                        className="border border-[#D8CDB8] rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1E4D2B]"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-[#1E4D2B] text-white py-2 rounded hover:bg-[#163A21] transition-colors"
                >
                    Crear
                </button>
            </form>
        </div>
    );
}

export default FormCreateWeighing;