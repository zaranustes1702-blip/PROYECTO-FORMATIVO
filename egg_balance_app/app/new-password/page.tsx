"use client";

import dynamic from "next/dynamic";
import NewPasswordPage from "@/components/auth/new-password/page";
import Footer from "@/components/Footer";

const NavBar = dynamic(
  () => import("@/components/NavBar"),
  {
    ssr: false,
  }
);

export default function Page() {
  return (
    <>
      <NavBar />
      <NewPasswordPage />
      <Footer />
    </>
  );
}