function FormCreateEggProduction() {
    return (
        <div className="p-4 max-w-4xl bg-white rounded-lg shadow border border-border">

            <h1 className="text-xl font-semibold mb-6 text-title">
                Formulario Producción de Huevos
            </h1>

            <form className="flex flex-col gap-6">

                {/* INFORMACIÓN GENERAL */}
                <div className="border border-border rounded-lg p-4">

                    <h2 className="font-semibold text-title mb-4">
                        Información General
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-title">
                                Fecha
                            </label>

                            <input
                                type="date"
                                name="productionDate"
                                className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-title">
                                Hora
                            </label>

                            <input
                                type="time"
                                name="productionHour"
                                className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-title">
                                Lote
                            </label>

                            <select
                                className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                            >
                                <option>Seleccione un lote</option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-title">
                                Cantidad de Aves
                            </label>

                            <input
                                type="number"
                                name="birdQuantity"
                                className="border border-border rounded px-3 py-2 bg-gray-100"
                                readOnly
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
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-title">
                                Rol
                            </label>

                            <select
                                className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                            >
                                <option>Gestor</option>
                                <option>Instructor</option>
                                <option>Pasante</option>
                            </select>
                        </div>

                    </div>

                </div>

                {/* RECOLECCIÓN */}
                <div className="border border-border rounded-lg p-4">

                    <h2 className="font-semibold text-title mb-4">
                        Recolección
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-title">
                                Huevos Recolectados (Mañana)
                            </label>

                            <input
                                type="number"
                                className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-title">
                                Huevos Recolectados (Tarde)
                            </label>

                            <input
                                type="number"
                                className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                            />
                        </div>

                    </div>

                </div>

                {/* CLASIFICACIÓN */}
                <div className="border border-border rounded-lg p-4">

                    <h2 className="font-semibold text-title mb-4">
                        Clasificación
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                        <div className="flex flex-col">
                            <label>Jumbo</label>
                            <input type="number" className="border border-border rounded px-3 py-2"/>
                        </div>

                        <div className="flex flex-col">
                            <label>AAA</label>
                            <input type="number" className="border border-border rounded px-3 py-2"/>
                        </div>

                        <div className="flex flex-col">
                            <label>AA</label>
                            <input type="number" className="border border-border rounded px-3 py-2"/>
                        </div>

                        <div className="flex flex-col">
                            <label>A</label>
                            <input type="number" className="border border-border rounded px-3 py-2"/>
                        </div>

                        <div className="flex flex-col">
                            <label>B</label>
                            <input type="number" className="border border-border rounded px-3 py-2"/>
                        </div>

                        <div className="flex flex-col">
                            <label>C</label>
                            <input type="number" className="border border-border rounded px-3 py-2"/>
                        </div>

                    </div>

                </div>

                {/* CONTROL */}
                <div className="border border-border rounded-lg p-4">

                    <h2 className="font-semibold text-title mb-4">
                        Control de Calidad
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-title">
                                Huevos Rotos
                            </label>

                            <input
                                type="number"
                                className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-title">
                                Observaciones
                            </label>

                            <textarea
                                rows={3}
                                className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                            />
                        </div>

                    </div>

                </div>

                {/* RESUMEN */}
                <div className="border border-border rounded-lg p-4 bg-fond">

                    <h2 className="font-semibold text-title mb-4">
                        Resumen Automático
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                        <div>
                            <label className="text-sm text-subtitle">
                                Total Mañana
                            </label>

                            <input
                                readOnly
                                className="border border-border rounded px-3 py-2 bg-gray-100 w-full"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-subtitle">
                                Total Tarde
                            </label>

                            <input
                                readOnly
                                className="border border-border rounded px-3 py-2 bg-gray-100 w-full"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-subtitle">
                                Total del Día
                            </label>

                            <input
                                readOnly
                                className="border border-border rounded px-3 py-2 bg-gray-100 w-full"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-subtitle">
                                Huevos Buenos
                            </label>

                            <input
                                readOnly
                                className="border border-border rounded px-3 py-2 bg-gray-100 w-full"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-subtitle">
                                Producción Semanal
                            </label>

                            <input
                                readOnly
                                className="border border-border rounded px-3 py-2 bg-gray-100 w-full"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-subtitle">
                                % Producción
                            </label>

                            <input
                                readOnly
                                className="border border-border rounded px-3 py-2 bg-gray-100 w-full"
                            />
                        </div>

                    </div>

                </div>

                <button
                    type="submit"
                    className="bg-green-2-navbar text-white py-2 rounded hover:bg-green-1-navbar transition-colors"
                >
                    Crear Producción
                </button>

            </form>

        </div>
    );
}

export default FormCreateEggProduction;