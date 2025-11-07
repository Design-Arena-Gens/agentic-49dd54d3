import { format, formatDistanceToNow, parseISO } from 'date-fns';
import type { CareTask, Plant } from '@/lib/data';

const typeIcon: Record<CareTask['type'], string> = {
  water: '💧',
  mist: '🌫️',
  fertilize: '🧪',
  prune: '✂️',
  repot: '🪴',
  growth: '🌱'
};

const effortLabel: Record<CareTask['effort'], string> = {
  low: 'Quick',
  medium: 'Moderate',
  high: 'Deep care'
};

type Props = {
  tasks: CareTask[];
  plants: Plant[];
};

export function TaskList({ tasks, plants }: Props) {
  const plantLookup = new Map(plants.map((plant) => [plant.id, plant]));

  const sortedTasks = [...tasks].sort((a, b) =>
    parseISO(a.due).getTime() - parseISO(b.due).getTime()
  );

  return (
    <section className="task-list glass-panel">
      <header className="task-list__header">
        <h2>Care schedule</h2>
        <p>Stay ahead with upcoming hydration, nutrients, and wellness rituals.</p>
      </header>
      <ul className="task-list__items">
        {sortedTasks.map((task) => {
          const plant = plantLookup.get(task.plantId);
          const dueDate = parseISO(task.due);

          return (
            <li key={task.id} className={`task-list__item task-list__item--${task.status}`}>
              <div className="task-list__icon" aria-hidden="true">
                {typeIcon[task.type]}
              </div>
              <div className="task-list__details">
                <div className="task-list__title">
                  <h3>{task.title}</h3>
                  <span className={`task-list__badge task-list__badge--${task.effort}`}>
                    {effortLabel[task.effort]}
                  </span>
                </div>
                <p className="task-list__plant">
                  {plant ? `${plant.nickname} · ${plant.name}` : 'Unassigned plant'}
                </p>
                <div className="task-list__meta">
                  <span>{format(dueDate, "EEE, MMM d 'at' h:mm a")}</span>
                  <span className="task-list__meta-dot" aria-hidden="true">
                    •
                  </span>
                  <span>{formatDistanceToNow(dueDate, { addSuffix: true })}</span>
                </div>
              </div>
              <button type="button" className="task-list__cta">
                Start
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
