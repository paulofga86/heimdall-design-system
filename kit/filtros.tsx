/**
 * Filtros em pílulas, usados acima de listas longas (Tarefas paradas, Meus alertas, Alertas dos times).
 * Regra no README §7: pílula de contorno fino que abre um menu com cada opção e sua quantidade;
 * ligada, fica em vinho claro e mostra o valor escolhido. Sempre com "X de Y" e "Limpar filtros".
 */
import * as React from "react"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import { ArrowDown01Icon, Cancel01Icon, FilterRemoveIcon } from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

export type OpcaoFiltro = { valor: string; rotulo: string; qtd: number }

/**
 * Opções de um filtro a partir dos itens da lista, com a quantidade de cada uma.
 * Sem `ordem`, as mais frequentes vêm primeiro.
 */
export function opcoesDe<T>(lista: T[], campo: (item: T) => string, ajustes: { ordem?: readonly string[]; rotulo?: (valor: string) => string } = {}): OpcaoFiltro[] {
  const contagem = new Map<string, number>()
  lista.forEach((item) => contagem.set(campo(item), (contagem.get(campo(item)) ?? 0) + 1))
  const valores = ajustes.ordem
    ? ajustes.ordem.filter((v) => contagem.has(v))
    : [...contagem.keys()].sort((a, b) => contagem.get(b)! - contagem.get(a)! || a.localeCompare(b))
  return valores.map((v) => ({ valor: v, rotulo: ajustes.rotulo ? ajustes.rotulo(v) : v, qtd: contagem.get(v)! }))
}

function classesPilula(ativo: boolean) {
  return cn(
    "h-8 gap-1.5 rounded-full px-3 text-xs font-medium",
    ativo ? "border-primary/35 bg-primary/8 text-primary hover:bg-primary/12 dark:border-primary/50" : "text-foreground"
  )
}

function Gatilho({ icone, ativo, children }: { icone: IconSvgElement; ativo: boolean; children: React.ReactNode }) {
  return (
    <DropdownMenuTrigger render={<Button variant="outline" size="sm" className={classesPilula(ativo)} />}>
      <HugeiconsIcon icon={icone} strokeWidth={2} className="size-3.5" />
      <span className="max-w-44 truncate">{children}</span>
      <HugeiconsIcon icon={ArrowDown01Icon} strokeWidth={2} className="size-3.5 opacity-60" />
    </DropdownMenuTrigger>
  )
}

function Quantidade({ qtd }: { qtd: number }) {
  return <span className="text-xs text-muted-foreground tabular-nums">{qtd}</span>
}

