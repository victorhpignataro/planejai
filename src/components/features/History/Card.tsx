import { addMonths } from 'date-fns'
import { ExternalLink, Goal, Trash2 } from 'lucide-react'

import { Button } from '@/components/shared/Button'
import { Divider } from '@/components/shared/Divider'
import { useSimulationStorage } from '@/hooks/useSimulationStorage'
import { formatSimulationDeadline } from '@/utils/history'
import { calcMonthlySavings } from '@/utils/simulation'

interface CardProps {
  data: SimulationRecord
  onDeleteSimulation: (id: string) => void
  onViewDetails: (id: string) => void
}

export function HistoryCard({
  data,
  onDeleteSimulation,
  onViewDetails,
}: CardProps) {
  const { deleteSimulation } = useSimulationStorage()
  return (
    <div
      className={
        'bg-card rounded-2xl p-8 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]'
      }
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-6">
        <div className="flex items-center justify-start">
          <div className="bg-history-card-background rounded-xl p-3">
            <Goal size={26} className={'text-primary'} />
          </div>
        </div>
        <div className="grid flex-1 grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="flex flex-col gap-1">
            <p
              className={['text-base font-semibold', 'text-balance'].join(' ')}
            >
              {data.goalName}
            </p>
            <p className={['text-sm'].join(' ')}>
              {addMonths(
                new Date(),
                Number(data.goalDeadline),
              ).toLocaleDateString()}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-muted-foreground text-sm font-semibold uppercase">
              Custo da Meta
            </p>
            <p className={['text-base font-semibold'].join(' ')}>
              R${data.goalAmount}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-muted-foreground text-sm font-semibold uppercase">
              Prazo
            </p>
            <p className={['text-base font-semibold'].join(' ')}>
              {formatSimulationDeadline(data)}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-muted-foreground text-sm font-semibold uppercase">
              Economia Mensal
            </p>
            <p className={['text-base font-semibold'].join(' ')}>
              R$
              {calcMonthlySavings(data).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
        <Divider orientation="vertical" className="hidden lg:block" />
        <Divider orientation="horizontal" className="lg:hidden" />
        <div className="flex items-center justify-center gap-8">
          <div className="flex flex-1 justify-center lg:flex-none lg:justify-start">
            <Button
              onClick={() => {
                deleteSimulation(data.id)
                onDeleteSimulation(data.id)
              }}
              variant="ghost"
              size="fit"
            >
              <Trash2 className={'text-red-500'} />
            </Button>
          </div>
          <div className="flex flex-1 justify-center lg:flex-none lg:justify-start">
            <Button
              variant="secondary"
              icon={ExternalLink}
              onClick={() => {
                onViewDetails(data.id)
              }}
            >
              <span className="hidden sm:inline">Ver detalhes</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
