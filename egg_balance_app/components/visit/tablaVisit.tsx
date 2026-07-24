export default function TablaVisit() {
  return (
    <div className="p-4 bg-white rounded-lg shadow border border-border overflow-x-auto">

      <table className="w-full border-collapse">

        <thead>
          <tr className="bg-green-2-navbar text-white">

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

          <tr className="hover:bg-fond transition-colors">

            <td className="border border-border px-4 py-2 text-title">
              2025-05-10
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Pedro Gómez
            </td>

            <td className="border border-border px-4 py-2 text-title">
              SENA
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Visita Académica
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Juan Pérez
            </td>

          </tr>

          <tr className="hover:bg-fond transition-colors">

            <td className="border border-border px-4 py-2 text-title">
              2025-05-20
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Laura Díaz
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Universidad del Cauca
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Investigación
            </td>

            <td className="border border-border px-4 py-2 text-title">
              María López
            </td>

          </tr>

          <tr className="hover:bg-fond transition-colors">

            <td className="border border-border px-4 py-2 text-title">
              2025-06-01
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Andrés Ruiz
            </td>

            <td className="border border-border px-4 py-2 text-title">
              ICA
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Inspección
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Carlos Ruiz
            </td>

          </tr>

        </tbody>

      </table>

    </div>
  );
}