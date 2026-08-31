"use client";

import { useState } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export default function NewPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setMensaje("");

    if (password === "" || confirmPassword === "") {
      setMensaje("Por favor, completa todos los campos");
      return;
    }

    if (password.length < 3) {
      setMensaje("La contraseña debe tener mínimo 3 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setMensaje("Las contraseñas no coinciden");
      return;
    }

    setGuardando(true);

    try {
      const respuesta = await fetch(
        `${API_BASE_URL}/auth/new-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
            confirmPassword,
          }),
        }
      );

      const resultado = await respuesta.json();

      if (!respuesta.ok || resultado.success === false) {
        throw new Error(
          resultado.message ||
            "No se pudo cambiar la contraseña"
        );
      }

      setMensaje(
        resultado.message ||
          "Contraseña cambiada correctamente"
      );

      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      if (error instanceof Error) {
        setMensaje(error.message);
      } else {
        setMensaje(
          "Ocurrió un error al cambiar la contraseña"
        );
      }
    } finally {
      setGuardando(false);
    }
  };

  return (
    <main className="bg-fond flex min-h-screen items-center justify-center px-4 py-10">
      <div className="bg-white w-full max-w-md rounded-xl p-8 shadow-lg">
        <h1 className="text-title mb-2 text-center text-2xl font-bold">
          Nueva contraseña
        </h1>

        <p className="text-subtitle mb-6 text-center">
          Ingresa tu nueva contraseña
        </p>

        {mensaje && (
          <div className="border-green mb-5 rounded-md border bg-green-50 p-3 text-center text-green-1-navbar">
            {mensaje}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="text-title mb-2 block font-semibold"
            >
              Nueva contraseña
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nueva contraseña"
              minLength={3}
              required
              className="border-border w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="text-title mb-2 block font-semibold"
            >
              Confirmar contraseña
            </label>

            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              placeholder="Confirmar contraseña"
              minLength={3}
              required
              className="border-border w-full rounded-md border p-3 outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>

          <button
            type="submit"
            disabled={guardando}
            className="bg-green-1-navbar text-white hover:bg-green-1-navbar w-full rounded-md p-3 font-semibold disabled:cursor-not-allowed disabled:opacity-50"
          >
            {guardando
              ? "Guardando..."
              : "Cambiar contraseña"}
          </button>
        </form>
      </div>
    </main>
  );
}