import { useState } from 'react';
import SketchyCard from './SketchyCard';
import SketchyButton from './SketchyButton';
import SketchyInput from './SketchyInput';
import type { ThreatLevel } from '@shared/types';

interface PartyConfigProps {
  partySize: number;
  partyLevel: number;
  threatLevel: ThreatLevel;
  useStandards: boolean;
  onPartySizeChange: (size: number) => void;
  onPartyLevelChange: (level: number) => void;
  onThreatLevelChange: (threat: ThreatLevel) => void;
  onStatsChartChange: (useStandards: boolean) => void;
}

export default function PartyConfig({
  partySize,
  partyLevel,
  threatLevel,
  useStandards,
  onPartySizeChange,
  onPartyLevelChange,
  onThreatLevelChange,
  onStatsChartChange
}: PartyConfigProps) {
  return (
    <SketchyCard>
      <h2 className="text-xl font-semibold mb-4 text-pf-dark" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
        Party Configuration
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Party Size</label>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Members:</span>
            <div className="flex items-center space-x-2">
              <SketchyButton
                data-testid="button-party-size-decrease"
                className="w-8 h-8 flex items-center justify-center text-lg"
                onClick={() => onPartySizeChange(Math.max(1, partySize - 1))}
              >
                -
              </SketchyButton>
              <SketchyInput
                data-testid="input-party-size"
                type="number"
                min={1}
                max={8}
                value={partySize}
                onChange={(e) => onPartySizeChange(Math.max(1, Math.min(8, parseInt(e.target.value) || 1)))}
              />
              <SketchyButton
                data-testid="button-party-size-increase"
                className="w-8 h-8 flex items-center justify-center text-lg"
                onClick={() => onPartySizeChange(Math.min(8, partySize + 1))}
              >
                +
              </SketchyButton>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Party Level</label>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Level:</span>
            <div className="flex items-center space-x-2">
              <SketchyButton
                data-testid="button-party-level-decrease"
                className="w-8 h-8 flex items-center justify-center text-lg"
                onClick={() => onPartyLevelChange(Math.max(-1, partyLevel - 1))}
              >
                -
              </SketchyButton>
              <SketchyInput
                data-testid="input-party-level"
                type="number"
                min={-1}
                max={20}
                value={partyLevel}
                onChange={(e) => onPartyLevelChange(Math.max(-1, Math.min(20, parseInt(e.target.value) || 1)))}
              />
              <SketchyButton
                data-testid="button-party-level-increase"
                className="w-8 h-8 flex items-center justify-center text-lg"
                onClick={() => onPartyLevelChange(Math.min(20, partyLevel + 1))}
              >
                +
              </SketchyButton>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="threatLevel" className="block text-sm font-medium text-gray-700 mb-2">
            Threat Level
          </label>
          <select
            id="threatLevel"
            data-testid="select-threat-level"
            className="w-full p-2 border-2 border-[#333] rounded-lg bg-white font-bold focus:outline-none focus:shadow-[0_0_0_3px_rgba(45,27,105,0.2)]"
            value={threatLevel}
            onChange={(e) => onThreatLevelChange(e.target.value as ThreatLevel)}
          >
            <option value="trivial">Trivial</option>
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="severe">Severe</option>
            <option value="extreme">Extreme</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Stats Chart</label>
          <div className="flex space-x-2">
            <SketchyButton
              data-testid="button-stats-standards"
              variant={useStandards ? 'primary' : 'secondary'}
              className="flex-1"
              onClick={() => onStatsChartChange(true)}
            >
              Standards
            </SketchyButton>
            <SketchyButton
              data-testid="button-stats-published"
              variant={!useStandards ? 'primary' : 'secondary'}
              className="flex-1"
              onClick={() => onStatsChartChange(false)}
            >
              Published
            </SketchyButton>
          </div>
        </div>
      </div>
    </SketchyCard>
  );
}
