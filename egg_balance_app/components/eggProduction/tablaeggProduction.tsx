export default function TablaEggProduction() {
  return (
    <div className="p-4 bg-white rounded-lg shadow border border-border overflow-x-auto">

      <table className="w-full border-collapse">

        <thead>
          <tr className="bg-green-2-navbar text-white">

            <th className="border border-border px-4 py-2 text-left">
              Fecha
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Aves
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Huevos AM
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Huevos PM
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Total Diario
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Huevos Rotos
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Tipo de Huevo
            </th>

          </tr>
        </thead>

        <tbody>

          <tr className="hover:bg-fond transition-colors">

            <td className="border border-border px-4 py-2 text-title">
              2025-05-01
            </td>

            <td className="border border-border px-4 py-2 text-title">
              500
            </td>

            <td className="border border-border px-4 py-2 text-title">
              220
            </td>

            <td className="border border-border px-4 py-2 text-title">
              230
            </td>

            <td className="border border-border px-4 py-2 text-title">
              450
            </td>

            <td className="border border-border px-4 py-2 text-title">
              5
            </td>

            <td className="border border-border px-4 py-2 text-title">
              AAA
            </td>

          </tr>

          <tr className="hover:bg-fond transition-colors">

            <td className="border border-border px-4 py-2 text-title">
              2025-05-02
            </td>

            <td className="border border-border px-4 py-2 text-title">
              500
            </td>

            <td className="border border-border px-4 py-2 text-title">
              225
            </td>

            <td className="border border-border px-4 py-2 text-title">
              235
            </td>

            <td className="border border-border px-4 py-2 text-title">
              460
            </td>

            <td className="border border-border px-4 py-2 text-title">
              3
            </td>

            <td className="border border-border px-4 py-2 text-title">
              AA
            </td>

          </tr>

          <tr className="hover:bg-fond transition-colors">

            <td className="border border-border px-4 py-2 text-title">
              2025-05-03
            </td>

            <td className="border border-border px-4 py-2 text-title">
              500
            </td>

            <td className="border border-border px-4 py-2 text-title">
              230
            </td>

            <td className="border border-border px-4 py-2 text-title">
              240
            </td>

            <td className="border border-border px-4 py-2 text-title">
              470
            </td>

            <td className="border border-border px-4 py-2 text-title">
              4
            </td>

            <td className="border border-border px-4 py-2 text-title">
              A
            </td>

          </tr>

        </tbody>

      </table>

    </div>
  );
}