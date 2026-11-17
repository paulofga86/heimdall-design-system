---
name: heimdall-design-system
description: Aplica o Heimdall Design System (camada visual sobre o Marsala DS) em telas React. Use ao criar ou revisar telas, blocos, listas com filtros, abas, cabeçalhos e a marca Heimdall.
---

# Heimdall Design System

Camada visual do Heimdall por cima do **Marsala DS** (Youx). O Marsala dá os componentes base (Button, Tabs, Toggle Group, Kpi Card, Drawer…). O Heimdall dá o jeito de montar a tela: blocos arredondados sobre fundo cinza, um bloco vinho por tela, cores com significado, filtros em pílula e a marca.

- Site: https://paulofga86.github.io/heimdall-design-system/
- Este guia: https://paulofga86.github.io/heimdall-design-system/heimdall-ds.md
- Marsala DS (base obrigatória): https://marsala-ds.youxgroup.com.br/

Stack: React 19, Tailwind CSS v4, shadcn (style `base-nova`), Base UI, Hugeicons, fonte Inter. Interface em português do Brasil.

## 1. Instalar

Faça na ordem. Pare e avise a pessoa se um passo falhar.

1. **Marsala** (se o projeto ainda não tem `components.json` com `base-nova`):
   ```bash
   pnpm dlx shadcn@latest init "https://marsala-ds.youxgroup.com.br/r/base.json" -b base -y
   ```
2. **Registros** no `components.json`:
   ```json
   {
     "registries": {
       "@youxgroup": "https://marsala-ds.youxgroup.com.br/r/{name}.json",
       "@heimdall": "https://paulofga86.github.io/heimdall-design-system/r/{name}.json"
     }
   }
   ```
3. **Kit Heimdall** (tudo de uma vez):
   ```bash
   pnpm dlx shadcn@latest add @heimdall/kit
   ```
   Ou por peça: `@heimdall/heimdall-css`, `@heimdall/tela`, `@heimdall/icone-tom`, `@heimdall/filtros`, `@heimdall/abas`, `@heimdall/logo`, `@heimdall/heimdall-skill`.
4. **CSS**: no CSS global (o mesmo que tem os tokens do Marsala), logo depois dos `@import` do topo:
   ```css
   @import "./styles/heimdall.css";
   ```
   Ajuste o caminho relativo até `styles/heimdall.css`.

Sem o instalador do shadcn: baixe os arquivos crus em `https://paulofga86.github.io/heimdall-design-system/kit/` (`heimdall.css`, `tela.tsx`, `icone-tom.tsx`, `filtros.tsx`, `abas.tsx`, `logo.tsx`, `simbolo-heimdall.ts`) e coloque em `src/components/heimdall/` (o CSS em `src/styles/`). Eles importam `cn` de `@/lib/utils` e componentes de `@/components/ui/*` do Marsala.

## 2. Regras que não mudam

1. **Nunca edite `components/ui/*`** (são do Marsala). Ajuste por `className`.
2. **Só tokens do Marsala** (`primary`, `muted`, `card`, `border`, `chart-sem-*`, `success`, `warning`, `destructive`). Nada de hex solto em tela.
3. **Fundo `heimdall-ground`** na página; todo conteúdo dentro de **blocos** `heimdall-block`.
4. **Exatamente um bloco vinho** (`heimdall-block-primary`) por tela, **sempre na coluna da direita**, logo abaixo do cabeçalho: `lg:col-start-4 lg:row-start-2` (ou `lg:col-start-3` se ocupar 2 colunas).
5. **Hover não move nada.** Só sombra ou cor, 200 a 260 ms, curva `var(--heimdall-mola)`. Sem `translate`/`scale` no hover.
6. **Cada cor de área tem um significado** (tabela na seção 4). Não use a cor de uma área em outra.
7. **Bloco dentro de bloco é proibido.** Dentro de um bloco use linhas `heimdall-linha` ou áreas `bg-muted/50`.
8. **Texto em português simples**: botões com verbo ("Salvar", "Testar conexão"), erros dizem como resolver, sem jargão interno. Termos: "Alertas" (não "violações"), "Tarefas paradas", "Projetos monitorados".
9. **Nunca ranquear pessoas.** Compare times e períodos, não indivíduos.
10. Grade com `grid-cols-1` sempre (sem isso a página alarga no celular).

## 3. Anatomia de uma tela

```tsx
import { CabecalhoTela, TituloBloco } from "@/components/heimdall/tela"

export function MinhaTela() {
  return (
    <div className="heimdall-ground min-h-svh p-3">
      <div className="heimdall-entrada grid grid-cols-1 auto-rows-min gap-3 lg:grid-cols-4">
        <CabecalhoTela titulo="Título da tela" descricao="Uma linha sobre o que a tela mostra." acoes={/* seletores, botão principal */ null} />

        {/* Conteúdo principal à esquerda */}
        <section className="heimdall-block flex flex-col gap-4 p-5 md:p-6 lg:col-span-3">
          <TituloBloco detalhe="recorte ou regra">Nome do bloco</TituloBloco>
          {/* lista, gráfico… */}
        </section>

        {/* O bloco vinho: um só, sempre à direita */}
        <section className="heimdall-block-primary flex flex-col gap-4 p-6 lg:col-start-4 lg:row-start-2 lg:sticky lg:top-3 lg:self-start">
          <h2 className="text-lg font-semibold tracking-tight">O que importa aqui</h2>
          <p className="text-sm text-primary-foreground/85">Resumo ou explicação.</p>
        </section>
      </div>
    </div>
  )
}
```