/** Escolha de vários valores; o menu fica aberto enquanto a pessoa marca. */
export function FiltroMultiplo({
  nome,
  icone,
  opcoes,
  escolhidos,
  onChange,
}: {
  nome: string
  icone: IconSvgElement
  opcoes: OpcaoFiltro[]
  escolhidos: string[]
  onChange: (valores: string[]) => void
}) {
  const ativo = escolhidos.length > 0
  const rotulo =
    escolhidos.length === 0
      ? nome
      : escolhidos.length === 1
        ? (opcoes.find((o) => o.valor === escolhidos[0])?.rotulo ?? escolhidos[0])
        : `${nome} · ${escolhidos.length}`
  return (
    <DropdownMenu>
      <Gatilho icone={icone} ativo={ativo}>
        {rotulo}
      </Gatilho>
      <DropdownMenuContent className="max-h-80 min-w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{nome}</DropdownMenuLabel>
          {opcoes.map((o) => (
            <DropdownMenuCheckboxItem
              key={o.valor}
              checked={escolhidos.includes(o.valor)}
              closeOnClick={false}
              onCheckedChange={(marcado) => onChange(marcado ? [...escolhidos, o.valor] : escolhidos.filter((v) => v !== o.valor))}
            >
              <span className="flex-1 truncate">{o.rotulo}</span>
              <Quantidade qtd={o.qtd} />
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuGroup>
        {ativo ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onChange([])}>Mostrar todos</DropdownMenuItem>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/** Escolha de um valor só (ex.: milestone). `null` = todos. */
export function FiltroUnico({
  nome,
  icone,
  opcoes,
  valor,
  onChange,
  rotuloTodos = "Todas",
}: {
  nome: string
  icone: IconSvgElement
  opcoes: OpcaoFiltro[]
  valor: string | null
  onChange: (valor: string | null) => void
  rotuloTodos?: string
}) {
  return (
    <DropdownMenu>
      <Gatilho icone={icone} ativo={valor !== null}>
        {valor === null ? nome : (opcoes.find((o) => o.valor === valor)?.rotulo ?? valor)}
      </Gatilho>
      <DropdownMenuContent className="max-h-80 min-w-60">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{nome}</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={valor ?? "__todos"} onValueChange={(v) => onChange(v === "__todos" ? null : String(v))}>
            <DropdownMenuRadioItem value="__todos">{rotuloTodos}</DropdownMenuRadioItem>
            {opcoes.map((o) => (
              <DropdownMenuRadioItem key={o.valor} value={o.valor}>
                <span className="flex-1 truncate">{o.rotulo}</span>
                <Quantidade qtd={o.qtd} />
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/**
 * Atalhos de um clique, lado a lado. A primeira opção é o padrão (sem filtro);
 * as outras ficam em vinho claro quando escolhidas.
 */
export function FiltroAtalhos<V extends string | number>({
  rotulo,
  opcoes,
  valor,
  onChange,
}: {
  rotulo: string
  opcoes: { valor: V; rotulo: string; qtd?: number }[]
  valor: V
  onChange: (valor: V) => void
}) {
  return (
    <ToggleGroup
      variant="outline"
      size="sm"
      spacing={0}
      value={[String(valor)]}
      onValueChange={(v) => {
        const escolhida = opcoes.find((o) => String(o.valor) === v[0])
        if (escolhida) onChange(escolhida.valor)
      }}
      aria-label={rotulo}
      className="rounded-full"
    >
      {opcoes.map((o, i) => (
        <ToggleGroupItem
          key={String(o.valor)}
          value={String(o.valor)}
          className={cn(
            "h-8 gap-1.5 px-3 text-xs first:rounded-l-full! last:rounded-r-full!",
            i > 0 && "aria-pressed:bg-primary/8 aria-pressed:text-primary"
          )}
        >
          {o.rotulo}
          {o.qtd !== undefined ? <span className="text-muted-foreground tabular-nums">{o.qtd}</span> : null}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

/** A linha de filtros: pílulas, "Limpar filtros" quando há filtro e a contagem "X de Y" no fim. */
export function LinhaFiltros({
  ativos,
  total,
  base,
  nome,
  onLimpar,
  children,
}: {
  ativos: number
  total: number
  base: number
  /** Plural do que está sendo contado: "tarefas", "alertas". */
  nome: string
  onLimpar: () => void
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filtros">
      {children}
      {ativos ? (
        <Button variant="ghost" size="sm" className="h-8 gap-1 rounded-full px-2.5 text-xs text-muted-foreground" onClick={onLimpar}>
          <HugeiconsIcon icon={Cancel01Icon} strokeWidth={2} className="size-3.5" />
          Limpar filtros
        </Button>
      ) : null}
      <span className="ml-auto pl-1 text-xs text-muted-foreground tabular-nums" aria-live="polite">
        {ativos ? `${total} de ${base} ${nome}` : `${base} ${nome}`}
      </span>
    </div>
  )
}

/** Quando os filtros escondem tudo: diz isso e oferece limpar. */
export function SemResultado({ mensagem, onLimpar }: { mensagem: string; onLimpar: () => void }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl bg-muted/50 p-8 text-center text-sm">
      <HugeiconsIcon icon={FilterRemoveIcon} strokeWidth={2} className="size-5 text-muted-foreground" />
      <span className="text-muted-foreground">{mensagem}</span>
      <button type="button" onClick={onLimpar} className="text-sm font-medium text-primary underline-offset-4 hover:underline">
        Limpar filtros
      </button>
    </div>
  )
}
