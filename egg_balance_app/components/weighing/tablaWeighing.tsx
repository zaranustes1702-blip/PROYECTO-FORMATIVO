export default function TablaWeighing() {
  return (
    <div className="p-4 bg-white rounded-lg shadow border border-border overflow-x-auto">

      <table className="w-full border-collapse">

        <thead>
          <tr className="bg-green-2-navbar text-white">

            <th className="border border-border px-4 py-2 text-left">
              ID Pesaje
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Fecha
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Hora
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Responsable
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Gallina Pesada
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Peso Total (Kg)
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Peso Promedio (g)
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Uniformidad (%)
            </th>

          </tr>
        </thead>

        <tbody>

          <tr className="hover:bg-fond transition-colors">

            <td className="border border-border px-4 py-2 text-title">
              P001
            </td>

            <td className="border border-border px-4 py-2 text-title">
              2025-05-01
            </td>

            <td className="border border-border px-4 py-2 text-title">
              08:00
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Juan Pérez
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Gallina 001
            </td>

            <td className="border border-border px-4 py-2 text-title">
              1.95
            </td>

            <td className="border border-border px-4 py-2 text-title">
              1950
            </td>

            <td className="border border-border px-4 py-2 text-title">
              92%
            </td>

          </tr>

          <tr className="hover:bg-fond transition-colors">

            <td className="border border-border px-4 py-2 text-title">
              P002
            </td>

            <td className="border border-border px-4 py-2 text-title">
              2025-05-08
            </td>

            <td className="border border-border px-4 py-2 text-title">
              09:00
            </td>

            <td className="border border-border px-4 py-2 text-title">
              María López
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Gallina 002
            </td>

            <td className="border border-border px-4 py-2 text-title">
              2.01
            </td>

            <td className="border border-border px-4 py-2 text-title">
              2010
            </td>

            <td className="border border-border px-4 py-2 text-title">
              94%
            </td>

          </tr>

          <tr className="hover:bg-fond transition-colors">

            <td className="border border-border px-4 py-2 text-title">
              P003
            </td>

            <td className="border border-border px-4 py-2 text-title">
              2025-05-15
            </td>

            <td className="border border-border px-4 py-2 text-title">
              07:30
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Carlos Ruiz
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Gallina 003
            </td>

            <td className="border border-border px-4 py-2 text-title">
              1.89
            </td>

            <td className="border border-border px-4 py-2 text-title">
              1890
            </td>

            <td className="border border-border px-4 py-2 text-title">
              89%
            </td>

          </tr>

        </tbody>

      </table>

    </div>
  );
}