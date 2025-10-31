import TemplatesList from '../TemplatesList';
import type { MonsterComposition } from '@shared/types';

export default function TemplatesListExample() {
  const handleApplyTemplate = (composition: MonsterComposition) => {
    console.log('Template applied:', composition);
  };

  return (
    <TemplatesList
      threatLevel="moderate"
      onApplyTemplate={handleApplyTemplate}
    />
  );
}
