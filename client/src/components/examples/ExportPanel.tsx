import ExportPanel from '../ExportPanel';
import { STATS_STANDARDS, type MonsterComposition } from '@shared/types';

export default function ExportPanelExample() {
  const composition: MonsterComposition = {
    minion: 4,
    lieutenant: 1,
    boss: 0,
    eliteBoss: 0,
    apexBoss: 0
  };

  return (
    <ExportPanel
      composition={composition}
      partySize={4}
      partyLevel={3}
      threatLevel="moderate"
      statsChart={STATS_STANDARDS}
    />
  );
}
