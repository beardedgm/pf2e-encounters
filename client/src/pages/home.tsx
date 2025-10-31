import { useState } from 'react';
import PartyConfig from '@/components/PartyConfig';
import MonsterComposition from '@/components/MonsterComposition';
import TemplatesList from '@/components/TemplatesList';
import MonsterStats from '@/components/MonsterStats';
import ExportPanel from '@/components/ExportPanel';
import SavedEncounters from '@/components/SavedEncounters';
import { calculateTargetXP, calculateTotalXP, getThreatAssessment } from '@/lib/encounter';
import { STATS_STANDARDS, STATS_PUBLISHED, type ThreatLevel, type MonsterComposition as Composition } from '@shared/types';

export default function Home() {
  const [partySize, setPartySize] = useState(4);
  const [partyLevel, setPartyLevel] = useState(1);
  const [threatLevel, setThreatLevel] = useState<ThreatLevel>('moderate');
  const [useStandards, setUseStandards] = useState(true);
  const [composition, setComposition] = useState<Composition>({
    minion: 0,
    lieutenant: 0,
    boss: 0,
    eliteBoss: 0,
    apexBoss: 0
  });

  const statsChart = useStandards ? STATS_STANDARDS : STATS_PUBLISHED;
  const targetXP = calculateTargetXP(partySize, threatLevel);
  const totalXP = calculateTotalXP(composition);
  const threatStatus = getThreatAssessment(totalXP, targetXP);

  const handleClear = () => {
    setComposition({
      minion: 0,
      lieutenant: 0,
      boss: 0,
      eliteBoss: 0,
      apexBoss: 0
    });
  };

  const handleSave = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('pf2e_savedEncounters') || '[]');
      const newEncounter = {
        id: Date.now(),
        partySize,
        partyLevel,
        threatLevel,
        composition,
        totalXP,
        timestamp: new Date().toLocaleString()
      };
      saved.unshift(newEncounter);
      localStorage.setItem('pf2e_savedEncounters', JSON.stringify(saved.slice(0, 20)));
      alert('Encounter saved successfully!');
      // Force re-render of SavedEncounters by updating state
      window.dispatchEvent(new Event('storage'));
    } catch (error) {
      console.error('Failed to save encounter:', error);
      alert('Failed to save encounter');
    }
  };

  const handleLoadEncounter = (encounter: any) => {
    setPartySize(encounter.partySize);
    setPartyLevel(encounter.partyLevel);
    setThreatLevel(encounter.threatLevel);
    setComposition(encounter.composition);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 
            className="text-4xl font-bold text-pf-brown mb-2"
            style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.3)' }}
          >
            Pathfinder 2e Encounter Builder
          </h1>
          <p className="text-gray-700 font-medium">
            Create balanced encounters with real-time statistics and threat calculations
          </p>
        </header>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Configuration */}
          <div className="lg:col-span-1 space-y-6">
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

            <MonsterComposition
              composition={composition}
              totalXP={totalXP}
              targetXP={targetXP}
              threatStatus={threatStatus}
              onCompositionChange={setComposition}
              onClear={handleClear}
              onSave={handleSave}
            />

            <TemplatesList
              threatLevel={threatLevel}
              onApplyTemplate={setComposition}
            />
          </div>

          {/* Right Panel - Statistics and Export */}
          <div className="lg:col-span-2 space-y-6">
            <MonsterStats
              composition={composition}
              partyLevel={partyLevel}
              statsChart={statsChart}
            />

            <SavedEncounters onLoad={handleLoadEncounter} />

            <ExportPanel
              composition={composition}
              partySize={partySize}
              partyLevel={partyLevel}
              threatLevel={threatLevel}
              statsChart={statsChart}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
