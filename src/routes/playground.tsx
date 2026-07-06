import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Play, RotateCcw, FlaskConical, Info } from "lucide-react";

export const Route = createFileRoute("/playground")({
  head: () => ({
    meta: [
      { title: "Playground SQL — DBAcademy" },
      { name: "description", content: "Pratique comandos SQL em um ambiente seguro e interativo." },
      { property: "og:title", content: "Playground SQL — DBAcademy" },
      { property: "og:description", content: "Pratique comandos SQL em um ambiente seguro e interativo." },
    ],
  }),
  component: PlaygroundPage,
});

interface TableData {
  headers: string[];
  rows: string[][];
}

const initialTables: Record<string, TableData> = {
  clientes: {
    headers: ["id", "nome", "email", "idade"],
    rows: [
      ["1", "Ana Silva", "ana@email.com", "28"],
      ["2", "Bruno Costa", "bruno@email.com", "34"],
      ["3", "Carla Souza", "carla@email.com", "22"],
      ["4", "Daniel Lima", "daniel@email.com", "30"],
      ["5", "Elisa Mendes", "elisa@email.com", "26"],
    ],
  },
  produtos: {
    headers: ["id", "nome", "preco", "estoque"],
    rows: [
      ["1", "Teclado Mecanico", "350.00", "15"],
      ["2", "Mouse Gamer", "120.00", "30"],
      ["3", "Monitor 27\"", "1200.00", "8"],
      ["4", "Headset", "250.00", "20"],
      ["5", "Webcam HD", "180.00", "12"],
    ],
  },
  pedidos: {
    headers: ["id", "cliente_id", "produto_id", "quantidade", "data"],
    rows: [
      ["1", "1", "2", "1", "2024-01-15"],
      ["2", "2", "1", "2", "2024-01-16"],
      ["3", "1", "3", "1", "2024-01-17"],
      ["4", "3", "4", "1", "2024-01-18"],
      ["5", "4", "5", "2", "2024-01-19"],
    ],
  },
};

const sampleQueries = [
  "SELECT * FROM clientes;",
  "SELECT nome, email FROM clientes WHERE idade > 25;",
  "SELECT * FROM produtos WHERE preco < 200;",
  "SELECT clientes.nome, pedidos.quantidade FROM clientes JOIN pedidos ON clientes.id = pedidos.cliente_id;",
];

