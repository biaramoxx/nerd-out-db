import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, FlaskConical, HelpCircle, Database, ArrowRight, ChevronRight } from "lucide-react";
import { lessons } from "../lib/lessons";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DBAcademy — Aprenda Banco de Dados" },
      { name: "description", content: "Aprenda banco de dados de forma interativa com aulas, quiz e playground SQL. Do zero ao avancado." },
      { property: "og:title", content: "DBAcademy — Aprenda Banco de Dados" },
      { property: "og:description", content: "Aprenda banco de dados de forma interativa com aulas, quiz e playground SQL." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const categories = [...new Set(lessons.map((l) => l.category))];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/10 px-4 py-20 sm:px-6 sm:py-28">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
            <Database className="mr-2 h-4 w-4" />
            Curso interativo e gratuito
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl">
            Domine Bancos de Dados
            <span className="block text-primary">do Zero ao Avancado</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Aprenda SQL, modelagem de dados, normalizacao e muito mais com aulas praticas, 
            quiz interativo e um playground para testar seus comandos.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/aulas"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-primary/30"
            >
              Comecar a aprender
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/playground"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-base font-semibold text-foreground transition-colors hover:bg-accent"
            >
              <FlaskConical className="h-5 w-5" />
              Ir ao Playground
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-muted/30 px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 sm:grid-cols-4">
          <Stat value={String(lessons.length)} label="Aulas" />
          <Stat value={String(8)} label="Topicos" />
          <Stat value={String(8)} label="Perguntas no Quiz" />
          <Stat value="∞" label="Possibilidades SQL" />
        </div>
      </section>

      {/* Modules Preview */}
      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Conteudo do Curso
            </h2>
            <p className="mt-4 text-muted-foreground">
              Um caminho estruturado para dominar bancos de dados relacionais
            </p>
          </div>

          {categories.map((cat) => (
            <div key={cat} className="mb-10">
              <h3 className="mb-4 text-lg font-semibold text-foreground">{cat}</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {lessons
                  .filter((l) => l.category === cat)
                  .map((lesson) => (
                    <Link
                      key={lesson.id}
                      to="/aulas/$id"
                      params={{ id: lesson.id }}
                      className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <LessonIcon name={lesson.icon} />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">
                          Aula {lesson.order}
                        </span>
                      </div>
                      <h4 className="mb-1 font-semibold text-foreground group-hover:text-primary">
                        {lesson.title}
                      </h4>
                      <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                        {lesson.description}
                      </p>
                      <div className="mt-auto flex items-center text-sm font-medium text-primary">
                        Estudar
                        <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Pronto para testar seus conhecimentos?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Responda o quiz e veja o quanto voce ja aprendeu sobre banco de dados.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/quiz"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
            >
              <HelpCircle className="h-5 w-5" />
              Fazer Quiz
            </Link>
            <Link
              to="/aulas"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-base font-semibold text-foreground transition-colors hover:bg-accent"
            >
              <BookOpen className="h-5 w-5" />
              Ver Aulas
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-extrabold text-primary sm:text-4xl">{value}</div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function LessonIcon({ name }: { name: string }) {
  const iconClass = "h-4.5 w-4.5";
  switch (name) {
    case "Database": return <Database className={iconClass} />;
    case "Table2": return <BookOpen className={iconClass} />;
    case "KeyRound": return <BookOpen className={iconClass} />;
    case "Search": return <BookOpen className={iconClass} />;
    case "Pencil": return <BookOpen className={iconClass} />;
    case "GitMerge": return <BookOpen className={iconClass} />;
    case "Layers": return <BookOpen className={iconClass} />;
    case "Zap": return <BookOpen className={iconClass} />;
    default: return <BookOpen className={iconClass} />;
  }
}
