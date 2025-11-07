import { format, parseISO } from 'date-fns';
import type { Plant, TimelineEvent } from '@/lib/data';

const eventAccent: Record<TimelineEvent['type'], string> = {
  water: 'care-timeline__marker--water',
  mist: 'care-timeline__marker--mist',
  fertilize: 'care-timeline__marker--fertilize',
  prune: 'care-timeline__marker--prune',
  repot: 'care-timeline__marker--repot',
  growth: 'care-timeline__marker--growth'
};

type Props = {
  events: TimelineEvent[];
  plants: Plant[];
};

export function CareTimeline({ events, plants }: Props) {
  const lookup = new Map(plants.map((plant) => [plant.id, plant]));
  const sorted = [...events].sort(
    (a, b) => parseISO(b.timestamp).getTime() - parseISO(a.timestamp).getTime()
  );

  return (
    <section className="care-timeline glass-panel">
      <header className="care-timeline__header">
        <h2>Care journal</h2>
        <p>Recent milestones, growth spurts, and wellbeing rituals.</p>
      </header>
      <ol className="care-timeline__list">
        {sorted.map((event) => {
          const plant = lookup.get(event.plantId);
          const date = parseISO(event.timestamp);

          return (
            <li key={event.id} className="care-timeline__item">
              <div className={`care-timeline__marker ${eventAccent[event.type]}`} />
              <div className="care-timeline__content">
                <div className="care-timeline__content-header">
                  <h3>{event.label}</h3>
                  <span className="care-timeline__time">{format(date, 'MMM d, h:mm a')}</span>
                </div>
                <p className="care-timeline__note">{event.note}</p>
                {plant && (
                  <span className="care-timeline__plant">
                    <span aria-hidden="true">{plant.icon}</span>
                    {plant.nickname} · {plant.name}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
