import SketchyCard from './SketchyCard';
import SketchyButton from './SketchyButton';
import SketchyInput from './SketchyInput';
import { ROLES, type MonsterComposition as Composition } from '@shared/types';

interface MonsterCompositionProps {
  composition: Composition;
  totalXP: number;
  targetXP: number;
  threatStatus: { status: string; class: string };
  onCompositionChange: (composition: Composition) => void;
  onClear: () => void;
  onSave: () => void;
}

const ROLE_CONFIGS = {
  minion: { max: 12 },
  lieutenant: { max: 6 },
  boss: { max: 3 },
  eliteBoss: { max: 2 },
  apexBoss: { max: 1 }
};

export default function MonsterComposition({
  composition,
  totalXP,
  targetXP,
  threatStatus,
  onCompositionChange,
  onClear,
  onSave
}: MonsterCompositionProps) {
  const updateRole = (role: keyof Composition, value: number) => {
    onCompositionChange({
      ...composition,
      [role]: value
    });
  };

  const getThreatClass = (className: string) => {
    const classes = {
      'threat-trivial': 'bg-threat-trivial-bg text-threat-trivial-border border-threat-trivial-border',
      'threat-low': 'bg-threat-low-bg text-threat-low-border border-threat-low-border',
      'threat-moderate': 'bg-threat-moderate-bg text-threat-moderate-border border-threat-moderate-border',
      'threat-severe': 'bg-threat-severe-bg text-threat-severe-border border-threat-severe-border',
      'threat-extreme': 'bg-threat-extreme-bg text-threat-extreme-text border-threat-extreme-text'
    };
    return classes[className as keyof typeof classes] || classes['threat-moderate'];
  };

  return (
    <SketchyCard>
      <h2 className="text-xl font-semibold mb-4 text-pf-dark" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
        Monster Composition
      </h2>

      <div className="space-y-4">
        {Object.entries(ROLES).map(([roleKey, roleData]) => {
          const role = roleKey as keyof Composition;
          const config = ROLE_CONFIGS[role];
          const count = composition[role];

          return (
            <div key={role} data-testid={`role-${role}`}>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  {roleData.emoji} {roleData.name}
                </label>
                <div className="flex items-center space-x-2">
                  <SketchyButton
                    data-testid={`button-${role}-decrease`}
                    className="w-8 h-8 flex items-center justify-center text-lg"
                    onClick={() => updateRole(role, Math.max(0, count - 1))}
                  >
                    -
                  </SketchyButton>
                  <SketchyInput
                    data-testid={`input-${role}`}
                    type="number"
                    min={0}
                    max={config.max}
                    value={count}
                    onChange={(e) => updateRole(role, Math.max(0, Math.min(config.max, parseInt(e.target.value) || 0)))}
                  />
                  <SketchyButton
                    data-testid={`button-${role}-increase`}
                    className="w-8 h-8 flex items-center justify-center text-lg"
                    onClick={() => updateRole(role, Math.min(config.max, count + 1))}
                  >
                    +
                  </SketchyButton>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t-2 border-gray-200">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Total XP:</span>
          <span data-testid="text-total-xp" className="text-lg font-bold text-pf-dark">{totalXP}</span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <span className="text-sm font-medium text-gray-700">Target XP:</span>
          <span data-testid="text-target-xp" className="text-lg font-bold text-pf-gold">{targetXP}</span>
        </div>
        <div 
          data-testid="status-threat"
          className={`mt-2 p-2 rounded-md text-center text-sm font-bold border-2 ${getThreatClass(threatStatus.class)}`}
          style={{ transform: `rotate(${Math.random() * 0.4 - 0.2}deg)` }}
        >
          {threatStatus.status}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <SketchyButton
          data-testid="button-clear-composition"
          variant="secondary"
          className="w-full"
          onClick={onClear}
        >
          Clear All
        </SketchyButton>
        <SketchyButton
          data-testid="button-save-encounter"
          variant="primary"
          className="w-full"
          onClick={onSave}
        >
          Save Encounter
        </SketchyButton>
      </div>
    </SketchyCard>
  );
}
