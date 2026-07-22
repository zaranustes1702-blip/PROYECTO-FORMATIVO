export default function TablaBirdBatch() {
  return (
    <div className="p-4 bg-white rounded-lg shadow border border-border overflow-x-auto">

      <table className="w-full border-collapse">

        <thead>
          <tr className="bg-green-2-navbar text-white">

            <th className="border border-border px-4 py-2 text-left">
              Batch Number
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Entry Date
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Bird Quantity
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Batch Weight
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Age Weeks
            </th>

          </tr>
        </thead>

        <tbody>

          <tr className="hover:bg-fond transition-colors">

            <td className="border border-border px-4 py-2 text-title">
              L001
            </td>

            <td className="border border-border px-4 py-2 text-title">
              2025-01-01
            </td>

            <td className="border border-border px-4 py-2 text-title">
              500
            </td>

            <td className="border border-border px-4 py-2 text-title">
              850
            </td>

            <td className="border border-border px-4 py-2 text-title">
              20
            </td>

          </tr>

          <tr className="hover:bg-fond transition-colors">

            <td className="border border-border px-4 py-2 text-title">
              L002
            </td>

            <td className="border border-border px-4 py-2 text-title">
              2025-02-01
            </td>

            <td className="border border-border px-4 py-2 text-title">
              450
            </td>

            <td className="border border-border px-4 py-2 text-title">
              700
            </td>

            <td className="border border-border px-4 py-2 text-title">
              18
            </td>

          </tr>

          <tr className="hover:bg-fond transition-colors">

            <td className="border border-border px-4 py-2 text-title">
              L003
            </td>

            <td className="border border-border px-4 py-2 text-title">
              2025-03-01
            </td>

            <td className="border border-border px-4 py-2 text-title">
              600
            </td>

            <td className="border border-border px-4 py-2 text-title">
              950
            </td>

            <td className="border border-border px-4 py-2 text-title">
              22
            </td>

          </tr>

        </tbody>

      </table>

    </div>
  );
}