import SketchyInput from '../SketchyInput';

export default function SketchyInputExample() {
  return (
    <div className="flex gap-4 items-center">
      <SketchyInput type="number" defaultValue={4} min={1} max={8} />
      <SketchyInput type="text" className="w-32" placeholder="Text input" />
    </div>
  );
}
