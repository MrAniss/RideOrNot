import { getVerdictConfig } from '../utils/decisionEngine';

export default function Verdict({ verdict }) {
  const config = getVerdictConfig(verdict);

  return (
    <div className={`${config.bgOpacity} border-[3px] ${config.borderColor} rounded-2xl p-8 text-center shadow-2xl`}>
      <div className="text-6xl mb-4">{config.emoji}</div>
      <h2 className={`text-4xl font-heading font-bold mb-2 ${config.textColor}`}>{config.title}</h2>
      <p className={`text-xl ${config.textColor}/90 font-body`}>{config.message}</p>
    </div>
  );
}
