export default function TablaHealth() {
  return (
    <div className="p-4 bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full border-collapse">

        <thead>
          <tr className="bg-table-header-1 text-white">

            <th className="border border-border px-4 py-2 text-left">
              Fecha de Detección
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Lote Afectado
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Síntomas
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Diagnóstico
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Tratamiento
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Responsable
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Fecha de Recuperación
            </th>

          </tr>
        </thead>

        <tbody>

          <tr className="hover:bg-fond transition">
            <td className="border border-border px-4 py-2">
              2025-05-01
            </td>

            <td className="border border-border px-4 py-2">
              L001
            </td>

            <td className="border border-border px-4 py-2">
              Tos
            </td>

            <td className="border border-border px-4 py-2">
              Gripe Aviar
            </td>

            <td className="border border-border px-4 py-2">
              Antibiótico
            </td>

            <td className="border border-border px-4 py-2">
              Juan Pérez
            </td>

            <td className="border border-border px-4 py-2">
              2025-05-10
            </td>
          </tr>

          <tr className="hover:bg-fond transition">
            <td className="border border-border px-4 py-2">
              2025-05-15
            </td>

            <td className="border border-border px-4 py-2">
              L002
            </td>

            <td className="border border-border px-4 py-2">
              Diarrea
            </td>

            <td className="border border-border px-4 py-2">
              Salmonelosis
            </td>

            <td className="border border-border px-4 py-2">
              Tratamiento Oral
            </td>

            <td className="border border-border px-4 py-2">
              María López
            </td>

            <td className="border border-border px-4 py-2">
              2025-05-22
            </td>
          </tr>

          <tr className="hover:bg-fond transition">
            <td className="border border-border px-4 py-2">
              2025-06-01
            </td>

            <td className="border border-border px-4 py-2">
              L003
            </td>

            <td className="border border-border px-4 py-2">
              Fiebre
            </td>

            <td className="border border-border px-4 py-2">
              Infección Respiratoria
            </td>

            <td className="border border-border px-4 py-2">
              Vacunación
            </td>

            <td className="border border-border px-4 py-2">
              Carlos Ruiz
            </td>

            <td className="border border-border px-4 py-2">
              2025-06-08
            </td>
          </tr>

        </tbody>

      </table>
    </div>
  );
}