/**
 * Peças de tela do Heimdall: cabeçalho da página, título de bloco e selo de variação.
 * Não dependem de rota nem de dados; o app compõe o botão de voltar e o seletor de período por fora.
 */
import type * as React from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowDownRight01Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"

type CabecalhoTelaProps = {
  titulo: React.ReactNode
  descricao?: React.ReactNode
  /** Antes do título: botão de voltar, ícone ou selo. */
  inicio?: React.ReactNode
  /** À direita: seletores, botões e filtros da tela. */
  acoes?: React.ReactNode
  className?: string
}

/** Primeiro bloco de toda tela: ocupa a largura toda da grade e segura título, descrição e ações. */
export function CabecalhoTela({ titulo, descricao, inicio, acoes, className }: CabecalhoTelaProps) {
  return (
    <section className={cn("heimdall-block flex flex-col gap-4 p-5 md:flex-row md:items-center md:p-6 lg:col-span-4", className)}>
      <div className="flex min-w-0 flex-1 items-center gap-4">
        {inicio}
        <div className="flex min-w-0 flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">{titulo}</h1>
          {descricao ? <div className="text-sm text-muted-foreground">{descricao}</div> : null}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 empty:hidden">{acoes}</div>
    </section>
  )
}

/** Título pequeno de bloco, com um detalhe opcional à direita. */
export function TituloBloco({ children, detalhe }: { children: React.ReactNode; detalhe?: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <h2 className="font-semibold tracking-tight">{children}</h2>
      {detalhe ? <span className="text-xs text-muted-foreground">{detalhe}</span> : null}
    </div>
  )
}

type VariacaoProps = {
  atual: number
  anterior: number
  /** Unidade exibida depois do número, como "pts". */
  unidade?: string
  /** Se subir é bom (aderência) ou se descer é bom (alertas). */
  melhor?: "maior" | "menor"
  className?: string
}

/** Variação contra o período anterior: verde quando melhora, âmbar quando piora, cinza quando não muda. */
export function Variacao({ atual, anterior, unidade = "", melhor = "maior", className }: VariacaoProps) {
  const delta = atual - anterior
  if (delta === 0) {
    return <span className={cn("rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground", className)}>estável</span>
  }
  const bom = melhor === "maior" ? delta > 0 : delta < 0
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium tabular-nums",
        bom ? "bg-success/10 text-success" : "bg-chart-sem-warning/15 text-[color-mix(in_oklch,var(--chart-sem-warning)_70%,var(--foreground))]",
        className
      )}
    >
      <HugeiconsIcon icon={delta > 0 ? ArrowUpRight01Icon : ArrowDownRight01Icon} strokeWidth={2} className="size-3.5" />
      {delta > 0 ? "+" : "−"}
      {Math.abs(delta)}
      {unidade ? ` ${unidade}` : ""}
    </span>
  )
}
