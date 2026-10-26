"use client";

import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Code2, Database, BarChart3, Mail, Phone, MapPin, Layers } from "lucide-react";

const NavBar = dynamic(() => import("@/components/NavBar"), { ssr: false });

const team = [
  {
    name: "Zara Ñustes",
    role: "Aprendiz ADSO",
    email: "eggbalance857@gmail.com",
    phone: "3173587877",
    address: "Espinal, Tolima",
    image: "/team/zara.jpeg",
    gradient: "from-emerald-500 to-green-700",
    quote: "Comprometida en diseñar experiencias claras y eficientes para optimizar cada proceso en la granja.",
  },
  {
    name: "Andres Ñustes",
    role: "Aprendiz ADSO",
    email: "andres@correo.com",
    phone: "3000000000",
    address: "Espinal, Tolima",
    image: "/team/andres.jpeg",
    gradient: "from-teal-500 to-emerald-700",
    quote: "Enfocado en estructurar servicios y datos confiables para el control avícola en tiempo real.",
  },
  {
    name: "Santiago Ñustes",
    role: "Aprendiz ADSO",
    email: "santiago@correo.com",
    phone: "3000000000",
    address: "Espinal, Tolima",
    image: "/team/santi.jpeg",
    gradient: "from-green-600 to-teal-700",
    quote: "Dedicado a asegurar la calidad, el soporte y la confiabilidad operativa del aplicativo.",
  },
];

const techs = [
  { icon: <Code2 className="w-5 h-5" />, label: "Next.js",    color: "bg-black text-white" },
  { icon: <Code2 className="w-5 h-5" />, label: "Node.js",    color: "bg-green-700 text-white" },
  { icon: <Database className="w-5 h-5" />, label: "MySQL",   color: "bg-blue-600 text-white" },
  { icon: <BarChart3 className="w-5 h-5" />, label: "Tailwind", color: "bg-sky-500 text-white" },
  { icon: <Layers className="w-5 h-5" />, label: "Sequelize", color: "bg-indigo-600 text-white" },
];

export default function About() {
  const [flipped, setFlipped] = useState<number | null>(null);

  return (
    <>
      <NavBar />

      <main className="min-h-screen bg-gradient-to-b from-[#EFF5F1] via-[#F2F5F3] to-[#E9F0EB]">

        {/* HERO */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-green-200/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <span className="inline-block px-6 py-2 rounded-full bg-green-1-navbar text-white text-sm font-semibold shadow-md">
              EggBalanceAPP
            </span>
            <h1 className="mt-6 text-4xl md:text-6xl font-bold text-title leading-tight">
              Conoce a nuestro{" "}
              <span className="text-green-1-navbar">equipo</span>
            </h1>
            <p className="mt-5 text-lg text-parrafo max-w-2xl mx-auto leading-8">
              Somos aprendices ADSO del SENA, comprometidos con el desarrollo
              de soluciones tecnológicas para el sector avícola.
            </p>
            <p className="mt-3 text-sm text-parrafo/50">
              Pasa el cursor sobre las tarjetas ↻
            </p>
          </div>
        </section>

        {/* TARJETAS FLIP */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {team.map((member, i) => (
              <div
                key={i}
                className="h-[380px] cursor-pointer"
                style={{ perspective: "1200px" }}
                onMouseEnter={() => setFlipped(i)}
                onMouseLeave={() => setFlipped(null)}
                onClick={() => setFlipped(flipped === i ? null : i)}
              >
                <div
                  className="relative w-full h-full transition-transform duration-700"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: flipped === i ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* ── FRENTE ── */}
                  <div
                    className="absolute inset-0 rounded-3xl shadow-lg overflow-hidden bg-white border border-border"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className={`h-24 bg-gradient-to-r ${member.gradient} relative flex items-end justify-center`}>
                      <div className="absolute -bottom-9 w-18 h-18">
                        <div className="rounded-full border-4 border-white shadow-md overflow-hidden bg-white w-[72px] h-[72px]">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-14 pb-6 px-7 text-center">
                      <h2 className="text-lg font-bold text-title">{member.name}</h2>
                      <p className="text-xs font-semibold text-green-1-navbar mt-1 uppercase tracking-wide">{member.role}</p>

                      <div className="mt-5 space-y-2.5 text-left">
                        <div className="flex items-center gap-3 text-sm text-parrafo">
                          <Mail className="w-3.5 h-3.5 text-green-1-navbar shrink-0" />
                          <span className="truncate text-xs">{member.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-parrafo">
                          <Phone className="w-3.5 h-3.5 text-green-1-navbar shrink-0" />
                          <span className="text-xs">{member.phone}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-parrafo">
                          <MapPin className="w-3.5 h-3.5 text-green-1-navbar shrink-0" />
                          <span className="text-xs">{member.address}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ── REVERSO — Muchísimo más sutil ── */}
                  <div
                    className="absolute inset-0 rounded-3xl shadow-lg overflow-hidden bg-white border border-border p-8 flex flex-col justify-between text-center"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    {/* Indicador sutil */}
                    <div className="flex justify-center">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0F7F1] text-green-1-navbar text-xs font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-1-navbar"></span>
                        ADSO · SENA
                      </span>
                    </div>

                    {/* Mensaje limpio y sutil */}
                    <div className="my-auto px-2">
                      <p className="text-sm md:text-base text-title font-medium leading-relaxed italic">
                        "{member.quote}"
                      </p>
                    </div>

                    {/* Pie sutil */}
                    <div className="border-t border-[#E8EFE9] pt-4">
                      <p className="text-xs text-parrafo font-medium">
                        Centro Agropecuario La Granja
                      </p>
                      <p className="text-[11px] text-parrafo/60 mt-0.5">
                        Espinal, Tolima
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TECNOLOGÍAS */}
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <div className="bg-white rounded-3xl shadow-xl border border-border p-10">
            <h2 className="text-2xl font-bold text-title text-center mb-8">
              Tecnologías utilizadas
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {techs.map((t) => (
                <div
                  key={t.label}
                  className={`${t.color} rounded-2xl px-5 py-3 flex items-center gap-2 shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-200`}
                >
                  {t.icon}
                  <span className="font-semibold text-sm">{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
