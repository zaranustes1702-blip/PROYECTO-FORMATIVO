function FormCreateBarn() {
    return (
        <div className="p-4 max-w-xl bg-white rounded-lg shadow border border-border">

            <h1 className="text-xl font-semibold mb-4 text-title">
                Formulario Galpón
            </h1>

            <form className="flex flex-col gap-3">

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-title">
                        Nombre del Galpón
                    </label>

                    <input
                        type="text"
                        name="barnName"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-title">
                        Tamaño
                    </label>

                    <input
                        type="number"
                        step="0.01"
                        name="barnSize"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-title">
                        Capacidad Máxima
                    </label>

                    <input
                        type="number"
                        name="maxBirdCapacity"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Raza de aves
                    </label>

                    <select
                        name="supplyType"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    >
                        <option value="">Seleccione una opción</option>
                        <option value="Raza">Hy-Line Brown</option>
                    </select>
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

export default FormCreateBarn;