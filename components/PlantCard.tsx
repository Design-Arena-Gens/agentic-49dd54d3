import { format, formatDistanceToNow, parseISO } from 'date-fns';
import type { Plant } from '@/lib/data';

function formatSchedule(lastWatered: string, nextWatering: string) {
  return {
    last: format(parseISO(lastWatered), 'MMM d'),
    nextIn: formatDistanceToNow(parseISO(nextWatering), { addSuffix: true })
  };
}

function meterClass(value: number) {
  if (value >= 70) return 'plant-card__meter-fill--high';
  if (value >= 50) return 'plant-card__meter-fill--mid';
  return 'plant-card__meter-fill--low';
}

export function PlantCard({ plant }: { plant: Plant }) {
  const schedule = formatSchedule(plant.lastWatered, plant.nextWatering);

  return (
    <article className="plant-card glass-panel">
      <div className="plant-card__header">
        <span className="plant-card__icon" aria-hidden="true">
          {plant.icon}
        </span>
        <div>
          <h2>{plant.nickname}</h2>
          <p className="plant-card__species">
            {plant.name} · {plant.species}
          </p>
        </div>
        <span className="tag-pill">{plant.light} light</span>
      </div>

      <div className="plant-card__schedule">
        <div>
          <span className="plant-card__schedule-label">Last watered</span>
          <span className="plant-card__schedule-value">{schedule.last}</span>
        </div>
        <div>
          <span className="plant-card__schedule-label">Next session</span>
          <span className="plant-card__schedule-value">{schedule.nextIn}</span>
        </div>
        <div>
          <span className="plant-card__schedule-label">Cadence</span>
          <span className="plant-card__schedule-value">
            Every {plant.wateringIntervalDays} days
          </span>
        </div>
      </div>

      <div className="plant-card__location">
        <span aria-hidden="true">📍</span>
        <span>{plant.location}</span>
      </div>

      <div className="plant-card__meters">
        <div className="plant-card__meter">
          <div className="plant-card__meter-header">
            <span>Soil moisture</span>
            <span>{plant.moisture}%</span>
          </div>
          <div className="plant-card__meter-track">
            <div className={`plant-card__meter-fill ${meterClass(plant.moisture)}`} style={{ width: `${plant.moisture}%` }} />
          </div>
        </div>
        <div className="plant-card__meter">
          <div className="plant-card__meter-header">
            <span>Humidity</span>
            <span>{plant.humidity}%</span>
          </div>
          <div className="plant-card__meter-track">
            <div className={`plant-card__meter-fill ${meterClass(plant.humidity)}`} style={{ width: `${plant.humidity}%` }} />
          </div>
        </div>
        <div className="plant-card__meter">
          <div className="plant-card__meter-header">
            <span>Room temp</span>
            <span>{plant.temperature.toFixed(1)}°C</span>
          </div>
          <div className="plant-card__meter-track">
            <div className="plant-card__meter-fill plant-card__meter-fill--temperature" style={{ width: `${Math.min(100, (plant.temperature / 30) * 100)}%` }} />
          </div>
        </div>
      </div>

      <div className="plant-card__notes">
        {plant.notes.map((note) => (
          <div key={note} className="plant-card__note">
            <span aria-hidden="true">✴</span>
            <p>{note}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
