import Link from "next/link";

export default function Footer() {
  const sections = [
    {
      title: "Navegación",
      links: [
        { label: "Inicio", href: "/" },
        { label: "Productos", href: "/productos" },
        { label: "Nosotros", href: "/nosotros" },
        { label: "Contacto", href: "/contacto" },
        { label: "Dashboard", href: "/dashboard/birdBatch" },
      ],
    },
    {
      title: "Soporte",
      links: [
        { label: "Centro de Ayuda", href: "/contacto" },
        { label: "Términos y Privacidad", href: "/nosotros" },
        { label: "Documentación SENA", href: "https://www.sena.edu.co", external: true },
        { label: "Contáctanos", href: "/contacto" },
      ],
    },
    {
      title: "Síguenos",
      links: [
        { label: "Facebook SENA", href: "https://www.facebook.com/SENAComunica", external: true },
        { label: "Instagram SENA", href: "https://www.instagram.com/senacomunica", external: true },
        { label: "YouTube SENA", href: "https://www.youtube.com/user/SENATV", external: true },
        { label: "LinkedIn SENA", href: "https://www.linkedin.com/school/servicio-nacional-de-aprendizaje-sena-/", external: true },
      ],
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-[#EFF5F1] to-[#E3EDE6] border-t border-[#D5E2D8]">
      <div className="max-w-7xl mx-auto px-8 lg:px-16 py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Logo y descripción */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block">
              <img
                src="/logo.png"
                alt="EggBalanceAPP"
                className="w-20 object-contain hover:opacity-90 transition-opacity"
              />
            </Link>

            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-green-1-navbar">
              EggBalanceAPP
            </h2>

            <p className="mt-4 text-parrafo leading-7 max-w-md text-sm md:text-base">
              Gestiona la información de tus aves y controla la producción de
              huevos mediante una plataforma moderna, intuitiva y diseñada para
              el sector avícola.
            </p>
          </div>

          {/* Enlaces de navegación */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              {sections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-base font-bold uppercase tracking-wider text-[#735A3D] mb-5">
                    {section.title}
                  </h3>

                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        {link.external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-green-1-navbar hover:text-green-700 hover:translate-x-1 inline-block transition-transform duration-150"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="text-sm font-medium text-green-1-navbar hover:text-green-700 hover:translate-x-1 inline-block transition-transform duration-150"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Créditos y copyright */}
        <div className="border-t border-[#D5E2D8] mt-12 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-parrafo text-xs md:text-sm">
              © 2026 EggBalanceAPP. Todos los derechos reservados.
            </p>

            <p className="text-parrafo text-xs md:text-sm font-medium">
              Centro Agropecuario La Granja • SENA Regional Tolima
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}