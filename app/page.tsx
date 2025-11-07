import { CareTimeline } from '@/components/CareTimeline';
import { Header } from '@/components/Header';
import { PlantCard } from '@/components/PlantCard';
import { QuickStatCard } from '@/components/QuickStatCard';
import { TaskList } from '@/components/TaskList';
import { TipsPanel } from '@/components/TipsPanel';
import { careTips, plants, quickStats, tasks, timeline } from '@/lib/data';

export default function Home() {
  return (
    <main className="page">
      <div className="page__inner">
        <Header />

        <section className="quick-stats">
          {quickStats.map((stat) => (
            <QuickStatCard key={stat.id} stat={stat} />
          ))}
        </section>

        <div className="dashboard-grid">
          <section className="plant-collection glass-panel">
            <header className="plant-collection__header">
              <div>
                <h2>Plant collection</h2>
                <p>Glance the wellbeing pulse of every leafy companion.</p>
              </div>
              <button className="button button--ghost" type="button">
                Export care log
              </button>
            </header>
            <div className="plant-collection__grid">
              {plants.map((plant) => (
                <PlantCard key={plant.id} plant={plant} />
              ))}
            </div>
          </section>

          <div className="dashboard-column">
            <TaskList tasks={tasks} plants={plants} />
            <TipsPanel tips={careTips} />
            <CareTimeline events={timeline} plants={plants} />
          </div>
        </div>
      </div>
    </main>
  );
}
