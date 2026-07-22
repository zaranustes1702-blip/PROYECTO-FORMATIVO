function FormCreateMortality() {
    return (
        <div className="p-4 max-w-xl bg-white rounded-lg shadow">
            <h1 className="text-xl font-semibold mb-4 text-title">
                Formulario de Mortalidad
            </h1>

            <form className="flex flex-col gap-3">

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Fecha
                    </label>

                    <input
                        type="date"
                        name="mortalityDate"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Hora
                    </label>

                    <input
                        type="time"
                        name="mortalityTime"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Mortalidad del Día
                    </label>

                    <input
                        type="number"
                        name="dailyMortality"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Posible Causa
                    </label>

                    <input
                        type="text"
                        name="possibleCauseOfDeath"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Necropsia
                    </label>

                    <select
                        name="necropsyPerformed"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                    >
                        <option value="true">Sí</option>
                        <option value="false">No</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Observaciones
                    </label>

                    <textarea
                        name="observations"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="bg-green-1-navbar text-white py-2 rounded hover:bg-green-2-navbar transition"
                >
                    Crear
                </button>

            </form>
        </div>
    );
}

export default FormCreateMortality;