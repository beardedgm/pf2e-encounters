import { THREATS, ROLES, STATS_STANDARDS, type ThreatLevel, type MonsterComposition, type MonsterStats } from '@shared/types';

export function calculateTargetXP(partySize: number, threatLevel: ThreatLevel): number {
  const threat = THREATS[threatLevel];
  if (!threat) return 0;
  
  const baseXP = threat.xp;
  let adjustedXP = baseXP;
  
  if (partySize !== 4) {
    const sizeAdjustment = threat.adjustment * (partySize - 4);
    adjustedXP = baseXP + sizeAdjustment;
  }
  
  return Math.max(adjustedXP, 10);
}

export function calculateTotalXP(composition: MonsterComposition): number {
  let totalXP = 0;
  for (const [role, count] of Object.entries(composition)) {
    if (ROLES[role as keyof typeof ROLES] && typeof count === 'number') {
      totalXP += ROLES[role as keyof typeof ROLES].xp * count;
    }
  }
  return totalXP;
}

export function getThreatAssessment(currentXP: number, targetXP: number): { status: string; class: string } {
  if (targetXP === 0) {
    return { status: 'No Target', class: 'threat-trivial' };
  }
  
  const ratio = currentXP / targetXP;
  
  if (ratio < 0.6) {
    return { status: 'Too Easy', class: 'threat-trivial' };
  } else if (ratio < 0.8) {
    return { status: 'Below Target', class: 'threat-low' };
  } else if (ratio <= 1.2) {
    return { status: 'Balanced', class: 'threat-moderate' };
  } else if (ratio <= 1.5) {
    return { status: 'Above Target', class: 'threat-severe' };
  } else {
    return { status: 'Too Hard', class: 'threat-extreme' };
  }
}

export function getMonsterLevel(role: keyof typeof ROLES, partyLevel: number): number {
  const roleData = ROLES[role];
  if (!roleData) return partyLevel;
  
  const baseLevelMod = roleData.levelMod;
  return Math.max(-1, Math.min(20, partyLevel + baseLevelMod));
}

export function getMonsterStats(
  role: keyof typeof ROLES,
  partyLevel: number,
  statsChart: Record<string, MonsterStats>
): MonsterStats & { level: number } {
  const level = getMonsterLevel(role, partyLevel);
  const stats = statsChart[level.toString()];
  
  if (!stats) {
    const fallbackStats = statsChart["1"] || STATS_STANDARDS["1"];
    return { ...fallbackStats, level };
  }
  
  return { ...stats, level };
}
