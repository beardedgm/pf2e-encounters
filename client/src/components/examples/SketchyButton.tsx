import SketchyButton from '../SketchyButton';

export default function SketchyButtonExample() {
  return (
    <div className="flex gap-4">
      <SketchyButton variant="primary" onClick={() => console.log('Primary clicked')}>
        Primary
      </SketchyButton>
      <SketchyButton variant="secondary" onClick={() => console.log('Secondary clicked')}>
        Secondary
      </SketchyButton>
      <SketchyButton variant="outline" onClick={() => console.log('Outline clicked')}>
        Outline
      </SketchyButton>
    </div>
  );
}
