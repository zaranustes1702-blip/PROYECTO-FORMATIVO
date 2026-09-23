"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import FormCreateSupply from "@/components/supply/formCreate";
import TablaSupply from "@/components/supply/tablaSupply";

export default function SupplyPage() {
  const [valor, setValor] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 3;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const soloLetras = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
    setValor(soloLetras);
  };

  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-white p-6 gap-6">
      {/* Barra superior de Data Table: Input con hover + Botón de acción */}
      <div className="flex items-center justify-between py-4 gap-4">
        <div className="relative flex items-center w-full max-w-sm group">
          <Search className="absolute left-3 size-4 text-green-700 transition-colors duration-200 group-hover:text-green-800 pointer-events-none" />

          <Input
            type="text"
            placeholder="Filtrar suministro..."
            value={valor}
            onChange={handleInputChange}
            className="
              pl-9 h-10 w-full rounded-lg border border-[#E8DFD1] bg-[#FCFBF9]
              text-sm text-[#3A2A1A] placeholder:text-[#9A8B7A]
              transition-all duration-200 shadow-xs
              hover:border-green-600 hover:bg-white hover:shadow-sm
              focus-visible:border-green-600 focus-visible:ring-2 focus-visible:ring-green-500/20 focus-visible:bg-white
            "
          />
        </div>

        <FormCreateSupply />
      </div>

      <div className="w-full overflow-x-auto">
        <TablaSupply />
      </div>

      {/* Paginador Shadcn */}
      <div className="flex justify-end pt-2">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === page}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(page);
                  }}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}