- Blocos alinhados ao topo; nunca centralize a página na altura.
- Escolhas equivalentes (três cartões de opção, por exemplo) têm o mesmo tamanho.
- Tela de detalhe: `inicio={<Button variant="outline" size="icon" className="size-9 rounded-full" aria-label="Voltar">…</Button>}`.

## 4. Cores por área

| Área | Tom (`IconeTom tom=`) | Token |
|---|---|---|
| Início, regras, marca | `vinho` | `primary` |
| Alertas | `ambar` | `chart-sem-warning` |
| Tarefas paradas | `azul` | `chart-sem-info` |
| Entregas | `violeta` | `chart-sem-violet` |
| Qualidade | `turquesa` | `chart-sem-accent` |
| Melhora, corrigido | `verde` | `success` |
| Administração | `neutro` | `muted` |

A cor aparece só no círculo do ícone e em selos pequenos (`bg-<token>/15`). Nunca como fundo de bloco.

## 5. Componentes do kit

| Precisa de | Use | Import |
|---|---|---|
| Cabeçalho da página | `CabecalhoTela` (`titulo`, `descricao`, `inicio`, `acoes`) | `@/components/heimdall/tela` |
| Título de um bloco | `TituloBloco` (`children`, `detalhe`) | `@/components/heimdall/tela` |
| Comparar com o período anterior | `Variacao` (`atual`, `anterior`, `unidade`, `melhor="maior"\|"menor"`) | `@/components/heimdall/tela` |
| Ícone com a cor da área | `IconeTom` (`icone`, `tom`, `tamanho`) | `@/components/heimdall/icone-tom` |
| Filtrar uma lista longa | `LinhaFiltros` + `FiltroMultiplo` / `FiltroUnico` / `FiltroAtalhos` + `opcoesDe` + `SemResultado` | `@/components/heimdall/filtros` |
| Separar partes de uma tela | `Tabs` do Marsala + `TrilhoAbas` + `Aba` | `@/components/heimdall/abas` |
| Logo | `Logo` (`tamanho`, `variante="cor"\|"linha"`) | `@/components/heimdall/logo` |

Do Marsala, como são: `Button` (principal em pílula: `className="heimdall-botao rounded-full"`), `ToggleGroup` (seletores Lista/Quadro, Minhas/Do meu time, com `rounded-full`), `KpiCard` (com `className="heimdall-block"`), `Drawer` (detalhe lateral), `Dialog` (confirmação comum), `AlertDialog` (só ação destrutiva), `toast.add({ title, description, type })`.

## 6. Padrões

**Filtros em pílula** (toda lista longa):
```tsx
<section className="heimdall-block flex flex-col gap-4 p-5 md:p-6 lg:col-span-3">
  <LinhaFiltros ativos={ativos} total={filtrada.length} base={lista.length} nome="tarefas" onLimpar={limpar}>
    <FiltroMultiplo nome="Projeto" icone={Folder01Icon} opcoes={opcoesDe(lista, (t) => t.projeto)} escolhidos={projetos} onChange={setProjetos} />
    <FiltroAtalhos rotulo="Tempo parada" opcoes={[{ valor: 0, rotulo: "Qualquer tempo" }, { valor: 5, rotulo: "5+ dias" }]} valor={minDias} onChange={setMinDias} />
  </LinhaFiltros>
  {filtrada.length ? <ul className="flex flex-col gap-1.5">…</ul> : <SemResultado mensagem="Nenhuma tarefa com esses filtros." onLimpar={limpar} />}
</section>
```
- A tela abre mostrando tudo; nenhum filtro é obrigatório.
- Cada opção mostra a quantidade. Filtro ligado fica em vinho claro.
- Se o filtro vale para a tela toda, os números do bloco vinho seguem o filtro.

**Lista ou quadro**: itens que andam por etapas ganham um `ToggleGroup` "Lista / Quadro" no cabeçalho. No quadro, uma coluna por etapa na ordem do fluxo, etapa vazia vira faixa estreita.

**Linhas de lista**: `className="heimdall-linha flex items-center gap-3 rounded-xl bg-muted/50 p-3"`.

**Dentro do bloco vinho**: linhas translúcidas `bg-primary-foreground/10` (hover `/15`), texto `text-primary-foreground/75` a `/85`, destaque com círculo `bg-primary-foreground text-primary`. Sem linhas brancas sólidas e sem selos coloridos.

**Cartão que leva a outra tela**: `heimdall-acesso` (só a sombra cresce no hover).

## 7. Antes de entregar

- [ ] Um bloco vinho, na coluna da direita.
- [ ] Nada se move no hover.
- [ ] Só tokens do Marsala; cores de área no lugar certo.
- [ ] Funciona em 1440px e 375px, tema claro e escuro.
- [ ] Teclado e leitor de tela: botões só com ícone têm `aria-label`; estado nunca só por cor.
- [ ] Textos em português, com verbo nos botões e erros que dizem como resolver.
- [ ] Sem rótulo pequeno em cima de título, sem texto com gradiente, sem sombra dura, sem borda lateral colorida grossa.
