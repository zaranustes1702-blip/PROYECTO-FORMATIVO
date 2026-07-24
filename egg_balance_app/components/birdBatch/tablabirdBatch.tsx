export default function TablaBirdBatch() {
    return (
        <div className="p-6 bg-white rounded-lg shadow border border-border overflow-x-auto">

            <table className="w-full border-collapse">

                <thead>
                    <tr className="bg-green-2-navbar text-white">

                        <th className="border border-border px-4 py-3 text-left">
                            Número de Lote
                        </th>

                        <th className="border border-border px-4 py-3 text-left">
                            Fecha de Ingreso
                        </th>

                        <th className="border border-border px-4 py-3 text-left">
                            Fecha de Finalización
                        </th>

                        <th className="border border-border px-4 py-3 text-left">
                            Cantidad de Aves
                        </th>

                        <th className="border border-border px-4 py-3 text-left">
                            Peso del Lote (Kg)
                        </th>

                        <th className="border border-border px-4 py-3 text-left">
                            Edad (Semanas)
                        </th>

                        <th className="border border-border px-4 py-3 text-left">
                            Vacunas Aplicadas
                        </th>

                    </tr>
                </thead>

                <tbody>

                    <tr className="hover:bg-fond transition-colors">

                        <td className="border border-border px-4 py-3 text-title">
                            L001
                        </td>

                        <td className="border border-border px-4 py-3 text-title">
                            2025-01-01
                        </td>

                        <td className="border border-border px-4 py-3 text-title">
                            2026-01-01
                        </td>

                        <td className="border border-border px-4 py-3 text-title">
                            192
                        </td>

                        <td className="border border-border px-4 py-3 text-title">
                            384.50
                        </td>

                        <td className="border border-border px-4 py-3 text-title">
                            20
                        </td>

                        <td className="border border-border px-4 py-3 text-title">
                            Newcastle
                        </td>

                    </tr>

                    <tr className="hover:bg-fond transition-colors">

                        <td className="border border-border px-4 py-3 text-title">
                            L002
                        </td>

                        <td className="border border-border px-4 py-3 text-title">
                            2025-02-01
                        </td>

                        <td className="border border-border px-4 py-3 text-title">
                            2026-02-01
                        </td>

                        <td className="border border-border px-4 py-3 text-title">
                            180
                        </td>

                        <td className="border border-border px-4 py-3 text-title">
                            360.20
                        </td>

                        <td className="border border-border px-4 py-3 text-title">
                            18
                        </td>

                        <td className="border border-border px-4 py-3 text-title">
                            Bronquitis
                        </td>

                    </tr>

                    <tr className="hover:bg-fond transition-colors">

                        <td className="border border-border px-4 py-3 text-title">
                            L003
                        </td>

                        <td className="border border-border px-4 py-3 text-title">
                            2025-03-01
                        </td>

                        <td className="border border-border px-4 py-3 text-title">
                            2026-03-01
                        </td>

                        <td className="border border-border px-4 py-3 text-title">
                            200
                        </td>

                        <td className="border border-border px-4 py-3 text-title">
                            410.00
                        </td>

                        <td className="border border-border px-4 py-3 text-title">
                            22
                        </td>

                        <td className="border border-border px-4 py-3 text-title">
                            Newcastle, Viruela
                        </td>

                    </tr>

                </tbody>

            </table>

        </div>
    );
}