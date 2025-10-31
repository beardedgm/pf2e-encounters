import { useState, useEffect } from 'react';
import SketchyCard from './SketchyCard';
import SketchyButton from './SketchyButton';
import { THREATS, type ThreatLevel, type MonsterComposition } from '@shared/types';

interface SavedEncounter {
  id: number;
  partySize: number;
  partyLevel: number;
  threatLevel: ThreatLevel;
  composition: MonsterComposition;
  totalXP: number;
  timestamp: string;
}

interface SavedEncountersProps {
  onLoad: (encounter: SavedEncounter) => void;
}

export default function SavedEncounters({ onLoad }: SavedEncountersProps) {
  const [encounters, setEncounters] = useState<SavedEncounter[]>([]);

  useEffect(() => {
    // Load from localStorage
    try {
      const saved = localStorage.getItem('pf2e_savedEncounters');
      if (saved) {
        setEncounters(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to load encounters:', error);
    }
  }, []);

  const handleDelete = (id: number) => {
    const filtered = encounters.filter(e => e.id !== id);
    setEncounters(filtered);
    localStorage.setItem('pf2e_savedEncounters', JSON.stringify(filtered));
    console.log('Encounter deleted:', id);
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to delete all saved encounters?')) {
      setEncounters([]);
      localStorage.removeItem('pf2e_savedEncounters');
      console.log('All encounters cleared');
    }
  };

  return (
    <SketchyCard>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-pf-dark" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
          Saved Encounters
        </h2>
        {encounters.length > 0 && (
          <SketchyButton
            data-testid="button-clear-all-encounters"
            variant="outline"
            className="text-xs"
            onClick={handleClearAll}
          >
            Clear All
          </SketchyButton>
        )}
      </div>

      {encounters.length === 0 ? (
        <p className="text-gray-600 text-center py-8">No saved encounters</p>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {encounters.map((encounter) => (
            <div
              key={encounter.id}
              data-testid={`encounter-${encounter.id}`}
              className="bg-gray-50 p-3 rounded-lg border-2 border-gray-200"
              style={{ transform: `rotate(${Math.random() * 0.2 - 0.1}deg)` }}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-bold text-pf-dark">
                    Level {encounter.partyLevel} - {THREATS[encounter.threatLevel].name}
                  </div>
                  <div className="text-xs text-gray-600">{encounter.timestamp}</div>
                </div>
                <div className="text-sm font-bold text-pf-gold">{encounter.totalXP} XP</div>
              </div>
              <div className="flex gap-2 mt-2">
                <SketchyButton
                  data-testid={`button-load-${encounter.id}`}
                  variant="primary"
                  className="flex-1 text-xs"
                  onClick={() => {
                    onLoad(encounter);
                    console.log('Encounter loaded:', encounter.id);
                  }}
                >
                  Load
                </SketchyButton>
                <SketchyButton
                  data-testid={`button-delete-${encounter.id}`}
                  variant="outline"
                  className="flex-1 text-xs"
                  onClick={() => handleDelete(encounter.id)}
                >
                  Delete
                </SketchyButton>
              </div>
            </div>
          ))}
        </div>
      )}
    </SketchyCard>
  );
}
