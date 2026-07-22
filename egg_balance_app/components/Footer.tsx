export default function Footer() {
    const sections = [
        {
            title: "Navegación",
            links: ["Inicio", "Productos", "Nosotros", "Contacto", "FAQs"],
        },
        {
            title: "Soporte",
            links: [
                "Centro de Ayuda",
                "Política de Privacidad",
                "Métodos de Pago",
                "Seguimiento",
                "Contáctanos",
            ],
        },
        {
            title: "Síguenos",
            links: ["Instagram", "Facebook", "YouTube", "LinkedIn"],
        },
    ];

    return (
        <footer className="bg-fond border-t border-border">

            <div className="max-w-7xl mx-auto px-8 lg:px-16 py-20">

                <div className="grid lg:grid-cols-12 gap-12">

                    {/* Logo */}
                    <div className="lg:col-span-5">

                        <img
                            src="/logo.png"
                            alt="EggBalanceAPP"
                            className="w-24"
                        />

                        <h2 className="mt-5 text-3xl font-bold text-green-1-navbar">
                            EggBalanceAPP
                        </h2>

                        <p className="mt-6 text-parrafo leading-8 max-w-md">
                            Gestiona la información de tus gallinas y controla
                            la producción de huevos mediante una plataforma
                            moderna, intuitiva y diseñada para el sector
                            avícola.
                        </p>

                    </div>

                    {/* Links */}
                    <div className="lg:col-span-7">

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-10">

                            {sections.map((section) => (

                                <div key={section.title}>

                                    <h3 className="text-lg font-semibold text-yellow mb-6">
                                        {section.title}
                                    </h3>

                                    <ul className="space-y-3">

                                        {section.links.map((item) => (

                                            <li key={item}>

                                                <a
                                                    href="#"
                                                    className="text-green-1-navbar hover:text-yellow transition"
                                                >
                                                    {item}
                                                </a>

                                            </li>

                                        ))}

                                    </ul>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

                {/* Línea */}
                <div className="border-t border-border mt-16 pt-8">

                    <div className="flex flex-col md:flex-row justify-between items-center gap-3">

                        <p className="text-parrafo text-sm">
                            © 2026 EggBalanceAPP. Todos los derechos reservados.
                        </p>

                        <p className="text-parrafo text-sm">
                            Centro Agropecuario La Granja • SENA Regional Tolima
                        </p>

                    </div>

                </div>

            </div>

        </footer>
    );
}