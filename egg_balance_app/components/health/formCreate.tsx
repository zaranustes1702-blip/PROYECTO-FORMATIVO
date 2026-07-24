function FormCreateHealth() {
    return (
        <div className="p-4 max-w-xl bg-white rounded-lg shadow border border-border">

            <h1 className="text-xl font-semibold mb-4 text-title">
                Formulario de Sanidad
            </h1>

            <form className="flex flex-col gap-3">

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Fecha de Detección
                    </label>

                    <input
                        type="date"
                        name="detectionDate"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Lote Afectado
                    </label>

                    <input
                        type="text"
                        name="affectedBatch"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Síntomas
                    </label>

                    <input
                        type="text"
                        name="symptoms"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Diagnóstico
                    </label>

                    <input
                        type="text"
                        name="diagnosis"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Tratamiento
                    </label>

                    <input
                        type="text"
                        name="treatmentApplied"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Responsable
                    </label>

                    <input
                        type="text"
                        name="responsiblePerson"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Observaciones
                    </label>

                    <textarea
                        name="observations"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Fecha de Recuperación
                    </label>

                    <input
                        type="date"
                        name="recoveryDate"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                    />
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

export default FormCreateHealth;