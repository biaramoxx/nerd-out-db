import { Database, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-border bg-muted/30">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row sm:px-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Database className="h-4 w-4" />
          <span>DBAcademy — Aprenda Banco de Dados</span>
        </div>
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          Feito com <Heart className="h-3 w-3 text-destructive" /> para estudantes
        </p>
      </div>
    </footer>
  );
}
