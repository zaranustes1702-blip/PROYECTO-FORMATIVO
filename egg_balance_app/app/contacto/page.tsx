import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function Contacto() {
  return (
    <>
      <NavBar />

      <main className="min-h-screen bg-gradient-to-b from-[#EFF5F1] via-[#F2F5F3] to-[#E9F0EB] overflow-hidden">

        {/* HERO */}
        <section className="relative py-24">

          {/* Fondo decorativo con tonos suaves del proyecto */}
          <div className="absolute -top-28 -left-20 w-96 h-96 bg-green-1-navbar/10 rounded-full blur-3xl"></div>
          <div className="absolute top-10 right-0 w-80 h-80 bg-green-2-navbar/10 rounded-full blur-3xl"></div>

          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">

            <span className="inline-block px-6 py-2 rounded-full bg-white shadow-sm border border-border text-green-1-navbar font-semibold">
              EggBalanceAPP
            </span>

            <h1 className="mt-8 text-5xl md:text-6xl font-bold text-title">
              Contáctanos
            </h1>

            <p className="mt-6 max-w-3xl mx-auto text-xl text-parrafo leading-9">
              Nuestro equipo está listo para ayudarte. Escríbenos si tienes
              dudas sobre la plataforma, soporte técnico o información del
              proyecto.
            </p>

          </div>

        </section>

        {/* TARJETAS */}
        <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">

          <div className="grid md:grid-cols-3 gap-8">

            {/* Ubicación */}
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 border border-border">

              <div className="w-20 h-20 rounded-full bg-green-1-navbar text-white flex items-center justify-center text-4xl mx-auto shadow-sm">
                📍
              </div>

              <h2 className="mt-6 text-2xl font-bold text-title">
                Ubicación
              </h2>

              <p className="mt-4 text-parrafo">
                Centro Agropecuario La Granja
              </p>

              <p className="text-parrafo">
                Tolima, Colombia
              </p>

            </div>

            {/* Teléfono */}
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 border border-border">

              <div className="w-20 h-20 rounded-full bg-green-2-navbar text-white flex items-center justify-center text-4xl mx-auto shadow-sm">
                📞
              </div>

              <h2 className="mt-6 text-2xl font-bold text-title">
                Teléfono
              </h2>

              <p className="mt-4 text-parrafo">
                +57 300 123 4567
              </p>

              <p className="text-parrafo">
                Lunes a Viernes
              </p>

            </div>

            {/* Correo */}
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 border border-border">

              <div className="w-20 h-20 rounded-full bg-green-1-navbar text-white flex items-center justify-center text-4xl mx-auto shadow-sm">
                ✉️
              </div>

              <h2 className="mt-6 text-2xl font-bold text-title">
                Correo
              </h2>

              <p className="mt-4 text-parrafo">
                soporte@eggbalanceapp.com
              </p>

              <p className="text-parrafo">
                Respuesta en menos de 24 horas
              </p>

            </div>

          </div>

        </section>

        {/* FORMULARIO + MAPA */}
        <section className="max-w-7xl mx-auto px-6 py-24">

          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Formulario */}
            <div className="bg-white rounded-[32px] shadow-2xl p-10 border border-border">

              <span className="inline-block px-4 py-2 rounded-full bg-green-1-navbar/10 text-green-1-navbar font-semibold">
                Escríbenos
              </span>

              <h2 className="mt-6 text-4xl font-bold text-title">
                Envíanos un mensaje
              </h2>

              <p className="mt-3 text-parrafo">
                Completa el formulario y nos pondremos en contacto contigo lo antes posible.
              </p>

              <form className="mt-10 space-y-6">

                <div>
                  <label className="block mb-2 font-medium text-title">
                    Nombre
                  </label>

                  <input
                    type="text"
                    placeholder="Tu nombre completo"
                    className="w-full bg-[#FCFDFD] border border-border rounded-2xl p-4 outline-none focus:ring-2 focus:ring-green-1-navbar transition"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-title">
                    Correo electrónico
                  </label>

                  <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className="w-full bg-[#FCFDFD] border border-border rounded-2xl p-4 outline-none focus:ring-2 focus:ring-green-1-navbar transition"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-title">
                    Asunto
                  </label>

                  <input
                    type="text"
                    placeholder="¿Cómo podemos ayudarte?"
                    className="w-full bg-[#FCFDFD] border border-border rounded-2xl p-4 outline-none focus:ring-2 focus:ring-green-1-navbar transition"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-title">
                    Mensaje
                  </label>

                  <textarea
                    rows={6}
                    placeholder="Escribe aquí tu mensaje..."
                    className="w-full bg-[#FCFDFD] border border-border rounded-2xl p-4 resize-none outline-none focus:ring-2 focus:ring-green-1-navbar transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-1-navbar to-green-2-navbar text-white text-lg font-semibold shadow-xl hover:scale-[1.02] transition-all cursor-pointer"
                >
                  Enviar mensaje
                </button>

              </form>

            </div>

            {/* MAPA */}
            <div className="relative">

              <div className="absolute top-6 left-6 z-10 bg-white rounded-2xl shadow-xl p-5 border border-border">

                <h3 className="font-bold text-green-1-navbar">
                  📍 Centro Agropecuario La Granja
                </h3>

                <p className="text-sm text-parrafo mt-2">
                  SENA Regional Tolima
                </p>

                <p className="text-sm text-parrafo">
                  Espinal - Tolima
                </p>

              </div>

              <div className="overflow-hidden rounded-[32px] shadow-2xl border border-border">

                <iframe
                  src="https://www.google.com/maps?q=SENA+Centro+Agropecuario+La+Granja+Espinal+Tolima&output=embed"
                  className="w-full h-[650px]"
                  loading="lazy"
                />

              </div>

            </div>

          </div>

        </section>

        {/* BENEFICIOS */}
        <section className="max-w-5xl mx-auto pb-16 px-6">

          <div className="text-center mb-10">

            <span className="px-4 py-2 rounded-full bg-green-1-navbar text-white text-sm font-semibold">
              Beneficios
            </span>

            <h2 className="mt-4 text-3xl font-bold text-title">
              ¿Por qué EggBalanceAPP?
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-5">

            <div className="bg-white rounded-2xl p-6 shadow-md border border-border hover:-translate-y-1 hover:shadow-xl transition">

              <div className="w-12 h-12 rounded-xl bg-green-1-navbar/10 flex items-center justify-center text-2xl">
                ⚡
              </div>

              <h3 className="mt-4 font-bold text-title">
                Soporte rápido
              </h3>

              <p className="mt-1 text-sm text-parrafo">
                Respuesta en menos de 24 horas.
              </p>

            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md border border-border hover:-translate-y-1 hover:shadow-xl transition">

              <div className="w-12 h-12 rounded-xl bg-green-2-navbar/10 flex items-center justify-center text-2xl">
                🔒
              </div>

              <h3 className="mt-4 font-bold text-title">
                Información segura
              </h3>

              <p className="mt-1 text-sm text-parrafo">
                Tus registros siempre protegidos.
              </p>

            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md border border-border hover:-translate-y-1 hover:shadow-xl transition">

              <div className="w-12 h-12 rounded-xl bg-green-1-navbar/10 flex items-center justify-center text-2xl">
                🥚
              </div>

              <h3 className="mt-4 font-bold text-title">
                Gestión inteligente
              </h3>

              <p className="mt-1 text-sm text-parrafo">
                Control total de tu producción.
              </p>

            </div>

          </div>

        </section>

        {/* CTA FINAL */}
        <section className="pb-16">

          <div className="flex justify-center">

            <button className="bg-green-1-navbar hover:bg-green-2-navbar text-white px-8 py-3 rounded-full shadow-lg transition hover:scale-105 font-semibold cursor-pointer">
              📩 Contáctanos
            </button>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}