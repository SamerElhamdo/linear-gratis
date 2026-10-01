'use client'

import type { RoadmapProjectProgress } from '@/lib/linear'
import { useI18n } from '@/lib/i18n/client'

interface ProjectProgressProps {
  projects: RoadmapProjectProgress[]
}

/**
 * One bar per roadmap project, using Linear's own completion figure so the
 * numbers match what the team sees in Linear.
 */
export function ProjectProgress({ projects }: ProjectProgressProps) {
  const { t, intlLocale } = useI18n()

  if (projects.length === 0) return null

  const formatDate = (date: string) =>
    new Date(`${date}T00:00:00`).toLocaleDateString(intlLocale, { month: 'short', day: 'numeric' })

  return (
    <section
      aria-label={t("Progress by project")}
      className="mb-4 rounded-lg border border-border bg-card px-3 py-3 sm:mb-6 sm:px-4"
    >
      <h2 className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {t("Progress by project")}
      </h2>
      <ul className="grid gap-x-8 gap-y-3 md:grid-cols-2">
        {projects.map((project) => {
          const percent = Math.round(project.progress * 100)
          const color = project.color || 'var(--primary)'
          return (
            <li key={project.id} className="min-w-0">
              <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
                <span className="truncate font-medium" title={project.name}>{project.name}</span>
                <span className="shrink-0 tabular-nums text-muted-foreground">
                  {project.targetDate && (
                    <span className="me-2 text-xs">{t("Target {date}", { date: formatDate(project.targetDate) })}</span>
                  )}
                  {percent}%
                </span>
              </div>
              <div
                role="progressbar"
                aria-label={project.name}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percent}
                className="h-2 w-full overflow-hidden rounded-full bg-muted"
              >
                <div
                  className="h-full rounded-full transition-[width] duration-500 motion-reduce:transition-none"
                  style={{ width: `${percent}%`, backgroundColor: color }}
                />
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
