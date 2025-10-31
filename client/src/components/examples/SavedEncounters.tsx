import { useEffect } from 'react';
import SavedEncounters from '../SavedEncounters';

export default function SavedEncountersExample() {
  // Add some mock data to localStorage for demo
  useEffect(() => {
    const mockEncounters = [
      {
        id: Date.now(),
        partySize: 4,
        partyLevel: 3,
        threatLevel: 'moderate' as const,
        composition: { minion: 4, lieutenant: 1, boss: 0, eliteBoss: 0, apexBoss: 0 },
        totalXP: 80,
        timestamp: new Date().toLocaleString()
      },
      {
        id: Date.now() - 1000,
        partySize: 4,
        partyLevel: 5,
        threatLevel: 'severe' as const,
        composition: { minion: 2, lieutenant: 0, boss: 1, eliteBoss: 0, apexBoss: 0 },
        totalXP: 120,
        timestamp: new Date(Date.now() - 86400000).toLocaleString()
      }
    ];
    localStorage.setItem('pf2e_savedEncounters', JSON.stringify(mockEncounters));
  }, []);

  const handleLoad = (encounter: any) => {
    console.log('Loaded encounter:', encounter);
  };

  return <SavedEncounters onLoad={handleLoad} />;
}
