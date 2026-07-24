function FormCreateQuarantine() {
    return (
        <div className="p-4 max-w-xl bg-white rounded-lg shadow border border-border">

            <h1 className="text-xl font-semibold mb-4 text-title">
                Formulario de Cuarentena
            </h1>

            <form className="flex flex-col gap-3">

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Fecha
                    </label>

                    <input
                        type="date"
                        name="quarantineDate"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Cantidad de Aves Afectadas
                    </label>

                    <input
                        type="number"
                        name="affectedBirds"
                        min="0"
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
                        Tratamiento Aplicado
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
                        Dosis
                    </label>

                    <input
                        type="text"
                        name="dosage"
                        placeholder="Ej: 10 ml"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Duración del Tratamiento
                    </label>

                    <input
                        type="text"
                        name="treatmentDuration"
                        placeholder="Ej: 7 días"
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
                        Fecha de Finalización
                    </label>

                    <input
                        type="date"
                        name="quarantineEndDate"
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

export default FormCreateQuarantine;