export default function TablaUser() {
  return (
    <div className="p-4 bg-white rounded-lg shadow border border-border overflow-x-auto">

      <table className="w-full border-collapse">

        <thead>
          <tr className="bg-green-2-navbar text-white">

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

          <tr className="hover:bg-fond transition-colors">

            <td className="border border-border px-4 py-2 text-title">
              Juan Pérez
            </td>

            <td className="border border-border px-4 py-2 text-title">
              jperez
            </td>

            <td className="border border-border px-4 py-2 text-title">
              juan@gmail.com
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Administrador
            </td>

          </tr>

          <tr className="hover:bg-fond transition-colors">

            <td className="border border-border px-4 py-2 text-title">
              María López
            </td>

            <td className="border border-border px-4 py-2 text-title">
              mlopez
            </td>

            <td className="border border-border px-4 py-2 text-title">
              maria@gmail.com
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Instructor
            </td>

          </tr>

          <tr className="hover:bg-fond transition-colors">

            <td className="border border-border px-4 py-2 text-title">
              Carlos Ruiz
            </td>

            <td className="border border-border px-4 py-2 text-title">
              cruiz
            </td>

            <td className="border border-border px-4 py-2 text-title">
              carlos@gmail.com
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Aprendiz
            </td>

          </tr>

        </tbody>

      </table>

    </div>
  );
}