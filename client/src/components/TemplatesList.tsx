import SketchyCard from './SketchyCard';
import SketchyButton from './SketchyButton';
import { TEMPLATES, type ThreatLevel, type MonsterComposition } from '@shared/types';

interface TemplatesListProps {
  threatLevel: ThreatLevel;
  onApplyTemplate: (composition: MonsterComposition) => void;
}

export default function TemplatesList({ threatLevel, onApplyTemplate }: TemplatesListProps) {
  const relevantTemplates = Object.entries(TEMPLATES)
    .filter(([_, template]) => template.threat.includes(threatLevel));

  return (
    <SketchyCard>
      <h2 className="text-xl font-semibold mb-4 text-pf-dark" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>
        Quick Templates
      </h2>
      <div className="space-y-2">
        {relevantTemplates.length === 0 ? (
          <p className="text-sm text-gray-600">No templates for this threat level</p>
        ) : (
          relevantTemplates.map(([key, template]) => (
            <SketchyButton
              key={key}
              data-testid={`button-template-${key}`}
              variant="outline"
              className="w-full text-left justify-between flex"
              onClick={() => onApplyTemplate(template.composition)}
              style={{ borderStyle: 'dashed' }}
            >
              <span>{template.name}</span>
              <span className="text-pf-gold">{template.xp} XP</span>
            </SketchyButton>
          ))
        )}
      </div>
    </SketchyCard>
  );
}
