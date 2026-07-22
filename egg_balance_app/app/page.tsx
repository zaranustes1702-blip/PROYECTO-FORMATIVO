import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function App() {
  return (
    <>
      <NavBar />

      <main className= "bg-fond min-h-screen">
        <section className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 xl:px-32 py-24">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>

              <h1 className="text-4xl md:text-5xl font-bold text-title leading-tight mb-8">
                Bienvenido a{" "}
                <span className="text-green-1-navbar">
                  EggBalanceAPP
                </span>
              </h1>

              <p className="text-lg md:text-xl leading-9 text-parrafo mb-6">
                EggBalanceAPP es tu solución integral para gestionar la información
                de tus gallinas y la producción de huevos. Con nuestra plataforma
                podrás llevar un registro detallado de la salud, alimentación y
                producción de cada ave, además de obtener análisis y recomendaciones
                que faciliten la toma de decisiones.
              </p>

              <p className="text-lg md:text-xl leading-9 text-parrafo">
                Ya seas un pequeño productor o una granja comercial, EggBalanceAPP
                te brinda las herramientas necesarias para optimizar la
                productividad, mejorar el bienestar animal y hacer más eficiente la
                administración de tu explotación avícola.
              </p>

            </div>

            <div className="flex justify-center lg:justify-end">

              <img
                src="/logoSENA.png"
                alt="EggBalanceAPP"
                className="w-full max-w-md object-contain"
              />

            </div>

          </div>

        </section>
      </main>

      <Footer />
    </>
  );
}