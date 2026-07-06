import { Link } from "@tanstack/react-router";
import { Database, BookOpen, FlaskConical, HelpCircle } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-primary transition-colors hover:text-primary/80">
          <Database className="h-6 w-6" />
          <span>DBAcademy</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <NavLink to="/" icon={<Database className="h-4 w-4" />} label="Início" />
          <NavLink to="/aulas" icon={<BookOpen className="h-4 w-4" />} label="Aulas" />
          <NavLink to="/playground" icon={<FlaskConical className="h-4 w-4" />} label="Playground" />
          <NavLink to="/quiz" icon={<HelpCircle className="h-4 w-4" />} label="Quiz" />
        </nav>
      </div>
    </header>
  );
}

function NavLink({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      to={to}
      activeProps={{ className: "bg-primary/10 text-primary font-medium" }}
      className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </Link>
  );
}
