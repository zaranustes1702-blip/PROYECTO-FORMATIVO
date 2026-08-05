function FormCreateBirdBatch() {
    return (
        <div className="p-6 max-w-xl bg-white rounded-lg shadow border border-border">

            <h2 className="text-xl font-semibold mb-6 text-title">
                Formulario Lote de Aves
            </h2>

            <form className="flex flex-col gap-4">

                {/* FECHA DE INGRESO */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-title">
                        Fecha de Ingreso
                    </label>

                    <input
                        type="date"
                        name="entryDate"
                        className="
                            border
                            border-border
                            rounded
                            px-3
                            py-2
                            text-title
                            focus:outline-none
                            focus:ring-2
                            focus:ring-green-1-navbar
                        "
                        required
                    />
                </div>

                {/* FECHA DE FINALIZACIÓN */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-title">
                        Fecha de Finalización
                    </label>

                    <input
                        type="date"
                        name="endDate"
                        className="
                            border
                            border-border
                            rounded
                            px-3
                            py-2
                            text-title
                            focus:outline-none
                            focus:ring-2
                            focus:ring-green-1-navbar
                        "
                        required
                    />
                </div>

                {/* NÚMERO DE LOTE */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-title">
                        Número de Lote
                    </label>

                    <input
                        type="text"
                        name="batchNumber"
                        placeholder="Ej: L001"
                        className="
                            border
                            border-border
                            rounded
                            px-3
                            py-2
                            text-title
                            placeholder:text-parrafo
                            focus:outline-none
                            focus:ring-2
                            focus:ring-green-1-navbar
                        "
                        required
                    />
                </div>

                {/* CANTIDAD DE AVES */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-title">
                        Cantidad de Aves
                    </label>

                    <input
                        type="number"
                        name="birdQuantity"
                        placeholder="Ej: 192"
                        className="
                            border
                            border-border
                            rounded
                            px-3
                            py-2
                            text-title
                            focus:outline-none
                            focus:ring-2
                            focus:ring-green-1-navbar
                        "
                        required
                    />
                </div>

                {/* PESO DEL LOTE */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-title">
                        Peso del Lote (Kg)
                    </label>

                    <input
                        type="number"
                        step="0.01"
                        name="batchWeight"
                        placeholder="Ej: 384.50"
                        className="
                            border
                            border-border
                            rounded
                            px-3
                            py-2
                            text-title
                            focus:outline-none
                            focus:ring-2
                            focus:ring-green-1-navbar
                        "
                        required
                    />
                </div>

                {/* EDAD */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-title">
                        Edad en Semanas
                    </label>

                    <input
                        type="number"
                        name="birdAgeWeeks"
                        placeholder="Ej: 20"
                        className="
                            border
                            border-border
                            rounded
                            px-3
                            py-2
                            text-title
                            focus:outline-none
                            focus:ring-2
                            focus:ring-green-1-navbar
                        "
                        required
                    />
                </div>

                {/* VACUNAS */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-title">
                        Vacunas Aplicadas
                    </label>

                    <input
                        type="text"
                        name="appliedVaccines"
                        placeholder="Ej: Newcastle, Bronquitis"
                        className="
                            border
                            border-border
                            rounded
                            px-3
                            py-2
                            text-title
                            placeholder:text-parrafo
                            focus:outline-none
                            focus:ring-2
                            focus:ring-green-1-navbar
                        "
                        required
                    />
                </div>

                {/* BOTÓN */}
                <button
                    type="submit"
                    className="
                        mt-2
                        bg-green-2-navbar
                        text-white
                        py-2
                        rounded
                        font-medium
                        hover:bg-green-1-navbar
                        transition-colors
                    "
                >
                    Crear Lote
                </button>

            </form>

        </div>
    );
}

export default FormCreateBirdBatch;