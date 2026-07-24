function FormCreateResponsible() {
    return (
        <div className="p-4 max-w-xl bg-white rounded-lg shadow border border-border">

            <h1 className="text-xl font-semibold mb-4 text-title">
                Formulario de Responsable
            </h1>

            <form className="flex flex-col gap-3">

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Nombre
                    </label>

                    <input
                        type="text"
                        name="fullName"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Documento
                    </label>

                    <input
                        type="text"
                        name="documentNumber"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Ficha
                    </label>

                    <input
                        type="text"
                        name="trainingRecord"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Rol
                    </label>

                    <input
                        type="text"
                        name="role"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium text-subtitle">
                        Tipo de Responsable
                    </label>

                    <select
                        name="responsibleType"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    >
                        <option value="">
                            Seleccione una opción
                        </option>

                        <option value="Instructor">
                            Instructor
                        </option>

                        <option value="Aprendiz">
                            Aprendiz
                        </option>

                        <option value="Pasante">
                            Pasante
                        </option>

                        <option value="Gestor">
                            Gestor
                        </option>
                    </select>
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

export default FormCreateResponsible;