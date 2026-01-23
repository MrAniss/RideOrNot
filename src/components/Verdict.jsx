import { getVerdictConfig } from '../utils/decisionEngine';

export default function Verdict({ verdict }) {
  const config = getVerdictConfig(verdict);

  return (
    <div className={`${config.color} rounded-2xl p-8 text-white text-center shadow-2xl`}>
      <div className="text-6xl mb-4">{config.emoji}</div>
      <h2 className="text-4xl font-bold mb-2">{config.title}</h2>
      <p className="text-xl opacity-90">{config.message}</p>
    </div>
  );
}
