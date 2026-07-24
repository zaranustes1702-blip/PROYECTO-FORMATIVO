function FormCreateFeeding() {
  return (
    <div className="p-4 max-w-xl bg-white rounded-lg shadow border border-border">

      <h1 className="text-xl font-semibold mb-4 text-title">
        Formulario de Alimentación
      </h1>

      <form className="flex flex-col gap-3">

        <div className="flex flex-col">
          <label className="text-sm font-medium text-title">
            Fecha
          </label>

          <input
            type="date"
            name="feedingDate"
            className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-title">
            Consumo Diario (Kg)
          </label>

          <input
            type="number"
            step="0.01"
            name="dailyConsumptionKg"
            className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-title">
            Saldo (Kg)
          </label>

          <input
            type="number"
            step="0.01"
            name="remainingKg"
            className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-title">
            Saldo (Bultos)
          </label>

          <input
            type="number"
            name="remainingBags"
            className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-title">
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
          <label className="text-sm font-medium text-title">
            Turno
          </label>

          <select
            name="shift"
            className="border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-1-navbar"
            required
          >
            <option value="">Seleccionar turno</option>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
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

export default FormCreateFeeding;