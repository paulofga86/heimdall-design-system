import { HugeiconsIcon } from "@hugeicons/react"

import { cn } from "@/lib/utils"

/** Cor de cada área do Heimdall — sempre tokens semânticos do Marsala. */
export const tons = {
  vinho: "bg-primary/10 text-primary",
  ambar: "bg-chart-sem-warning/15 text-chart-sem-warning",
  azul: "bg-chart-sem-info/15 text-chart-sem-info",
  violeta: "bg-chart-sem-violet/20 text-chart-sem-violet",
  verde: "bg-chart-sem-success/15 text-chart-sem-success",
  turquesa: "bg-chart-sem-accent/15 text-chart-sem-accent",
  neutro: "bg-muted text-muted-foreground",
} as const

export type Tom = keyof typeof tons

type IconeTomProps = {
  icone: Parameters<typeof HugeiconsIcon>[0]["icon"]
  tom: Tom
  tamanho?: "sm" | "md" | "lg"
  className?: string
}

const tamanhos = {
  sm: "size-8 [&_svg]:size-4",
  md: "size-10 [&_svg]:size-5",
  lg: "size-12 [&_svg]:size-6",
}

/** Ícone dentro de um círculo tingido com a cor da área. */
export function IconeTom({ icone, tom, tamanho = "md", className }: IconeTomProps) {
  return (
    <span
      aria-hidden
      className={cn("flex shrink-0 items-center justify-center rounded-full", tons[tom], tamanhos[tamanho], className)}
    >
      <HugeiconsIcon icon={icone} strokeWidth={2} />
    </span>
  )
}
