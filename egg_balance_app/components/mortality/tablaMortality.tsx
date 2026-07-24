export default function TablaMortality() {
  return (
    <div className="p-4 bg-white rounded-lg shadow border border-border overflow-x-auto">

      <table className="w-full border-collapse">

        <thead>
          <tr className="bg-green-2-navbar text-white">

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

          <tr className="hover:bg-fond transition-colors">

            <td className="border border-border px-4 py-2 text-title">
              2025-05-01
            </td>

            <td className="border border-border px-4 py-2 text-title">
              08:00
            </td>

            <td className="border border-border px-4 py-2 text-title">
              2
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Enfermedad
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Sí
            </td>

          </tr>

          <tr className="hover:bg-fond transition-colors">

            <td className="border border-border px-4 py-2 text-title">
              2025-05-02
            </td>

            <td className="border border-border px-4 py-2 text-title">
              09:00
            </td>

            <td className="border border-border px-4 py-2 text-title">
              1
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Estrés
            </td>

            <td className="border border-border px-4 py-2 text-title">
              No
            </td>

          </tr>

          <tr className="hover:bg-fond transition-colors">

            <td className="border border-border px-4 py-2 text-title">
              2025-05-03
            </td>

            <td className="border border-border px-4 py-2 text-title">
              07:30
            </td>

            <td className="border border-border px-4 py-2 text-title">
              3
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Infección
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Sí
            </td>

          </tr>

        </tbody>

      </table>

    </div>
  );
}