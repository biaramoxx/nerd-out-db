import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import { lessons } from "../lib/lessons";

export const Route = createFileRoute("/aulas")({
  head: () => ({
    meta: [
      { title: "Aulas — DBAcademy" },
      { name: "description", content: "Explore todas as aulas do curso de banco de dados." },
      { property: "og:title", content: "Aulas — DBAcademy" },
      { property: "og:description", content: "Explore todas as aulas do curso de banco de dados." },
    ],
  }),
  component: AulasPage,
});

function AulasPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = [...new Set(lessons.map((l) => l.category))];

  const filtered = lessons.filter((l) => {
    const matchesSearch =
      l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory ? l.category === activeCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Todas as Aulas
          </h1>
          <p className="mt-3 text-muted-foreground">
            Escolha um topico e comece a aprender sobre banco de dados
          </p>
        </div>

        {/* Search + Filter */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar aulas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                activeCategory === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              Todos
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Lessons List */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((lesson) => (
            <Link
              key={lesson.id}
              to="/aulas/$id"
              params={{ id: lesson.id }}
              className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BookOpen className="h-4.5 w-4.5" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">{lesson.category}</span>
              </div>
              <h3 className="mb-1 font-semibold text-foreground group-hover:text-primary">
                {lesson.order}. {lesson.title}
              </h3>
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

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">Nenhuma aula encontrada.</p>
          </div>
        )}
      </div>
    </div>
  );
}
