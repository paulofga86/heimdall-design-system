/**
 * Abas de página no padrão Heimdall: trilho em pílula com contorno discreto, aba ativa como pílula cheia
 * e suave (mesma linguagem dos seletores Lista/Quadro). Substitui o sublinhado do Marsala, que dentro de
 * um trilho arredondado virava uma curva vinho e deixava o texto colado na borda.
 * Ajustes aplicados por fora (o componente do Marsala não é editado): ver README §16.
 */
import type * as React from "react"

import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export function TrilhoAbas({ className, children, ...props }: React.ComponentProps<typeof TabsList>) {
  return (
    <TabsList
      className={cn(
        // O Marsala traz sublinhado e espaçamento largo para abas; aqui o trilho é uma pílula com pílulas dentro.
        "heimdall-block h-auto! w-fit max-w-full gap-1! overflow-x-auto rounded-full p-1 text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </TabsList>
  )
}

export function Aba({ className, ...props }: React.ComponentProps<typeof TabsTrigger>) {
  return (
    <TabsTrigger
      className={cn(
        "mb-0! h-9 shrink-0 rounded-full border-0! px-3! pb-0! text-sm sm:px-4! transition-[background-color,color,box-shadow] duration-200",
        "hover:bg-muted/60 hover:text-foreground",
        "data-active:bg-muted data-active:text-foreground data-active:shadow-[0_1px_2px_rgb(15_15_25/0.06)] dark:data-active:bg-muted",
        "focus-visible:ring-[3px] focus-visible:ring-ring/50",
        className
      )}
      {...props}
    />
  )
}
