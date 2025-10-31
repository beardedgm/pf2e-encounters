import SketchyCard from '../SketchyCard';

export default function SketchyCardExample() {
  return (
    <SketchyCard>
      <h2 className="text-xl font-semibold mb-2 text-pf-dark">Example Card</h2>
      <p className="text-foreground">This is a hand-drawn style card with sketchy borders.</p>
    </SketchyCard>
  );
}
