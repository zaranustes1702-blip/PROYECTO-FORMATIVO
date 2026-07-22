export default function TablaWeighing() {
  return (
    <div className="p-4 bg-white rounded-lg shadow overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#1E4D2B] text-white">
            <th className="border border-[#D8CDB8] px-4 py-2 text-left">
              ID Pesaje
            </th>
            <th className="border border-[#D8CDB8] px-4 py-2 text-left">
              Fecha
            </th>
            <th className="border border-[#D8CDB8] px-4 py-2 text-left">
              Hora
            </th>
            <th className="border border-[#D8CDB8] px-4 py-2 text-left">
              Responsable
            </th>
            <th className="border border-[#D8CDB8] px-4 py-2 text-left">
              Gallina Pesada
            </th>
            <th className="border border-[#D8CDB8] px-4 py-2 text-left">
              Peso Total (Kg)
            </th>
            <th className="border border-[#D8CDB8] px-4 py-2 text-left">
              Peso Promedio (g)
            </th>
            <th className="border border-[#D8CDB8] px-4 py-2 text-left">
              Uniformidad (%)
            </th>
          </tr>
        </thead>

        <tbody>
          <tr className="hover:bg-[#F2E9D4]">
            <td className="border border-[#D8CDB8] px-4 py-2">P001</td>
            <td className="border border-[#D8CDB8] px-4 py-2">2025-05-01</td>
            <td className="border border-[#D8CDB8] px-4 py-2">08:00</td>
            <td className="border border-[#D8CDB8] px-4 py-2">
              Juan Pérez
            </td>
            <td className="border border-[#D8CDB8] px-4 py-2">
              Gallina 001
            </td>
            <td className="border border-[#D8CDB8] px-4 py-2">1.95</td>
            <td className="border border-[#D8CDB8] px-4 py-2">1950</td>
            <td className="border border-[#D8CDB8] px-4 py-2">92%</td>
          </tr>

          <tr className="hover:bg-[#F2E9D4]">
            <td className="border border-[#D8CDB8] px-4 py-2">P002</td>
            <td className="border border-[#D8CDB8] px-4 py-2">2025-05-08</td>
            <td className="border border-[#D8CDB8] px-4 py-2">09:00</td>
            <td className="border border-[#D8CDB8] px-4 py-2">
              María López
            </td>
            <td className="border border-[#D8CDB8] px-4 py-2">
              Gallina 002
            </td>
            <td className="border border-[#D8CDB8] px-4 py-2">2.01</td>
            <td className="border border-[#D8CDB8] px-4 py-2">2010</td>
            <td className="border border-[#D8CDB8] px-4 py-2">94%</td>
          </tr>

          <tr className="hover:bg-[#F2E9D4]">
            <td className="border border-[#D8CDB8] px-4 py-2">P003</td>
            <td className="border border-[#D8CDB8] px-4 py-2">2025-05-15</td>
            <td className="border border-[#D8CDB8] px-4 py-2">07:30</td>
            <td className="border border-[#D8CDB8] px-4 py-2">
              Carlos Ruiz
            </td>
            <td className="border border-[#D8CDB8] px-4 py-2">
              Gallina 003
            </td>
            <td className="border border-[#D8CDB8] px-4 py-2">1.89</td>
            <td className="border border-[#D8CDB8] px-4 py-2">1890</td>
            <td className="border border-[#D8CDB8] px-4 py-2">89%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}