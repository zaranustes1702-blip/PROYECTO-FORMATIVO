export default function TablaFeeding() {
  return (
    <div className="p-4 bg-white rounded-lg shadow border border-border overflow-x-auto">

      <table className="w-full border-collapse">

        <thead>
          <tr className="bg-green-2-navbar text-white">

            <th className="border border-border px-4 py-2 text-left">
              Fecha
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Consumo Diario (Kg)
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Saldo (Kg)
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Saldo (Bultos)
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Responsable
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Turno
            </th>

          </tr>
        </thead>

        <tbody>

          <tr className="hover:bg-fond transition-colors">

            <td className="border border-border px-4 py-2 text-title">
              2025-05-01
            </td>

            <td className="border border-border px-4 py-2 text-title">
              50
            </td>

            <td className="border border-border px-4 py-2 text-title">
              450
            </td>

            <td className="border border-border px-4 py-2 text-title">
              9
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Juan Pérez
            </td>

            <td className="border border-border px-4 py-2 text-title">
              AM
            </td>

          </tr>

          <tr className="hover:bg-fond transition-colors">

            <td className="border border-border px-4 py-2 text-title">
              2025-05-02
            </td>

            <td className="border border-border px-4 py-2 text-title">
              48
            </td>

            <td className="border border-border px-4 py-2 text-title">
              402
            </td>

            <td className="border border-border px-4 py-2 text-title">
              8
            </td>

            <td className="border border-border px-4 py-2 text-title">
              María López
            </td>

            <td className="border border-border px-4 py-2 text-title">
              PM
            </td>

          </tr>

          <tr className="hover:bg-fond transition-colors">

            <td className="border border-border px-4 py-2 text-title">
              2025-05-03
            </td>

            <td className="border border-border px-4 py-2 text-title">
              52
            </td>

            <td className="border border-border px-4 py-2 text-title">
              350
            </td>

            <td className="border border-border px-4 py-2 text-title">
              7
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Carlos Ruiz
            </td>

            <td className="border border-border px-4 py-2 text-title">
              AM
            </td>

          </tr>

        </tbody>

      </table>

    </div>
  );
}