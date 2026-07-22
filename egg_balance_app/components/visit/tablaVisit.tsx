export default function TablaVisit() {
  return (
    <div className="p-4 bg-white rounded-lg shadow overflow-x-auto">

      <table className="w-full border-collapse">

        <thead>
          <tr className="bg-table-header-1 text-white">

            <th className="border border-border px-4 py-2 text-left">
              Fecha
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Visitante
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Institución
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Motivo
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Responsable
            </th>

          </tr>
        </thead>

        <tbody>

          <tr className="hover:bg-fond transition">

            <td className="border border-border px-4 py-2">
              2025-05-10
            </td>

            <td className="border border-border px-4 py-2">
              Pedro Gómez
            </td>

            <td className="border border-border px-4 py-2">
              SENA
            </td>

            <td className="border border-border px-4 py-2">
              Visita Académica
            </td>

            <td className="border border-border px-4 py-2">
              Juan Pérez
            </td>

          </tr>

          <tr className="hover:bg-fond transition">

            <td className="border border-border px-4 py-2">
              2025-05-20
            </td>

            <td className="border border-border px-4 py-2">
              Laura Díaz
            </td>

            <td className="border border-border px-4 py-2">
              Universidad del Cauca
            </td>

            <td className="border border-border px-4 py-2">
              Investigación
            </td>

            <td className="border border-border px-4 py-2">
              María López
            </td>

          </tr>

          <tr className="hover:bg-fond transition">

            <td className="border border-border px-4 py-2">
              2025-06-01
            </td>

            <td className="border border-border px-4 py-2">
              Andrés Ruiz
            </td>

            <td className="border border-border px-4 py-2">
              ICA
            </td>

            <td className="border border-border px-4 py-2">
              Inspección
            </td>

            <td className="border border-border px-4 py-2">
              Carlos Ruiz
            </td>

          </tr>

        </tbody>

      </table>

    </div>
  );
}