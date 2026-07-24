export default function TablaHealth() {
  return (
    <div className="p-4 bg-white rounded-lg shadow border border-border overflow-x-auto">

      <table className="w-full border-collapse">

        <thead>
          <tr className="bg-green-2-navbar text-white">

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

          <tr className="hover:bg-fond transition-colors">

            <td className="border border-border px-4 py-2 text-title">
              2025-05-01
            </td>

            <td className="border border-border px-4 py-2 text-title">
              L001
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Tos
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Gripe Aviar
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Antibiótico
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Juan Pérez
            </td>

            <td className="border border-border px-4 py-2 text-title">
              2025-05-10
            </td>

          </tr>

          <tr className="hover:bg-fond transition-colors">

            <td className="border border-border px-4 py-2 text-title">
              2025-05-15
            </td>

            <td className="border border-border px-4 py-2 text-title">
              L002
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Diarrea
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Salmonelosis
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Tratamiento Oral
            </td>

            <td className="border border-border px-4 py-2 text-title">
              María López
            </td>

            <td className="border border-border px-4 py-2 text-title">
              2025-05-22
            </td>

          </tr>

          <tr className="hover:bg-fond transition-colors">

            <td className="border border-border px-4 py-2 text-title">
              2025-06-01
            </td>

            <td className="border border-border px-4 py-2 text-title">
              L003
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Fiebre
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Infección Respiratoria
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Vacunación
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Carlos Ruiz
            </td>

            <td className="border border-border px-4 py-2 text-title">
              2025-06-08
            </td>

          </tr>

        </tbody>

      </table>

    </div>
  );
}