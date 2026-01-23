import { getWeatherInfo } from '../utils/weatherApi';

function DetailCard({ icon, label, value, status }) {
  const statusColors = {
    GO: 'text-green-400',
    RISKY: 'text-orange-400',
    NO_GO: 'text-red-400'
  };

  const statusColor = status ? statusColors[status] : 'text-white';

  return (
    <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{icon}</span>
        <span className="text-white/70 text-sm">{label}</span>
      </div>
      <p className={`text-xl font-bold ${statusColor}`}>{value}</p>
    </div>
  );
}

export default function WeatherDetails({ conditions, duration }) {
  const weatherInfo = getWeatherInfo(conditions.weatherCode);

  return (
    <div className="w-full space-y-4">
      <h3 className="text-white text-lg font-semibold">
        Prévisions sur {duration}h
      </h3>

      <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm text-center">
        <span className="text-4xl">{weatherInfo.icon}</span>
        <p className="text-white mt-2">{weatherInfo.description}</p>
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
        <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-3 text-white text-sm">
          <p>
            <strong>Précipitations prévues :</strong> {conditions.precipitation.amount} mm
          </p>
        </div>
      )}
    </div>
  );
}
