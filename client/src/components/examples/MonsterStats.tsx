import MonsterStats from '../MonsterStats';
import { STATS_STANDARDS, type MonsterComposition } from '@shared/types';

export default function MonsterStatsExample() {
  const composition: MonsterComposition = {
    minion: 2,
    lieutenant: 1,
    boss: 0,
    eliteBoss: 0,
    apexBoss: 0
  };

  return (
    <MonsterStats
      composition={composition}
      partyLevel={3}
      statsChart={STATS_STANDARDS}
    />
  );
}
