"use client";

import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import { useState } from "react";

const NavBar = dynamic(() => import("@/components/NavBar"), { ssr: false });

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

type FormState = { name: string; email: string; subject: string; message: string };

const TOPICS = ["Soporte técnico", "Información del proyecto", "Colaboración", "Otro"];

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState<{ ok: boolean; msg: string } | null>(null);
  const [focused, setFocused] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTopic = (topic: string) => {
    setSelectedTopic(topic);
    setForm((f) => ({ ...f, subject: topic }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResultado(null);

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setResultado({ ok: false, msg: "Por favor completa todos los campos obligatorios." });
      return;
    }

    setEnviando(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, subject: selectedTopic || form.subject }),
      });
      const data = await res.json();

      if (res.ok && data.success !== false) {
        setResultado({ ok: true, msg: "¡Mensaje enviado! Te responderemos pronto 🎉" });
        setForm({ name: "", email: "", subject: "", message: "" });
        setSelectedTopic("");
      } else {
        setResultado({ ok: false, msg: data.message || "No se pudo enviar el mensaje." });
      }
    } catch {
      setResultado({ ok: false, msg: "No se pudo conectar con el servidor." });
    } finally {
      setEnviando(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full bg-transparent text-title placeholder-[#9CB8A0] border-b-2 py-3 pr-3 outline-none transition-all duration-300 ${
      focused === field ? "border-green-1-navbar" : "border-[#C8DFCD]"
    }`;

  return (
    <>
      <NavBar />

      <main className="min-h-screen bg-gradient-to-b from-[#EFF5F1] via-[#F2F5F3] to-[#E9F0EB]">

        {/* HERO */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          <div className="absolute -top-28 -left-20 w-96 h-96 bg-green-1-navbar/8 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-10 right-0 w-80 h-80 bg-green-2-navbar/8 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
            <span className="inline-block px-6 py-2 rounded-full bg-white shadow-sm border border-border text-green-1-navbar font-semibold text-sm">
              EggBalanceAPP
            </span>
            <h1 className="mt-6 text-5xl md:text-6xl font-bold text-title leading-tight">
              Hablemos
            </h1>
            <p className="mt-5 text-lg text-parrafo leading-8 max-w-xl mx-auto">
              Estamos aquí para ayudarte. Escríbenos y te responderemos lo antes posible.
            </p>
          </div>
        </section>

        {/* INFO RÁPIDA */}
        <section className="max-w-4xl mx-auto px-6 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: "📍", label: "Centro Agropecuario La Granja, Tolima" },
              { icon: "📞", label: "3173587877 · Lun–Vie" },
              { icon: "✉️", label: "eggbalance857@gmail.com" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-5 py-4 border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-sm text-parrafo font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FORMULARIO + MAPA */}
        <section className="max-w-7xl mx-auto px-6 py-10 pb-20">
          <div className="grid lg:grid-cols-2 gap-10 items-start">

            {/* ── FORMULARIO INNOVADOR ── */}
            <div className="bg-white rounded-[28px] shadow-2xl border border-border">

              {/* Barra superior estilo app */}
              <div className="bg-gradient-to-r from-green-1-navbar to-green-2-navbar px-8 py-5 flex items-center gap-3 rounded-t-[28px]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-white/30" />
                  <div className="w-3 h-3 rounded-full bg-white/30" />
                  <div className="w-3 h-3 rounded-full bg-white/30" />
                </div>
                <p className="text-white font-semibold text-sm ml-2">Nueva conversación</p>
              </div>

              <div className="px-8 py-8">

                {/* Resultado */}
                {resultado && (
                  <div
                    className={`mb-6 p-4 rounded-2xl text-sm font-medium flex items-center gap-2 ${
                      resultado.ok
                        ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                        : "bg-red-50 border border-red-200 text-red-700"
                    }`}
                  >
                    <span className="text-xl">{resultado.ok ? "✅" : "❌"}</span>
                    {resultado.msg}
                  </div>
                )}

                {/* Selector de tema */}
                <div className="mb-7">
                  <p className="text-xs font-bold uppercase tracking-widest text-green-1-navbar mb-3">
                    ¿En qué podemos ayudarte?
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {TOPICS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => handleTopic(t)}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-all cursor-pointer ${
                          selectedTopic === t
                            ? "bg-green-1-navbar text-white border-green-1-navbar shadow-md scale-105"
                            : "bg-white text-parrafo border-border hover:border-green-1-navbar hover:text-green-1-navbar"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Nombre + Correo en 2 col */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-green-1-navbar">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused("")}
                        placeholder="Tu nombre"
                        required
                        disabled={enviando}
                        className={inputClass("name")}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-green-1-navbar">
                        Correo *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused("")}
                        placeholder="correo@ejemplo.com"
                        required
                        disabled={enviando}
                        className={inputClass("email")}
                      />
                    </div>
                  </div>

                  {/* Asunto (si no seleccionó topic) */}
                  {!selectedTopic && (
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-green-1-navbar">
                        Asunto
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        onFocus={() => setFocused("subject")}
                        onBlur={() => setFocused("")}
                        placeholder="¿Sobre qué nos escribes?"
                        disabled={enviando}
                        className={inputClass("subject")}
                      />
                    </div>
                  )}

                  {/* Mensaje */}
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-green-1-navbar">
                      Mensaje *
                    </label>
                    <textarea
                      rows={5}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused("")}
                      placeholder="Cuéntanos con detalle..."
                      required
                      disabled={enviando}
                      className={`${inputClass("message")} resize-none`}
                    />
                    <p className="text-right text-xs text-parrafo/40 mt-1">
                      {form.message.length} caracteres
                    </p>
                  </div>

                  {/* Botón de envío */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={enviando}
                      className="w-full py-4 rounded-2xl bg-green-1-navbar hover:bg-green-2-navbar text-white font-bold text-base shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {enviando ? (
                        <>
                          <svg className="animate-spin w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                          </svg>
                          <span>Enviando mensaje...</span>
                        </>
                      ) : (
                        <span>Enviar mensaje</span>
                      )}
                    </button>
                  </div>

                </form>
              </div>
            </div>

            {/* ── MAPA ── */}
            <div className="relative">
              <div className="absolute top-5 left-5 z-10 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-border">
                <h3 className="font-bold text-green-1-navbar text-sm">
                  📍 Centro Agropecuario La Granja
                </h3>
                <p className="text-xs text-parrafo mt-1">SENA Regional Tolima</p>
                <p className="text-xs text-parrafo">Espinal - Tolima</p>
              </div>

              <div className="overflow-hidden rounded-[28px] shadow-2xl border border-border">
                <iframe
                  src="https://www.google.com/maps?q=SENA+Centro+Agropecuario+La+Granja+Espinal+Tolima&output=embed"
                  className="w-full h-[600px]"
                  loading="lazy"
                />
              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
