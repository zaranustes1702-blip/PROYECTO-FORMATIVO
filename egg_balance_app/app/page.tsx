"use client";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Login from "@/components/auth/Login";
import Link from "next/link";

export default function App() {
  return (
    <>
      <NavBar />

      <main className="min-h-screen bg-gradient-to-b from-[#EFF5F1] via-[#F2F5F3] to-[#E9F0EB]">

        <section className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 xl:px-32 pt-8 pb-16 lg:pt-12 lg:pb-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* TEXTO PRINCIPAL */}
            <div>
              <p className="text-green-1-navbar font-semibold text-base md:text-lg mb-3">
                Centro agropecuario "La granja" - Espinal
              </p>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-title leading-tight mb-5">
                El control de nuestra unidad avícola,
                <span className="text-green-1-navbar">
                  {" "}más fácil.
                </span>
              </h1>

              <p className="text-base md:text-lg lg:text-xl leading-7 lg:leading-8 text-parrafo max-w-xl mb-7">
                EggBalanceAPP centraliza la información de tus aves,
                alimentación, pesaje y producción de huevos en un solo lugar.
              </p>

              <div className="flex flex-wrap gap-4 items-center">

                {/* Botón de Login con título Explorar plataforma */}
                <Login
                  triggerText="Explorar plataforma"
                  triggerClassName="bg-green-2-navbar hover:bg-green-1-navbar text-white px-7 py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                  showArrow={false}
                />

                <Link
                  href="/about"
                  className="border-2 border-green-1-navbar text-green-1-navbar hover:bg-green-1-navbar hover:text-white px-7 py-3 rounded-full font-semibold transition-all duration-300"
                >
                  Conócenos
                </Link>

              </div>
            </div>

            {/* LOGO */}
            <div className="flex justify-center lg:justify-end">
              <img
                src="/logoSENA.png"
                alt="EggBalanceAPP"
                className="w-full max-w-sm lg:max-w-md object-contain drop-shadow-sm"
              />
            </div>

          </div>
        </section>

        {/* FRASE INFERIOR */}
        <section className="bg-green-2-navbar py-10 shadow-sm">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Detrás de cada huevo hay trabajo, cuidado y dedicación.
            </h2>
            <p className="text-white/80 mt-3">
              Tecnología pensada para hacer más eficiente la gestión avícola.
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}