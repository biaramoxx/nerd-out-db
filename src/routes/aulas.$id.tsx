import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ChevronRight, BookOpen, Code2, Table2 } from "lucide-react";
import { lessons } from "../lib/lessons";

export const Route = createFileRoute("/aulas/$id")({
  loader: ({ params }) => {
    const lesson = lessons.find((l) => l.id === params.id);
    if (!lesson) throw notFound();
    return lesson;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.title} — DBAcademy` },
      { name: "description", content: loaderData.description },
      { property: "og:title", content: `${loaderData.title} — DBAcademy` },
      { property: "og:description", content: loaderData.description },
    ],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-[50vh] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">Aula nao encontrada</h1>
        <p className="mt-2 text-muted-foreground">Esta aula nao existe no nosso curso.</p>
        <Link to="/aulas" className="mt-6 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Ver todas as aulas
        </Link>
      </div>
    </div>
  ),
  component: LessonPage,
});

function LessonPage() {
  const lesson = Route.useLoaderData();
  const currentIndex = lessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  return (
    <div className="px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/aulas" className="hover:text-foreground">Aulas</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">{lesson.title}</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <span className="mb-2 inline-block rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
            {lesson.category} — Aula {lesson.order}
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {lesson.title}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">{lesson.description}</p>
        </div>

        {/* Content */}
        <div className="space-y-10">
          {lesson.content.map((section, idx) => (
            <article
              key={idx}
              className="animate-fade-in-up rounded-xl border border-border bg-card p-6 shadow-sm"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
                <BookOpen className="h-5 w-5 text-primary" />
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.body.split("\n\n").map((paragraph, pIdx) => (
                  <p key={pIdx} className="whitespace-pre-line leading-relaxed text-foreground/90">
                    {paragraph}
                  </p>
                ))}
              </div>

              {section.code && (
                <div className="mt-6 overflow-hidden rounded-lg bg-[#1e1e2e] shadow-lg">
                  <div className="flex items-center gap-1.5 border-b border-white/10 bg-[#252536] px-4 py-2">
                    <Code2 className="h-4 w-4 text-primary" />
                    <span className="text-xs font-medium text-white/60">SQL</span>
                  </div>
                  <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
                    <code className="font-mono text-[#a6e3a1]">{section.code}</code>
                  </pre>
                </div>
              )}

              {section.table && (
                <div className="mt-6 overflow-hidden rounded-lg border border-border shadow-sm">
                  <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-2">
                    <Table2 className="h-4 w-4 text-primary" />
                    <span className="text-xs font-medium text-muted-foreground">Tabela de exemplo</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-muted/30">
                          {section.table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="px-4 py-2.5 text-left font-semibold text-foreground">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="border-b border-border last:border-0">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="px-4 py-2.5 text-muted-foreground">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-12 flex items-center justify-between gap-4 border-t border-border pt-8">
          {prevLesson ? (
            <Link
              to="/aulas/$id"
              params={{ id: prevLesson.id }}
              className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              <ArrowLeft className="h-4 w-4" />
              <div className="text-left">
                <div className="text-xs text-muted-foreground">Anterior</div>
                <div className="max-w-[160px] truncate">{prevLesson.title}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {nextLesson ? (
            <Link
              to="/aulas/$id"
              params={{ id: nextLesson.id }}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <div className="text-right">
                <div className="text-xs text-primary-foreground/70">Proxima</div>
                <div className="max-w-[160px] truncate">{nextLesson.title}</div>
              </div>
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}
