import { useState } from 'react';
import MonsterComposition from '../MonsterComposition';
import type { MonsterComposition as Composition } from '@shared/types';

export default function MonsterCompositionExample() {
  const [composition, setComposition] = useState<Composition>({
    minion: 0,
    lieutenant: 0,
    boss: 0,
    eliteBoss: 0,
    apexBoss: 0
  });

  const handleClear = () => {
    setComposition({
      minion: 0,
      lieutenant: 0,
      boss: 0,
      eliteBoss: 0,
      apexBoss: 0
    });
    console.log('Composition cleared');
  };

  const handleSave = () => {
    console.log('Encounter saved:', composition);
  };

  return (
    <MonsterComposition
      composition={composition}
      totalXP={80}
      targetXP={80}
      threatStatus={{ status: 'Balanced', class: 'threat-moderate' }}
      onCompositionChange={setComposition}
      onClear={handleClear}
      onSave={handleSave}
    />
  );
}
