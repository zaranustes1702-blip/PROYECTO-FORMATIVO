export default function TablaBarn() {
  return (
    <div className="p-4 bg-white rounded-lg shadow border border-border overflow-x-auto">

      <table className="w-full border-collapse">

        <thead>
          <tr className="bg-green-2-navbar text-white">

            <th className="border border-border px-4 py-2 text-left">
              Nombre
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Tamaño
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Capacidad
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Raza de Ave
            </th>

          </tr>
        </thead>

        <tbody>

          <tr className="hover:bg-fond transition-colors">

            <td className="border border-border px-4 py-2 text-title">
              Galpón 1
            </td>

            <td className="border border-border px-4 py-2 text-title">
              500
            </td>

            <td className="border border-border px-4 py-2 text-title">
              1000
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Isa Brown
            </td>

          </tr>

          <tr className="hover:bg-fond transition-colors">

            <td className="border border-border px-4 py-2 text-title">
              Galpón 2
            </td>

            <td className="border border-border px-4 py-2 text-title">
              700
            </td>

            <td className="border border-border px-4 py-2 text-title">
              1500
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Lohmann Brown
            </td>

          </tr>

          <tr className="hover:bg-fond transition-colors">

            <td className="border border-border px-4 py-2 text-title">
              Galpón 3
            </td>

            <td className="border border-border px-4 py-2 text-title">
              600
            </td>

            <td className="border border-border px-4 py-2 text-title">
              1200
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Hy-Line
            </td>

          </tr>

        </tbody>

      </table>

    </div>
  );
}