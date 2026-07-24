"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import Login from "./auth/Login";

export default function NavBar() {
    const [openMenu, setOpenMenu] = React.useState(false);

    const MostrarMenu = () => {
        setOpenMenu(!openMenu);
    };

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-5 bg-white border-b border-border shadow-md relative">

            {/* LOGO */}

            <Link href="/" className="flex items-center gap-3">

                <Image
                    src="/logo.png"
                    alt="EggBalanceAPP"
                    width={75}
                    height={75}
                    className="object-contain"
                />

                <span className="text-2xl font-bold text-green-1-navbar tracking-wide">
                    EggBalanceAPP
                </span>

            </Link>


            {/* MENÚ DESKTOP */}

            <div className="hidden sm:flex items-center gap-8">

                <Link
                    href="/"
                    className="nav-link"
                >
                    Inicio
                </Link>

                <Link
                    href="/productos"
                    className="nav-link"
                >
                    Productos
                </Link>

                <Link
                    href="/nosotros"
                    className="nav-link"
                >
                    Nosotros
                </Link>

                <Link
                    href="/contacto"
                    className="nav-link"
                >
                    Contacto
                </Link>

                {/* LOGIN */}

                <Login />

            </div>


            {/* BOTÓN MENÚ MÓVIL */}

            <button
                onClick={MostrarMenu}
                aria-label="Abrir menú"
                className="sm:hidden"
            >

                <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                >

                    <rect
                        y="4"
                        width="24"
                        height="2.5"
                        rx="1"
                        fill="#2E7D32"
                    />

                    <rect
                        y="11"
                        width="24"
                        height="2.5"
                        rx="1"
                        fill="#2E7D32"
                    />

                    <rect
                        y="18"
                        width="24"
                        height="2.5"
                        rx="1"
                        fill="#2E7D32"
                    />

                </svg>

            </button>


            {/* MENÚ MÓVIL */}

            <div
                className={`
                    ${openMenu ? "flex" : "hidden"}
                    absolute
                    top-full
                    left-0
                    w-full
                    bg-fond
                    border-t
                    border-border
                    shadow-lg
                    py-6
                    px-6
                    flex-col
                    gap-5
                    sm:hidden
                `}
            >

                <Link
                    href="/"
                    className="nav-link"
                >
                    Inicio
                </Link>

                <Link
                    href="/productos"
                    className="nav-link"
                >
                    Productos
                </Link>

                <Link
                    href="/nosotros"
                    className="nav-link"
                >
                    Nosotros
                </Link>

                <Link
                    href="/contacto"
                    className="nav-link"
                >
                    Contacto
                </Link>


                {/* LOGIN */}

                <div className="pt-2">
                    <Login />
                </div>

            </div>

        </nav>
    );
}