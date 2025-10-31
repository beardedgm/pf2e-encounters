import SketchyCard from './SketchyCard';
import { ROLES, type MonsterComposition, type MonsterStats as Stats } from '@shared/types';
import { getMonsterStats } from '@/lib/encounter';

interface MonsterStatsProps {
  composition: MonsterComposition;
  partyLevel: number;
  statsChart: Record<string, Stats>;
}

export default function MonsterStats({ composition, partyLevel, statsChart }: MonsterStatsProps) {
  const monstersWithStats = Object.entries(composition)
    .filter(([_, count]) => count > 0)
    .map(([role, count]) => {
      const roleData = ROLES[role as keyof typeof ROLES];
      const stats = getMonsterStats(role as keyof typeof ROLES, partyLevel, statsChart);
      return { role, count, roleData, stats };
    });

  if (monstersWithStats.length === 0) {
    return (
      <SketchyCard>
        <h2 className="text-xl font-semibold mb-4 text-pf-dark" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
          Monster Statistics
        </h2>
        <p className="text-gray-600 text-center py-8">Add monsters to see their statistics</p>
      </SketchyCard>
    );
  }

  return (
    <SketchyCard>
      <h2 className="text-xl font-semibold mb-4 text-pf-dark" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
        Monster Statistics
      </h2>
      <div className="space-y-4">
        {monstersWithStats.map(({ role, count, roleData, stats }) => (
          <div 
            key={role}
            data-testid={`stats-${role}`}
            className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200"
            style={{
              borderLeft: '4px solid #2D1B69',
              transform: `rotate(${Math.random() * 0.2 - 0.1}deg)`
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-pf-dark">
                {roleData.emoji} {roleData.name}
              </h3>
              <div className="text-right">
                <div className="text-sm text-gray-600">Level {stats.level}</div>
                <div className="text-sm font-bold text-pf-gold">Count: {count}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div><span className="font-semibold">HP:</span> {stats.hp}</div>
              <div><span className="font-semibold">AC:</span> {stats.ac}</div>
              <div><span className="font-semibold">Perception:</span> +{stats.perception}</div>
              <div><span className="font-semibold">Attack:</span> +{stats.attackBonus}</div>
              <div className="col-span-2"><span className="font-semibold">Spell DC:</span> {stats.spellDC}</div>
            </div>

            <div className="mt-2 pt-2 border-t border-gray-300">
              <div className="text-xs text-gray-600 mb-1">Saves</div>
              <div className="text-sm">
                Fort: +{stats.fortitude} | Ref: +{stats.reflex} | Will: +{stats.will}
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-gray-300">
              <div className="text-xs text-gray-600 mb-1">Damage</div>
              <div className="text-xs space-y-1">
                <div><span className="font-semibold">Low:</span> {stats.lowDamage}</div>
                <div><span className="font-semibold">Moderate:</span> {stats.moderateDamage}</div>
                <div><span className="font-semibold">Severe:</span> {stats.severeDamage}</div>
                <div><span className="font-semibold">Extreme:</span> {stats.extremeDamage}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SketchyCard>
  );
}
