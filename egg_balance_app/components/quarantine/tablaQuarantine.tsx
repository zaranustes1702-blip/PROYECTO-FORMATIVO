export default function TablaQuarantine() {
  return (
    <div className="p-4 bg-white rounded-lg shadow overflow-x-auto">

      <table className="w-full border-collapse">

        <thead>
          <tr className="bg-table-header-1 text-white">

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

          <tr className="hover:bg-fond transition">

            <td className="border border-border px-4 py-2">
              2025-05-01
            </td>

            <td className="border border-border px-4 py-2">
              15
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
              10 ml
            </td>

            <td className="border border-border px-4 py-2">
              2025-05-10
            </td>

          </tr>

          <tr className="hover:bg-fond transition">

            <td className="border border-border px-4 py-2">
              2025-05-20
            </td>

            <td className="border border-border px-4 py-2">
              10
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
              5 ml
            </td>

            <td className="border border-border px-4 py-2">
              2025-05-28
            </td>

          </tr>

          <tr className="hover:bg-fond transition">

            <td className="border border-border px-4 py-2">
              2025-06-05
            </td>

            <td className="border border-border px-4 py-2">
              8
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
              1 dosis
            </td>

            <td className="border border-border px-4 py-2">
              2025-06-12
            </td>

          </tr>

        </tbody>

      </table>

    </div>
  );
}