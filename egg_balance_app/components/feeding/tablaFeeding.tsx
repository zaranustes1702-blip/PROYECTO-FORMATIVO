export default function TablaFeeding() {
  return (
    <div className="p-4 bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-table-header-1 text-white">
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
              Turno
            </th>
          </tr>
        </thead>

        <tbody>
          <tr className="hover:bg-fond">
            <td className="border border-border px-4 py-2">
              2025-05-01
            </td>

            <td className="border border-border px-4 py-2">
              50
            </td>

            <td className="border border-border px-4 py-2">
              450
            </td>

            <td className="border border-border px-4 py-2">
              9
            </td>

            <td className="border border-border px-4 py-2">
              AM
            </td>
          </tr>

          <tr className="hover:bg-fond">
            <td className="border border-border px-4 py-2">
              2025-05-02
            </td>

            <td className="border border-border px-4 py-2">
              48
            </td>

            <td className="border border-border px-4 py-2">
              402
            </td>

            <td className="border border-border px-4 py-2">
              8
            </td>

            <td className="border border-border px-4 py-2">
              PM
            </td>
          </tr>

          <tr className="hover:bg-fond">
            <td className="border border-border px-4 py-2">
              2025-05-03
            </td>

            <td className="border border-border px-4 py-2">
              52
            </td>

            <td className="border border-border px-4 py-2">
              350
            </td>

            <td className="border border-border px-4 py-2">
              7
            </td>

            <td className="border border-border px-4 py-2">
              AM
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}