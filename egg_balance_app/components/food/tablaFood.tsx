export default function TablaFood() {
  return (
    <div className="p-4 bg-white rounded-lg shadow border border-border overflow-x-auto">

      <table className="w-full border-collapse">

        <thead>
          <tr className="bg-green-2-navbar text-white">

            <th className="border border-border px-4 py-2 text-left">
              Fecha
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Tipo de Alimento
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Nombre
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Marca
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Unidad de Medida
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Cantidad en Stock
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Valor Unitario
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Valor Total
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Fecha de Vencimiento
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Proveedor
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Ubicación
            </th>

            <th className="border border-border px-4 py-2 text-left">
              Responsable
            </th>

          </tr>
        </thead>

        <tbody>

          <tr className="hover:bg-fond transition-colors">

            <td className="border border-border px-4 py-2 text-title">
              2025-05-01
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Concentrado
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Alimento para Ponedoras
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Solla
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Kg
            </td>

            <td className="border border-border px-4 py-2 text-title">
              500
            </td>

            <td className="border border-border px-4 py-2 text-title">
              $2500
            </td>

            <td className="border border-border px-4 py-2 text-title">
              $1.250.000
            </td>

            <td className="border border-border px-4 py-2 text-title">
              2026-05-01
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Proveedor S.A.S.
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Bodega Principal
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Juan Pérez
            </td>

          </tr>

          <tr className="hover:bg-fond transition-colors">

            <td className="border border-border px-4 py-2 text-title">
              2025-05-15
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Suplemento
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Vitaminas
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Italcol
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Kg
            </td>

            <td className="border border-border px-4 py-2 text-title">
              100
            </td>

            <td className="border border-border px-4 py-2 text-title">
              $5000
            </td>

            <td className="border border-border px-4 py-2 text-title">
              $500.000
            </td>

            <td className="border border-border px-4 py-2 text-title">
              2026-05-15
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Agropecuaria S.A.S.
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Bodega 2
            </td>

            <td className="border border-border px-4 py-2 text-title">
              María López
            </td>

          </tr>

          <tr className="hover:bg-fond transition-colors">

            <td className="border border-border px-4 py-2 text-title">
              2025-06-01
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Concentrado
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Alimento Premium
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Purina
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Bulto
            </td>

            <td className="border border-border px-4 py-2 text-title">
              50
            </td>

            <td className="border border-border px-4 py-2 text-title">
              $80.000
            </td>

            <td className="border border-border px-4 py-2 text-title">
              $4.000.000
            </td>

            <td className="border border-border px-4 py-2 text-title">
              2026-06-01
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Distribuidora Avícola
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Bodega Principal
            </td>

            <td className="border border-border px-4 py-2 text-title">
              Carlos Ruiz
            </td>

          </tr>

        </tbody>

      </table>

    </div>
  );
}