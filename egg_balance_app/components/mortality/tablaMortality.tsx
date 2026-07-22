export default function TablaMortality() {
  return (
    <div className="p-4 bg-white rounded-lg shadow overflow-x-auto">

      <table className="w-full border-collapse">

        <thead>
          <tr className="bg-table-header-1 text-white">

            <th className="border border-border px-4 py-2 text-left">
              Fecha
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Hora
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Mortalidad del Día
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Causa
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Necropsia
            </th>

          </tr>
        </thead>

        <tbody>

          <tr className="hover:bg-fond transition">

            <td className="border border-border px-4 py-2">
              2025-05-01
            </td>

            <td className="border border-border px-4 py-2">
              08:00
            </td>

            <td className="border border-border px-4 py-2">
              2
            </td>

            <td className="border border-border px-4 py-2">
              Enfermedad
            </td>

            <td className="border border-border px-4 py-2">
              Sí
            </td>

          </tr>

          <tr className="hover:bg-fond transition">

            <td className="border border-border px-4 py-2">
              2025-05-02
            </td>

            <td className="border border-border px-4 py-2">
              09:00
            </td>

            <td className="border border-border px-4 py-2">
              1
            </td>

            <td className="border border-border px-4 py-2">
              Estrés
            </td>

            <td className="border border-border px-4 py-2">
              No
            </td>

          </tr>

          <tr className="hover:bg-fond transition">

            <td className="border border-border px-4 py-2">
              2025-05-03
            </td>

            <td className="border border-border px-4 py-2">
              07:30
            </td>

            <td className="border border-border px-4 py-2">
              3
            </td>

            <td className="border border-border px-4 py-2">
              Infección
            </td>

            <td className="border border-border px-4 py-2">
              Sí
            </td>

          </tr>

        </tbody>

      </table>

    </div>
  );
}