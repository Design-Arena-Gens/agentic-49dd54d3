import clsx from 'clsx';
import type { QuickStat } from '@/lib/data';

const trendLabel: Record<QuickStat['trend'], string> = {
  up: 'Trending up',
  down: 'Trending down',
  stable: 'Stable trend'
};

export function QuickStatCard({ stat }: { stat: QuickStat }) {
  return (
    <article className="quick-stat glass-panel">
      <div className="quick-stat__label">
        <span>{stat.label}</span>
        <span className={clsx('quick-stat__trend', `quick-stat__trend--${stat.trend}`)}>
          {stat.delta}
        </span>
      </div>
      <div className="quick-stat__value" aria-label={trendLabel[stat.trend]}>
        {stat.value}
      </div>
    </article>
  );
}
