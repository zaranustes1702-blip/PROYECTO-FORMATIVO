export default function TablaEggProduction() {
  return (
    <div className="p-4 bg-white rounded-lg shadow border border-border overflow-x-auto">

      <table className="w-full border-collapse">

        <thead>
          <tr className="bg-green-2-navbar text-white">

            <th className="border border-border px-4 py-2 text-left">
              Date
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Birds
            </th>

            <th className="border border-border px-4 py-2 text-left">
              AM
            </th>

            <th className="border border-border px-4 py-2 text-left">
              PM
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Total
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Egg Type
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
              A
            </td>

          </tr>

        </tbody>

      </table>

    </div>
  );
}