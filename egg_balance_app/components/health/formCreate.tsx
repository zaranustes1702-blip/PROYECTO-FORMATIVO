"use client";

function FormCreateHealth() {

    return (

        <div className="p-4 max-w-xl bg-white rounded-lg shadow border border-border">

            <h1 className="text-xl font-semibold mb-4 text-title">
                Formulario de Sanidad
            </h1>

            <form className="flex flex-col gap-3">


                {/* FECHA */}

                <div className="flex flex-col">

                    <label className="text-sm font-medium text-subtitle">
                        Fecha de Sanidad
                    </label>

                    <input
                        type="date"
                        name="Fec_Sanidad"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />

                </div>


                {/* CANTIDAD DE VACUNAS */}

                <div className="flex flex-col">

                    <label className="text-sm font-medium text-subtitle">
                        Cantidad de Vacunas
                    </label>

                    <input
                        type="number"
                        name="Cant_Vac_Sanidad"
                        min="0"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />

                </div>


                {/* NOMBRE DE VACUNA */}

                <div className="flex flex-col">

                    <label className="text-sm font-medium text-subtitle">
                        Nombre de la Vacuna
                    </label>

                    <input
                        type="text"
                        name="Nom_Vac_Sanidad"
                        className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
                        required
                    />

                </div>


                {/* BOTÓN */}

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