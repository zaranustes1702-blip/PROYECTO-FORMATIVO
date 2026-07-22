function FormCreateFeeding() {
    return (
        <div className="p-4 max-w-xl bg-white rounded-lg shadow">
            <h1 className="text-xl font-semibold mb-4">
                Formulario de Alimentación
            </h1>

            <form className="flex flex-col gap-3">
                <div className="flex flex-col">
                    <label className="text-sm font-medium">Fecha</label>
                    <input
                        type="date"
                        name="feedingDate"
                        className="border rounded px-3 py-2"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium">
                        Consumo Diario (Kg)
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        name="dailyConsumptionKg"
                        className="border rounded px-3 py-2"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium">
                        Saldo (Kg)
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        name="remainingKg"
                        className="border rounded px-3 py-2"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium">
                        Saldo (Bultos)
                    </label>
                    <input
                        type="number"
                        name="remainingBags"
                        className="border rounded px-3 py-2"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium">
                        Responsable
                    </label>
                    <input
                        type="text"
                        name="responsiblePerson"
                        className="border rounded px-3 py-2"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium">
                        Turno
                    </label>
                    <input
                        type="text"
                        name="shift"
                        className="border rounded px-3 py-2"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-green-1-navbar text-white py-2 rounded hover:bg-green-2-navbar"
                >
                    Crear
                </button>
            </form>
        </div>
    );
}

export default FormCreateFeeding;