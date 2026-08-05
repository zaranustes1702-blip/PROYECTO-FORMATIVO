function FormCreateSupply() {
    return (
        <div className="p-4 max-w-xl bg-white rounded-lg shadow border border-border">

            <h1 className="text-xl font-semibold mb-4 text-title">
                Formulario de Insumos
            </h1>

            <form className="flex flex-col gap-3">

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        ID Insumo
                    </label>

                    <input
                        type="text"
                        name="id"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Tipo de Insumo
                    </label>

                    <select
                        name="supplyType"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    >
                        <option value="">Seleccione una opción</option>
                        <option value="Alimento">Alimento</option>
                        <option value="Medicamento">Medicamento</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
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
                    <label className="text-sm font-medium text-subtitle">
                        Nombre del Insumo
                    </label>

                    <input
                        type="text"
                        name="supplyName"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Unidad de Medida
                    </label>

                    <input
                        type="text"
                        name="unitMeasure"
                        placeholder="Kg, Litros, Unidades..."
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Cantidad
                    </label>

                    <input
                        type="number"
                        name="quantity"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
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
                    <label className="text-sm font-medium text-subtitle">
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
                    <label className="text-sm font-medium text-subtitle">
                        Referencia
                    </label>

                    <input
                        type="text"
                        name="reference"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Fecha de Vencimiento
                    </label>

                    <input
                        type="date"
                        name="expirationDate"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Saldo
                    </label>

                    <input
                        type="number"
                        name="balance"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Peso
                    </label>

                    <input
                        type="number"
                        step="0.01"
                        name="weight"
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
                        rows={3}
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-green-1-navbar text-white py-2 rounded hover:bg-green-2-navbar transition"
                >
                    Crear Insumo
                </button>

            </form>

        </div>
    );
}

export default FormCreateSupply;