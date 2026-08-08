import type { SimulationRecord } from '@/data/simulation'

export function formatSimulationDeadline(record: SimulationRecord) {
  const deadline = Number.parseInt(record.goalDeadline)
  const unit = deadline > 1 ? 'meses' : 'mês'
  return `${deadline} ${unit}`
}
