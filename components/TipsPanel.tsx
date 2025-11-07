import type { CareTip } from '@/lib/data';

export function TipsPanel({ tips }: { tips: CareTip[] }) {
  return (
    <section className="tips-panel glass-panel">
      <header className="tips-panel__header">
        <h2>Care cues</h2>
        <p>Targeted insights shaped by your plants’ current rhythms.</p>
      </header>
      <div className="tips-panel__grid">
        {tips.map((tip) => (
          <article key={tip.id} className="tips-panel__item">
            <span className="tips-panel__category">{tip.category}</span>
            <h3>{tip.title}</h3>
            <p>{tip.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
