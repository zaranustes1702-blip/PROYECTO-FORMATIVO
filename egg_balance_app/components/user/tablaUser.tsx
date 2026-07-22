export default function TablaUser() {
  return (
    <div className="p-4 bg-white rounded-lg shadow overflow-x-auto">

      <table className="w-full border-collapse">

        <thead>
          <tr className="bg-table-header-1 text-white">

            <th className="border border-border px-4 py-2 text-left">
              Nombre Completo
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Nombre de Usuario
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Correo
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Rol
            </th>

          </tr>
        </thead>

        <tbody>

          <tr className="hover:bg-fond transition">

            <td className="border border-border px-4 py-2">
              Juan Pérez
            </td>

            <td className="border border-border px-4 py-2">
              jperez
            </td>

            <td className="border border-border px-4 py-2">
              juan@gmail.com
            </td>

            <td className="border border-border px-4 py-2">
              Administrador
            </td>

          </tr>

          <tr className="hover:bg-fond transition">

            <td className="border border-border px-4 py-2">
              María López
            </td>

            <td className="border border-border px-4 py-2">
              mlopez
            </td>

            <td className="border border-border px-4 py-2">
              maria@gmail.com
            </td>

            <td className="border border-border px-4 py-2">
              Instructor
            </td>

          </tr>

          <tr className="hover:bg-fond transition">

            <td className="border border-border px-4 py-2">
              Carlos Ruiz
            </td>

            <td className="border border-border px-4 py-2">
              cruiz
            </td>

            <td className="border border-border px-4 py-2">
              carlos@gmail.com
            </td>

            <td className="border border-border px-4 py-2">
              Aprendiz
            </td>

          </tr>

        </tbody>

      </table>

    </div>
  );
}