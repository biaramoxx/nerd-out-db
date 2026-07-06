import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { HelpCircle, CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy } from "lucide-react";
import { quizQuestions } from "../lib/lessons";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Quiz — DBAcademy" },
      { name: "description", content: "Teste seus conhecimentos sobre banco de dados com nosso quiz interativo." },
      { property: "og:title", content: "Quiz — DBAcademy" },
      { property: "og:description", content: "Teste seus conhecimentos sobre banco de dados com nosso quiz interativo." },
    ],
  }),
  component: QuizPage,
});

function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);

  const question = quizQuestions[current];

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelected(index);
  };

  const handleConfirm = () => {
    if (selected === null) return;
    const isCorrect = selected === question.correctIndex;
    if (isCorrect) setScore((s) => s + 1);
    setAnswers((a) => [...a, isCorrect]);
    setShowResult(true);
  };

  const handleNext = () => {
    if (current + 1 >= quizQuestions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowResult(false);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
    setFinished(false);
  };

  if (finished) {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    return (
      <div className="px-4 py-10 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
              <Trophy className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Quiz Finalizado!</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Voce acertou <span className="font-bold text-primary">{score}</span> de{" "}
            <span className="font-bold">{quizQuestions.length}</span> perguntas
          </p>

          <div className="mt-8 rounded-xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Pontuacao</span>
              <span className="text-2xl font-bold text-primary">{percentage}%</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {percentage >= 80
                ? "Excelente! Voce domina os conceitos de banco de dados."
                : percentage >= 50
                  ? "Bom trabalho! Revise os topicos que errou."
                  : "Continue estudando! Reveja as aulas e tente novamente."}
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <button
              onClick={handleRestart}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
            >
              <RotateCcw className="h-5 w-5" />
              Tentar Novamente
            </button>
            <a
              href="/aulas"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-base font-semibold text-foreground transition-colors hover:bg-accent"
            >
              <ArrowRight className="h-5 w-5" />
              Ver Aulas
            </a>
          </div>

          {/* Answers review */}
          <div className="mt-10 space-y-3 text-left">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Revisao das respostas</h3>
            {quizQuestions.map((q, idx) => (
              <div
                key={idx}
                className={`rounded-lg border p-4 ${answers[idx] ? "border-success/30 bg-success/5" : "border-destructive/30 bg-destructive/5"}`}
              >
                <div className="flex items-start gap-2">
                  {answers[idx] ? (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  ) : (
                    <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-foreground">{q.question}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{q.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <HelpCircle className="h-4 w-4" />
            Quiz Interativo
          </div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Teste seus conhecimentos</h1>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Pergunta {current + 1} de {quizQuestions.length}
            </span>
            <span className="font-medium text-primary">{score} acertos</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${((current + (showResult ? 1 : 0)) / quizQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <h2 className="mb-6 text-lg font-semibold text-foreground sm:text-xl">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, idx) => {
              const isSelected = selected === idx;
              const isCorrect = idx === question.correctIndex;
              let btnClass =
                "w-full rounded-lg border px-4 py-3 text-left text-sm transition-all";

              if (showResult) {
                if (isCorrect) {
                  btnClass += " border-success bg-success/10 text-success";
                } else if (isSelected && !isCorrect) {
                  btnClass += " border-destructive bg-destructive/10 text-destructive";
                } else {
                  btnClass += " border-border bg-muted/30 text-muted-foreground";
                }
              } else {
                btnClass += isSelected
                  ? " border-primary bg-primary/5 text-primary"
                  : " border-border bg-background text-foreground hover:bg-accent hover:border-accent";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={btnClass}
                  disabled={showResult}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                    {showResult && isCorrect && (
                      <CheckCircle2 className="ml-auto h-5 w-5 shrink-0 text-success" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <XCircle className="ml-auto h-5 w-5 shrink-0 text-destructive" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className="mt-6 rounded-lg bg-muted/50 p-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Explicacao: </span>
                {question.explanation}
              </p>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            {!showResult ? (
              <button
                onClick={handleConfirm}
                disabled={selected === null}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirmar Resposta
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {current + 1 >= quizQuestions.length ? "Ver Resultado" : "Proxima Pergunta"}
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
