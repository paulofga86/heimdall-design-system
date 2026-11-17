import { cn } from "@/lib/utils"
import { simboloAltura, simboloCaminho, simboloLargura } from "./simbolo-heimdall"

type Tamanho = "sm" | "md" | "lg" | "xl"

const tamanhos: Record<Tamanho, string> = {
  sm: "size-8",
  md: "size-10",
  lg: "size-14",
  xl: "size-28",
}

/** `oficial` é a logo do Heimdall; as demais são propostas antigas, mantidas como histórico em `#/marca`. */
export type Proposta = "oficial" | "ponte" | "olho" | "h" | "chifre" | "bifrost" | "elmo" | "runa"

type LogoProps = {
  tamanho?: Tamanho
  /** `cor`: quadrado vinho com traço claro. `linha`: só o traço, na cor do texto. */
  variante?: "cor" | "linha"
  proposta?: Proposta
  className?: string
}

/** Símbolo oficial centralizado na grade de 48, ocupando ~70% da altura (mesma proporção dos arquivos de ícone). */
const escala = 0.095
const deslocX = (48 - simboloLargura * escala) / 2
const deslocY = (48 - simboloAltura * escala) / 2

/** Desenhos: o oficial e as propostas antigas (mesmo traço e nós do fluxo usado nas telas). */
function Simbolo({ proposta }: { proposta: Proposta }) {
  if (proposta === "oficial") {
    return <path transform={`translate(${deslocX} ${deslocY}) scale(${escala})`} d={simboloCaminho} fill="currentColor" />
  }
  if (proposta === "olho") {
    return (
      <>
        <path d="M11 24 Q24 11 37 24 Q24 37 11 24 Z" fill="none" stroke="currentColor" strokeWidth={3.2} strokeLinejoin="round" />
        <circle cx={24} cy={24} r={4.2} fill="currentColor" />
        <circle cx={11} cy={24} r={2.6} fill="currentColor" />
        <circle cx={37} cy={24} r={2.6} fill="currentColor" />
      </>
    )
  }
  if (proposta === "chifre") {
    // Gjallarhorn: o chifre de guerra que Heimdall toca para avisar os deuses — anéis de metal, alça e o som saindo.
    return (
      <>
        <path
          d="M9.5 31 C12.5 37.5 30 36 36.5 22 Q37 15 28.5 16.5 C26 27 18.5 30.5 12 28.5 Q9 28.6 9.5 31 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.8}
          strokeLinejoin="round"
        />
        <path d="M12.4 33.7 L15.6 29.0 M32.1 28.4 L26.7 21.5" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" />
        <path d="M12.4 33.7 Q22 45 32.1 28.4" fill="none" stroke="currentColor" strokeOpacity={0.6} strokeWidth={1.8} strokeLinecap="round" />
        <path d="M33.6 11.6 A5 5 0 0 1 39.2 15.6" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" />
        <path d="M33.6 7 A9.5 9.5 0 0 1 43 14.6" fill="none" stroke="currentColor" strokeOpacity={0.5} strokeWidth={2.6} strokeLinecap="round" />
      </>
    )
  }
  if (proposta === "bifrost") {
    // Bifröst: a ponte de arco-íris nasce da torre de Heimdall (Himinbjörg), onde ele vigia.
    return (
      <>
        <path d="M12 36 V17" stroke="currentColor" strokeWidth={3.4} strokeLinecap="round" />
        <circle cx={12} cy={12.5} r={3.2} fill="currentColor" />
        <path d="M12 36 C12 20 38 20 38 36" fill="none" stroke="currentColor" strokeWidth={3.2} strokeLinecap="round" />
        <path d="M17.5 36 C17.5 26 32.5 26 32.5 36" fill="none" stroke="currentColor" strokeOpacity={0.7} strokeWidth={3.2} strokeLinecap="round" />
        <path d="M23 36 C23 32 27.5 32 27.5 36" fill="none" stroke="currentColor" strokeOpacity={0.45} strokeWidth={3.2} strokeLinecap="round" />
      </>
    )
  }
  if (proposta === "elmo") {
    // Elmo nórdico do guardião, de frente: topo pontudo, aro da testa, laterais que descem e o protetor de nariz.
    return (
      <>
        <path
          d="M12.5 36 V24.5 C12.5 17.5 17.5 12.5 24 9.5 C30.5 12.5 35.5 17.5 35.5 24.5 V36"
          fill="none"
          stroke="currentColor"
          strokeWidth={3.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M12.5 24.5 H35.5" stroke="currentColor" strokeWidth={3} strokeLinecap="round" />
        <path d="M24 24.5 V38.5" stroke="currentColor" strokeWidth={4} strokeLinecap="round" />
        <path d="M24 10.5 V24.5" stroke="currentColor" strokeOpacity={0.55} strokeWidth={2} strokeLinecap="round" />
      </>
    )
  }
  if (proposta === "runa") {
    // Runa ᚺ (Hagalaz), o "H" do alfabeto rúnico; a travessa liga dois nós, como os fluxos do produto.
    return (
      <>
        <path d="M15 11 V37 M33 11 V37" stroke="currentColor" strokeWidth={3.6} strokeLinecap="round" />
        <path d="M15 19.5 L33 28.5" stroke="currentColor" strokeWidth={3} strokeLinecap="round" />
        <circle cx={15} cy={19.5} r={3.4} fill="currentColor" />
        <circle cx={33} cy={28.5} r={3.4} fill="currentColor" />
      </>
    )
  }
  if (proposta === "h") {
    return (
      <>
        <path d="M15 13 V35 M33 13 V35" stroke="currentColor" strokeWidth={3.6} strokeLinecap="round" />
        <path d="M15 24 H33" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeDasharray="0.1 5" />
        <circle cx={24} cy={24} r={3.2} fill="currentColor" />
      </>
    )
  }
  // ponte: o arco da passagem com os nós de entrada e saída; o vigia no alto, olhando a ponte de lado
  return (
    <>
      <path d="M9 35 C9 21 31 21 31 35" fill="none" stroke="currentColor" strokeWidth={3.4} strokeLinecap="round" />
      <circle cx={9} cy={35} r={3.1} fill="currentColor" />
      <circle cx={31} cy={35} r={3.1} fill="currentColor" />
      <path d="M31.5 19 L25.5 24" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeDasharray="0.1 4.2" />
      <circle cx={36} cy={14} r={3.3} fill="currentColor" />
      <circle cx={36} cy={14} r={6.3} fill="none" stroke="currentColor" strokeOpacity={0.45} strokeWidth={1.6} />
    </>
  )
}

export function Logo({ tamanho = "md", variante = "cor", proposta, className }: LogoProps) {
  const desenho = proposta ?? "oficial"
  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-label="Heimdall"
      className={cn("shrink-0", tamanhos[tamanho], variante === "cor" ? "text-primary-foreground" : "text-primary", className)}
    >
      {variante === "cor" ? <rect width={48} height={48} rx={13} className="fill-primary" /> : null}
      <Simbolo proposta={desenho} />
    </svg>
  )
}
