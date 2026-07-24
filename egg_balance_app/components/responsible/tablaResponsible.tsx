export default function TablaResponsible() {
  return (
    <div className="p-4 bg-white rounded-lg shadow border border-border overflow-x-auto">

      <table className="w-full border-collapse">

        <thead>
          <tr className="bg-green-2-navbar text-white">

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

          <tr className="hover:bg-fond transition-colors">

            <td className="border border-border px-4 py-2 text-title">
              Juan Pérez
            </td>

            <td className="border border-border px-4 py-2 text-title">
              123456
            </td>

            <td className="border border-border px-4 py-2 text-title">
              3285039
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Instructor
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Instructor
            </td>

          </tr>

          <tr className="hover:bg-fond transition-colors">

            <td className="border border-border px-4 py-2 text-title">
              María López
            </td>

            <td className="border border-border px-4 py-2 text-title">
              654321
            </td>

            <td className="border border-border px-4 py-2 text-title">
              3285039
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Aprendiz
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Aprendiz
            </td>

          </tr>

          <tr className="hover:bg-fond transition-colors">

            <td className="border border-border px-4 py-2 text-title">
              Carlos Ruiz
            </td>

            <td className="border border-border px-4 py-2 text-title">
              789456
            </td>

            <td className="border border-border px-4 py-2 text-title">
              3285039
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Gestor
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Gestor
            </td>

          </tr>

        </tbody>

      </table>

    </div>
  );
}