function PlaygroundPage() {
  const [query, setQuery] = useState("SELECT * FROM clientes;");
  const [result, setResult] = useState<TableData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const executeQuery = () => {
    setError(null);
    setResult(null);

    const trimmed = query.trim().toLowerCase();

    if (!trimmed.startsWith("select")) {
      setError("Por seguranca, apenas comandos SELECT sao permitidos neste playground.");
      return;
    }

    try {
      const res = parseSelect(query.trim());
      setResult(res);
      setHistory((h) => [query.trim(), ...h].slice(0, 10));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao executar consulta");
    }
  };

  const handleReset = () => {
    setQuery("SELECT * FROM clientes;");
    setResult(null);
    setError(null);
  };

  return (
    <div className="px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <FlaskConical className="h-4 w-4" />
            Playground SQL
          </div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Pratique SQL</h1>
          <p className="mt-2 text-muted-foreground">
            Execute comandos SELECT em tabelas pre-carregadas e veja os resultados em tempo real.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Sidebar: Tables */}
          <div className="space-y-4 lg:col-span-1">
            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Tabelas disponiveis</h3>
              <div className="space-y-3">
                {Object.entries(initialTables).map(([name, table]) => (
                  <div key={name} className="rounded-lg border border-border bg-muted/30 p-3">
                    <div className="mb-2 font-mono text-sm font-semibold text-primary">{name}</div>
                    <div className="flex flex-wrap gap-1">
                      {table.headers.map((h) => (
                        <span
                          key={h}
                          className="rounded bg-background px-1.5 py-0.5 text-xs text-muted-foreground"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Consultas de exemplo</h3>
              <div className="space-y-2">
                {sampleQueries.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setQuery(q);
                      setResult(null);
                      setError(null);
                    }}
                    className="w-full rounded-lg bg-muted/50 px-3 py-2 text-left font-mono text-xs text-foreground transition-colors hover:bg-muted"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {history.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <h3 className="mb-3 text-sm font-semibold text-foreground">Historico</h3>
                <div className="space-y-2">
                  {history.map((h, idx) => (
                    <button
                      key={idx}
                      onClick={() => setQuery(h)}
                      className="w-full rounded-lg bg-muted/50 px-3 py-2 text-left font-mono text-xs text-foreground transition-colors hover:bg-muted truncate"
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main: Query + Results */}
          <div className="space-y-4 lg:col-span-2">
            <div className="rounded-xl border border-border bg-card shadow-sm">
              <div className="flex items-center gap-2 border-b border-border px-5 py-3">
                <Info className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Apenas SELECT e permitido. Tente JOIN, WHERE e ORDER BY.
                </span>
              </div>
              <div className="p-5">
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.metaKey) {
                      e.preventDefault();
                      executeQuery();
                    }
                  }}
                  className="h-32 w-full resize-none rounded-lg border border-input bg-background p-4 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                  placeholder="Digite seu comando SQL aqui..."
                  spellCheck={false}
                />
                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={executeQuery}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    <Play className="h-4 w-4" />
                    Executar
                  </button>
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Resetar
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-5">
                <p className="text-sm font-medium text-destructive">{error}</p>
              </div>
            )}

            {result && (
              <div className="rounded-xl border border-border bg-card shadow-sm">
                <div className="border-b border-border px-5 py-3">
                  <h3 className="text-sm font-semibold text-foreground">
                    Resultado ({result.rows.length} {result.rows.length === 1 ? "linha" : "linhas"})
                  </h3>
                </div>
                <div className="overflow-x-auto p-5">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        {result.headers.map((h, idx) => (
                          <th
                            key={idx}
                            className="px-3 py-2.5 text-left font-semibold text-foreground"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {result.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="border-b border-border last:border-0">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="px-3 py-2.5 text-muted-foreground">
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
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple SQL parser for SELECT only
function parseSelect(query: string): TableData {
  const normalized = query.replace(/\s+/g, " ").trim().toLowerCase();

  if (!normalized.startsWith("select")) {
    throw new Error("Apenas comandos SELECT sao suportados.");
  }

  // Extract FROM table
  const fromMatch = normalized.match(/from\s+(\w+)/);
  if (!fromMatch) throw new Error("Comando SELECT precisa de uma clausula FROM.");

  const tableName = fromMatch[1];
  const table = initialTables[tableName];
  if (!table) throw new Error(`Tabela '${tableName}' nao encontrada. Tabelas disponiveis: ${Object.keys(initialTables).join(", ")}`);

  let headers = [...table.headers];
  let rows = table.rows.map((r) => [...r]);

  // Handle SELECT columns
  const selectMatch = normalized.match(/select\s+(.+?)\s+from/);
  if (selectMatch) {
    const cols = selectMatch[1].split(",").map((c) => c.trim());
    if (!cols.includes("*")) {
      const colIndices = cols.map((c) => {
        const idx = table.headers.indexOf(c);
        if (idx === -1) throw new Error(`Coluna '${c}' nao existe na tabela '${tableName}'.`);
        return idx;
      });
      headers = colIndices.map((i) => table.headers[i]);
      rows = rows.map((r) => colIndices.map((i) => r[i]));
    }
  }

  // Handle JOIN
  const joinMatch = normalized.match(/join\s+(\w+)\s+on\s+(.+)/);
  if (joinMatch) {
    const joinTableName = joinMatch[1];
    const onClause = joinMatch[2];
    const joinTable = initialTables[joinTableName];
    if (!joinTable) throw new Error(`Tabela '${joinTableName}' nao encontrada para JOIN.`);

    // Parse ON like: table1.col = table2.col
    const onParts = onClause.match(/(\w+)\.(\w+)\s*=\s*(\w+)\.(\w+)/);
    if (onParts) {
      const [, t1, c1, t2, c2] = onParts;
      const leftTable = t1 === tableName ? table : joinTable;
      const rightTable = t2 === tableName ? table : joinTable;
      const leftColIdx = leftTable.headers.indexOf(c1);
      const rightColIdx = rightTable.headers.indexOf(c2);

      if (leftColIdx === -1 || rightColIdx === -1) {
        throw new Error("Coluna de JOIN nao encontrada.");
      }

      const isLeftMain = leftTable === table;
      const joinedHeaders = [...table.headers, ...joinTable.headers.map((h) => `${joinTableName}.${h}`)];
      const joinedRows: string[][] = [];

      for (const leftRow of isLeftMain ? rows : joinTable.rows) {
        for (const rightRow of isLeftMain ? joinTable.rows : rows) {
          if (leftRow[leftColIdx] === rightRow[rightColIdx]) {
            joinedRows.push([...leftRow, ...rightRow]);
          }
        }
      }

      headers = joinedHeaders;
      rows = joinedRows;
    }
  }

  // Handle WHERE
  const whereMatch = normalized.match(/where\s+(.+?)(?:order|limit|join|group|$)/);
  if (whereMatch) {
    const condition = whereMatch[1].trim();
    rows = rows.filter((row) => evaluateCondition(condition, headers, row));
  }

  // Handle ORDER BY
  const orderMatch = normalized.match(/order\s+by\s+(\w+)(?:\s+(asc|desc))?/);
  if (orderMatch) {
    const col = orderMatch[1];
    const dir = orderMatch[2] || "asc";
    const colIdx = headers.indexOf(col);
    if (colIdx !== -1) {
      rows.sort((a, b) => {
        const av = a[colIdx];
        const bv = b[colIdx];
        const an = parseFloat(av);
        const bn = parseFloat(bv);
        if (!isNaN(an) && !isNaN(bn)) {
          return dir === "desc" ? bn - an : an - bn;
        }
        return dir === "desc" ? bv.localeCompare(av) : av.localeCompare(bv);
      });
    }
  }

  // Handle LIMIT
  const limitMatch = normalized.match(/limit\s+(\d+)/);
  if (limitMatch) {
    rows = rows.slice(0, parseInt(limitMatch[1], 10));
  }

  return { headers, rows };
}

function evaluateCondition(condition: string, headers: string[], row: string[]): boolean {
  const normalized = condition.trim();

  // col = value
  const eqMatch = normalized.match(/^(\w+)\s*=\s*['"]?(.+?)['"]?$/);
  if (eqMatch) {
    const [, col, val] = eqMatch;
    const idx = headers.indexOf(col);
    if (idx === -1) throw new Error(`Coluna '${col}' nao encontrada.`);
    return row[idx] === val;
  }

  // col > value (numeric)
  const gtMatch = normalized.match(/^(\w+)\s*>\s*([\d.]+)$/);
  if (gtMatch) {
    const [, col, val] = gtMatch;
    const idx = headers.indexOf(col);
    if (idx === -1) throw new Error(`Coluna '${col}' nao encontrada.`);
    return parseFloat(row[idx]) > parseFloat(val);
  }

  // col < value (numeric)
  const ltMatch = normalized.match(/^(\w+)\s*<\s*([\d.]+)$/);
  if (ltMatch) {
    const [, col, val] = ltMatch;
    const idx = headers.indexOf(col);
    if (idx === -1) throw new Error(`Coluna '${col}' nao encontrada.`);
    return parseFloat(row[idx]) < parseFloat(val);
  }

  // col >= value
  const gteMatch = normalized.match(/^(\w+)\s*>=\s*([\d.]+)$/);
  if (gteMatch) {
    const [, col, val] = gteMatch;
    const idx = headers.indexOf(col);
    if (idx === -1) throw new Error(`Coluna '${col}' nao encontrada.`);
    return parseFloat(row[idx]) >= parseFloat(val);
  }

  // col <= value
  const lteMatch = normalized.match(/^(\w+)\s*<=\s*([\d.]+)$/);
  if (lteMatch) {
    const [, col, val] = lteMatch;
    const idx = headers.indexOf(col);
    if (idx === -1) throw new Error(`Coluna '${col}' nao encontrada.`);
    return parseFloat(row[idx]) <= parseFloat(val);
  }

  // col LIKE 'value%'
  const likeMatch = normalized.match(/^(\w+)\s+like\s+['"](.+?)['"]$/);
  if (likeMatch) {
    const [, col, pattern] = likeMatch;
    const idx = headers.indexOf(col);
    if (idx === -1) throw new Error(`Coluna '${col}' nao encontrada.`);
    const val = row[idx];
    if (pattern.startsWith("%") && pattern.endsWith("%")) {
      return val.includes(pattern.slice(1, -1));
    }
    if (pattern.endsWith("%")) {
      return val.startsWith(pattern.slice(0, -1));
    }
    if (pattern.startsWith("%")) {
      return val.endsWith(pattern.slice(1));
    }
    return val === pattern;
  }

  return true;
}
