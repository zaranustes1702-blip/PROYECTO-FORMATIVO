export default function TablaQuarantine() {
  return (
    <div className="p-4 bg-white rounded-lg shadow border border-border overflow-x-auto">

      <table className="w-full border-collapse">

        <thead>
          <tr className="bg-green-2-navbar text-white">

            <th className="border border-border px-4 py-2 text-left">
              Fecha
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Aves Afectadas
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
              Dosis
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Fecha de Finalización
            </th>

          </tr>
        </thead>

        <tbody>

          <tr className="hover:bg-fond transition-colors">

            <td className="border border-border px-4 py-2 text-title">
              2025-05-01
            </td>

            <td className="border border-border px-4 py-2 text-title">
              15
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
              10 ml
            </td>

            <td className="border border-border px-4 py-2 text-title">
              2025-05-10
            </td>

          </tr>

          <tr className="hover:bg-fond transition-colors">

            <td className="border border-border px-4 py-2 text-title">
              2025-05-20
            </td>

            <td className="border border-border px-4 py-2 text-title">
              10
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
              5 ml
            </td>

            <td className="border border-border px-4 py-2 text-title">
              2025-05-28
            </td>

          </tr>

          <tr className="hover:bg-fond transition-colors">

            <td className="border border-border px-4 py-2 text-title">
              2025-06-05
            </td>

            <td className="border border-border px-4 py-2 text-title">
              8
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
              1 dosis
            </td>

            <td className="border border-border px-4 py-2 text-title">
              2025-06-12
            </td>

          </tr>

        </tbody>

      </table>

    </div>
  );
}