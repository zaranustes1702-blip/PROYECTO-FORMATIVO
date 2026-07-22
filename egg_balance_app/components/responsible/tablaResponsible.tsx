export default function TablaResponsible() {
  return (
    <div className="p-4 bg-white rounded-lg shadow overflow-x-auto">

      <table className="w-full border-collapse">

        <thead>
          <tr className="bg-table-header-1 text-white">

            <th className="border border-border px-4 py-2 text-left">
              Nombre
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Documento
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Ficha
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Rol
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Tipo
            </th>

          </tr>
        </thead>

        <tbody>

          <tr className="hover:bg-fond transition">

            <td className="border border-border px-4 py-2">
              Juan Pérez
            </td>

            <td className="border border-border px-4 py-2">
              123456
            </td>

            <td className="border border-border px-4 py-2">
              3285039
            </td>

            <td className="border border-border px-4 py-2">
              Instructor
            </td>

            <td className="border border-border px-4 py-2">
              Instructor
            </td>

          </tr>

          <tr className="hover:bg-fond transition">

            <td className="border border-border px-4 py-2">
              María López
            </td>

            <td className="border border-border px-4 py-2">
              654321
            </td>

            <td className="border border-border px-4 py-2">
              3285039
            </td>

            <td className="border border-border px-4 py-2">
              Aprendiz
            </td>

            <td className="border border-border px-4 py-2">
              Aprendiz
            </td>

          </tr>

          <tr className="hover:bg-fond transition">

            <td className="border border-border px-4 py-2">
              Carlos Ruiz
            </td>

            <td className="border border-border px-4 py-2">
              789456
            </td>

            <td className="border border-border px-4 py-2">
              3285039
            </td>

            <td className="border border-border px-4 py-2">
              Gestor
            </td>

            <td className="border border-border px-4 py-2">
              Gestor
            </td>

          </tr>

        </tbody>

      </table>

    </div>
  );
}