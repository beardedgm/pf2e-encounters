import { useState } from 'react';
import PartyConfig from '../PartyConfig';
import type { ThreatLevel } from '@shared/types';

export default function PartyConfigExample() {
  const [partySize, setPartySize] = useState(4);
  const [partyLevel, setPartyLevel] = useState(1);
  const [threatLevel, setThreatLevel] = useState<ThreatLevel>('moderate');
  const [useStandards, setUseStandards] = useState(true);

  return (
    <PartyConfig
      partySize={partySize}
      partyLevel={partyLevel}
      threatLevel={threatLevel}
      useStandards={useStandards}
      onPartySizeChange={setPartySize}
      onPartyLevelChange={setPartyLevel}
      onThreatLevelChange={setThreatLevel}
      onStatsChartChange={setUseStandards}
    />
  );
}
