"use client";

import { useState, useEffect } from "react";
import { Eye, EyeClosed } from "lucide-react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export default function NewPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [tokenValido, setTokenValido] = useState<boolean | null>(null);

  // Al cargar la página validamos el token con el backend
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rawToken = params.get("t") || params.get("token");
    const token = rawToken ? rawToken.replace(/ /g, "+").trim() : null;

    if (!token) {
      setTokenValido(false);
      setMensaje("El enlace no es válido o ha expirado.");
      return;
    }

    fetch(`${API_BASE_URL}/auth/validate-reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTokenValido(true);
        } else {
          setTokenValido(false);
          setMensaje(data.message || "El enlace no es válido o ya fue usado.");
        }
      })
      .catch(() => {
        setTokenValido(false);
        setMensaje("No se pudo verificar el enlace. Intenta de nuevo.");
      });
  }, []);

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

    const params = new URLSearchParams(window.location.search);
    const rawToken = params.get("t") || params.get("token");
    const token = rawToken ? rawToken.replace(/ /g, "+").trim() : null;

    if (!token) {
      setMensaje("El enlace no es válido");
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
            token,
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
      // Marcamos el token como inválido para que no se pueda volver a usar el formulario
      setTokenValido(false);
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

  // Mientras verifica el token mostramos un estado de carga
  if (tokenValido === null) {
    return (
      <main className="bg-gradient-to-b from-[#EFF5F1] via-[#F2F5F3] to-[#E9F0EB] flex min-h-screen items-center justify-center px-4 py-10">
        <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-lg text-center border border-[#E8DFD1]">
          <p className="text-subtitle">Verificando enlace...</p>
        </div>
      </main>
    );
  }

  // Si el token no es válido mostramos el mensaje de error
  if (!tokenValido) {
    return (
      <main className="bg-gradient-to-b from-[#EFF5F1] via-[#F2F5F3] to-[#E9F0EB] flex min-h-screen items-center justify-center px-4 py-10">
        <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-lg text-center border border-[#E8DFD1]">
          <h1 className="text-title mb-4 text-2xl font-bold">
            Enlace no válido
          </h1>
          <p className="text-red-600">{mensaje}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gradient-to-b from-[#EFF5F1] via-[#F2F5F3] to-[#E9F0EB] flex min-h-screen items-center justify-center px-4 py-10">
      <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-lg border border-[#E8DFD1]">
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

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nueva contraseña"
                minLength={3}
                required
                className="border-border w-full rounded-xl border border-[#2E7D32] p-3 pr-10 outline-none focus:ring-2 focus:ring-[#2E7D32]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="text-title mb-2 block font-semibold"
            >
              Confirmar contraseña
            </label>

            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirmar contraseña"
                minLength={3}
                required
                className="border-border w-full rounded-xl border border-[#2E7D32] p-3 pr-10 outline-none focus:ring-2 focus:ring-[#2E7D32]"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                {showConfirmPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={guardando}
            className="bg-[#2C3C23] hover:bg-[#2E7D32] text-white w-full rounded-xl p-3 font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
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