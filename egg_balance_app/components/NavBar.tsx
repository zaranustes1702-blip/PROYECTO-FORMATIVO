"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import Login from "./auth/Login";

const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/about", label: "Nosotros" },
    { href: "/contact", label: "Contacto" },
];

export default function NavBar() {
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-5 bg-white shadow-md relative">
            <Link href="/" className="flex items-center gap-3">
                <Image src="/logo.png" alt="EggBalance" width={75} height={75} className="object-contain" />
                <span className="text-2xl font-bold text-green-1-navbar tracking-wide">EggBalance</span>
            </Link>

            {/* Menú Desktop */}
            <div className="hidden sm:flex items-center gap-8">
                {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="nav-link">{link.label}</Link>
                ))}
                <Login />
            </div>

            {/* Botón Menú Móvil */}
            <button onClick={() => setOpenMenu(!openMenu)} aria-label="Abrir menú" className="sm:hidden">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <rect y="4" width="24" height="2.5" rx="1" fill="#2E7D32" />
                    <rect y="11" width="24" height="2.5" rx="1" fill="#2E7D32" />
                    <rect y="18" width="24" height="2.5" rx="1" fill="#2E7D32" />
                </svg>
            </button>

            {/* Menú Móvil */}
            <div className={`${openMenu ? "flex" : "hidden"} absolute top-full left-0 w-full bg-fond border-t border-border shadow-lg py-6 px-6 flex-col gap-5 sm:hidden`}>
                {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="nav-link">{link.label}</Link>
                ))}
                <div className="pt-2"><Login /></div>
            </div>
        </nav>
    );
}