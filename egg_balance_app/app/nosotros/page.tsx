"use client";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useRef, useState } from "react";
import {
  Code2,
  Database,
  BarChart3,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const team = [
  {
    name: "Zara Ñustes",
    role: "Aprendiz ADSO",
    email: "zaranustes1702@gmail.com",
    phone: "+57 317 358 7877",
    address: "Espinal, Tolima",
    image: "/team/zara.jpeg",
  },
  {
    name: "Andres Ñustes",
    role: "Aprendiz ADSO",
    email: "andres@correo.com",
    phone: "+57 300 000 0000",
    address: "Espinal, Tolima",
    image: "/team/andres.jpeg",
  },
  {
    name: "Santiago Ñustes",
    role: "Aprendiz ADSO",
    email: "santiago@correo.com",
    phone: "+57 300 000 0000",
    address: "Espinal, Tolima",
    image: "/team/santi.jpeg",
  },
];

export default function Nosotros() {
  const [visible, setVisible] = useState<number | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const bounds = divRef.current?.getBoundingClientRect();

    if (!bounds) return;

    setPosition({
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    });
  };

  return (
    <>
      <NavBar />

      <main className="min-h-screen px-6 md:px-16 lg:px-24 xl:px-32 py-20 bg-fond">

        {/* ENCABEZADO */}

        <div className="text-center mb-12">

          <span className="inline-block px-5 py-2 rounded-full bg-green-1-navbar text-white text-sm font-semibold">
            EggBalanceAPP
          </span>

          <h1 className="mt-6 text-4xl md:text-5xl font-bold text-title">
            Nuestro equipo
          </h1>

          <p className="mt-4 text-parrafo">
            Aprendices ADSO detrás del desarrollo de EggBalanceAPP.
          </p>

        </div>

        {/* INTEGRANTES */}

        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {team.map((member, index) => (

            <div
              key={index}
              ref={divRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setVisible(index)}
              onMouseLeave={() => setVisible(null)}
              className="relative overflow-hidden rounded-3xl p-px bg-green-2-navbar shadow-lg cursor-pointer"
            >

              <div
                className={`pointer-events-none blur-3xl rounded-full bg-gradient-to-r from-green-1-navbar via-green to-yellow w-60 h-60 absolute transition-opacity duration-500 ${
                  visible === index ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  top: position.y - 120,
                  left: position.x - 120,
                }}
              />

              <div className="relative z-10 bg-white rounded-[23px] p-8 text-center">

                {/* FOTO */}

                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-fond shadow-md"
                />

                {/* NOMBRE */}

                <h2 className="mt-6 text-2xl font-bold text-title">
                  {member.name}
                </h2>

                {/* ROL */}

                <p className="mt-2 text-sm font-semibold text-green-1-navbar">
                  {member.role}
                </p>

                {/* INFORMACIÓN DE CONTACTO */}

                <div className="mt-6 border-t border-border pt-5 text-left space-y-4">

                  <div className="flex items-center gap-3 text-sm text-parrafo">

                    <Mail className="w-5 h-5 text-green-1-navbar shrink-0" />

                    <span>
                      {member.email}
                    </span>

                  </div>

                  <div className="flex items-center gap-3 text-sm text-parrafo">

                    <Phone className="w-5 h-5 text-green-1-navbar shrink-0" />

                    <span>
                      {member.phone}
                    </span>

                  </div>

                  <div className="flex items-center gap-3 text-sm text-parrafo">

                    <MapPin className="w-5 h-5 text-green-1-navbar shrink-0" />

                    <span>
                      {member.address}
                    </span>

                  </div>

                </div>

                {/* ESPACIO VISUAL */}

                <div className="mt-6 pt-5 border-t border-border">

                  <p className="text-sm text-parrafo">
                    Equipo de desarrollo de EggBalanceAPP
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* TECNOLOGÍAS */}

        <div className="max-w-5xl mx-auto mt-16">

          <h2 className="text-2xl font-bold text-title text-center mb-8">
            Tecnologías utilizadas
          </h2>

          <div className="flex flex-wrap justify-center gap-4">

            <div className="bg-white rounded-2xl px-5 py-3 border border-border shadow-sm flex items-center gap-2">

              <Code2 className="w-5 h-5 text-green-1-navbar" />

              <span className="font-semibold text-title">
                Next.js
              </span>

            </div>

            <div className="bg-white rounded-2xl px-5 py-3 border border-border shadow-sm flex items-center gap-2">

              <Code2 className="w-5 h-5 text-green-1-navbar" />

              <span className="font-semibold text-title">
                Node.js
              </span>

            </div>

            <div className="bg-white rounded-2xl px-5 py-3 border border-border shadow-sm flex items-center gap-2">

              <Database className="w-5 h-5 text-yellow" />

              <span className="font-semibold text-title">
                MySQL
              </span>

            </div>

            <div className="bg-white rounded-2xl px-5 py-3 border border-border shadow-sm flex items-center gap-2">

              <BarChart3 className="w-5 h-5 text-green" />

              <span className="font-semibold text-title">
                Tailwind CSS
              </span>

            </div>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}