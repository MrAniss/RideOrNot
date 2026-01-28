import { getWeatherInfo } from '../utils/weatherApi';
import WindDirection from './WindDirection';

function DetailCard({ icon, label, value, status, extra }) {
  const statusColors = {
    GO: 'text-verdict-go',
    RISKY: 'text-verdict-risky',
    NO_GO: 'text-verdict-nogo'
  };

  const statusColor = status ? statusColors[status] : 'text-text-primary';

  return (
    <div className="bg-bg-secondary border border-text-primary/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{icon}</span>
        <span className="text-text-primary/70 text-sm font-body">{label}</span>
      </div>
      <p className={`text-xl font-body font-bold ${statusColor}`}>{value}</p>
      {extra && <div className="mt-2">{extra}</div>}
    </div>
  );
}

export default function WeatherDetails({ conditions, duration }) {
  const weatherInfo = getWeatherInfo(conditions.weatherCode);

  return (
    <div className="w-full space-y-4">
      <h3 className="text-text-primary text-lg font-heading font-semibold">
        Prévisions sur {duration}h
      </h3>

      <div className="bg-bg-secondary border border-text-primary/20 rounded-lg p-4 text-center">
        <span className="text-4xl">{weatherInfo.icon}</span>
        <p className="text-text-primary mt-2 font-body">{weatherInfo.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <DetailCard
          icon="🌡️"
          label="Température"
          value={`${conditions.temperature.min}° - ${conditions.temperature.max}°C`}
        />

        <DetailCard
          icon="💨"
          label="Vent moyen"
          value={`${conditions.wind.avg} km/h`}
          status={conditions.wind.verdict}
          extra={
            conditions.wind.direction !== null && conditions.wind.direction !== undefined ? (
              <WindDirection degrees={conditions.wind.direction} size="sm" />
            ) : null
          }
        />

        <DetailCard
          icon="🌪️"
          label="Rafales max"
          value={`${conditions.gusts.max} km/h`}
          status={conditions.gusts.verdict}
        />

        <DetailCard
          icon="💧"
          label="Pluie"
          value={`${conditions.precipitation.probability}%`}
          status={conditions.precipitation.verdict}
        />
      </div>

      {conditions.precipitation.amount > 0 && (
        <div className="bg-accent/20 border border-accent rounded-lg p-3 text-text-primary text-sm">
          <p className="font-body">
            <strong>Précipitations prévues :</strong> {conditions.precipitation.amount} mm
          </p>
        </div>
      )}
    </div>
  );
}
