import Link from "next/link";

export default function Footer() {
  const sections = [
    {
      title: "Navegación",
      links: [
        { label: "Inicio", href: "/" },
        { label: "Nosotros", href: "/about" },
        { label: "Contacto", href: "/contact" },
      ],
    },
    {
      title: "Soporte",
      links: [
        { label: "Centro de Ayuda", href: "/contact" },
        { label: "Documentación SENA", href: "https://www.sena.edu.co", external: true },
        { label: "Contáctanos", href: "/contact" },
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
    <footer className="bg-[#F0F7F1] border-t border-[#C8DFC D]">
      <div className="max-w-7xl mx-auto px-8 lg:px-16 py-14">
        <div className="grid lg:grid-cols-12 gap-12">

          {/* Logo y descripción */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block">
              <img
                src="/logo.png"
                alt="EggBalanceAPP"
                className="w-16 object-contain hover:opacity-80 transition-opacity"
              />
            </Link>

            <h2 className="mt-3 text-xl font-bold text-green-1-navbar">
              EggBalanceAPP
            </h2>

            <p className="mt-3 text-[#5A7A60] leading-7 max-w-md text-sm">
              Gestiona la información de tus aves y controla la producción de
              huevos mediante una plataforma moderna, intuitiva y diseñada para
              el sector avícola.
            </p>

            {/* Info de contacto */}
            <div className="mt-5 space-y-1.5">
              <p className="text-sm text-[#5A7A60] flex items-center gap-2">
                <span>📞</span> 3173587877
              </p>
              <p className="text-sm text-[#5A7A60] flex items-center gap-2">
                <span>✉️</span> eggbalance857@gmail.com
              </p>
            </div>
          </div>

          {/* Enlaces */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              {sections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#7A9E80] mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        {link.external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[#4A6E50] hover:text-green-1-navbar hover:translate-x-1 inline-block transition-all duration-150"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="text-sm text-[#4A6E50] hover:text-green-1-navbar hover:translate-x-1 inline-block transition-all duration-150"
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

        {/* Divisor y copyright */}
        <div className="border-t border-[#C8DFC0] mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-[#7A9E80] text-xs">
              © 2026 EggBalanceAPP. Todos los derechos reservados.
            </p>
            <p className="text-[#7A9E80] text-xs font-medium">
              Centro Agropecuario La Granja • SENA Regional Tolima
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}