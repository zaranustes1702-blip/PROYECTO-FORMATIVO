function FormCreateFood() {
    return (
        <div className="p-4 max-w-xl bg-white rounded-lg shadow border border-border">

            <h1 className="text-xl font-semibold mb-4 text-title">
                Formulario de Registro de Alimento
            </h1>

            <form className="flex flex-col gap-3">

                {/* Fecha del alimento */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Fecha del Alimento
                    </label>

                    <input
                        type="date"
                        name="foodDate"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                {/* Tipo de alimento */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Tipo de Alimento
                    </label>

                    <select
                        name="foodType"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    >
                        <option value="">
                            Seleccione un tipo
                        </option>

                        <option value="Concentrado">
                            Concentrado
                        </option>

                        <option value="Suplemento">
                            Suplemento
                        </option>

                        <option value="Vitaminas">
                            Vitaminas
                        </option>

                        <option value="Minerales">
                            Minerales
                        </option>

                        <option value="Otro">
                            Otro
                        </option>
                    </select>
                </div>

                {/* Nombre */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Nombre del Alimento
                    </label>

                    <input
                        type="text"
                        name="foodName"
                        placeholder="Ej: Concentrado para ponedoras"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                {/* Marca */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Marca
                    </label>

                    <input
                        type="text"
                        name="brand"
                        placeholder="Ej: Italcol"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                    />
                </div>

                {/* Unidad de medida */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Unidad de Medida
                    </label>

                    <select
                        name="unitMeasure"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    >
                        <option value="">
                            Seleccione una unidad
                        </option>

                        <option value="Kg">
                            Kilogramos (Kg)
                        </option>

                        <option value="Bulto">
                            Bulto
                        </option>

                        <option value="Litro">
                            Litros (L)
                        </option>

                        <option value="Unidad">
                            Unidad
                        </option>
                    </select>
                </div>

                {/* Cantidad en stock */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Cantidad en Stock
                    </label>

                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        name="stockQuantity"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                {/* Valor unitario */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Valor Unitario
                    </label>

                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        name="unitValue"
                        placeholder="Ej: 85000"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                {/* Valor total */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Valor Total
                    </label>

                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        name="totalValue"
                        placeholder="Ej: 425000"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                {/* Fecha de vencimiento */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Fecha de Vencimiento
                    </label>

                    <input
                        type="date"
                        name="expirationDate"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                    />
                </div>

                {/* Proveedor */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Proveedor
                    </label>

                    <input
                        type="text"
                        name="supplier"
                        placeholder="Ej: Proveedor de Alimentos S.A.S."
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                {/* Ubicación */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Lugar de Almacenamiento
                    </label>

                    <input
                        type="text"
                        name="storageLocation"
                        placeholder="Ej: Bodega Principal"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                {/* Responsable */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Responsable
                    </label>

                    <input
                        type="text"
                        name="responsiblePerson"
                        placeholder="Nombre del responsable"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                {/* Observaciones */}
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Observaciones
                    </label>

                    <textarea
                        name="observations"
                        rows={4}
                        placeholder="Observaciones adicionales..."
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-green-1-navbar text-white py-2 rounded hover:bg-green-2-navbar transition"
                >
                    Crear Alimento
                </button>

            </form>

        </div>
    );
}

export default FormCreateFood;