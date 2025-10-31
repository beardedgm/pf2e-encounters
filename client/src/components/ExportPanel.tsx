import { useState } from 'react';
import SketchyCard from './SketchyCard';
import SketchyButton from './SketchyButton';
import { ROLES, THREATS, type MonsterComposition, type ThreatLevel, type MonsterStats } from '@shared/types';
import { getMonsterStats, calculateTargetXP, calculateTotalXP, getThreatAssessment } from '@/lib/encounter';

interface ExportPanelProps {
  composition: MonsterComposition;
  partySize: number;
  partyLevel: number;
  threatLevel: ThreatLevel;
  statsChart: Record<string, MonsterStats>;
}

export default function ExportPanel({
  composition,
  partySize,
  partyLevel,
  threatLevel,
  statsChart
}: ExportPanelProps) {
  const [output, setOutput] = useState('');

  const generateTextExport = () => {
    const targetXP = calculateTargetXP(partySize, threatLevel);
    const totalXP = calculateTotalXP(composition);
    const threatAssessment = getThreatAssessment(totalXP, targetXP);
    const efficiency = Math.round((totalXP / targetXP) * 100);

    let text = `=== ${THREATS[threatLevel].name} Encounter for Level ${partyLevel} Party ===\n`;
    text += `XP Budget: ${totalXP} / ${targetXP} XP (${efficiency}% efficiency)\n`;
    text += `Party Size: ${partySize} characters\n\n`;

    const monstersWithStats = Object.entries(composition)
      .filter(([_, count]) => count > 0)
      .map(([role, count]) => {
        const roleData = ROLES[role as keyof typeof ROLES];
        const stats = getMonsterStats(role as keyof typeof ROLES, partyLevel, statsChart);
        return { role, count, roleData, stats };
      });

    if (monstersWithStats.length === 0) {
      text += 'No monsters in this encounter.\n';
    } else {
      monstersWithStats.forEach(({ count, roleData, stats }) => {
        for (let i = 1; i <= count; i++) {
          text += `${roleData.name} ${i} (Level ${stats.level})\n`;
          text += `HP: ${stats.hp} | AC: ${stats.ac} | XP: ${roleData.xp}\n`;
          text += `Fort: +${stats.fortitude} | Ref: +${stats.reflex} | Will: +${stats.will}\n`;
          text += `Perception: +${stats.perception} | Attack: +${stats.attackBonus} | Spell DC: ${stats.spellDC}\n`;
          text += `Damage — Low ${stats.lowDamage} | Mod ${stats.moderateDamage} | Sev ${stats.severeDamage} | Ext ${stats.extremeDamage}\n\n`;
        }
      });
    }

    setOutput(text);
  };

  const generateJSONExport = () => {
    const encounter = {
      partySize,
      partyLevel,
      threatLevel,
      composition,
      targetXP: calculateTargetXP(partySize, threatLevel),
      totalXP: calculateTotalXP(composition),
      assessment: getThreatAssessment(calculateTotalXP(composition), calculateTargetXP(partySize, threatLevel))
    };
    setOutput(JSON.stringify(encounter, null, 2));
  };

  return (
    <SketchyCard>
      <h2 className="text-xl font-semibold mb-4 text-pf-dark" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
        Export Encounter
      </h2>

      <div className="flex gap-2 mb-4">
        <SketchyButton
          data-testid="button-export-text"
          variant="secondary"
          className="flex-1"
          onClick={generateTextExport}
        >
          Export Text
        </SketchyButton>
        <SketchyButton
          data-testid="button-export-json"
          variant="secondary"
          className="flex-1"
          onClick={generateJSONExport}
        >
          Export JSON
        </SketchyButton>
      </div>

      {output && (
        <textarea
          data-testid="textarea-export-output"
          className="w-full h-64 p-3 border-2 border-[#333] rounded-lg bg-white font-mono text-sm resize-none"
          value={output}
          readOnly
        />
      )}
    </SketchyCard>
  );
}
