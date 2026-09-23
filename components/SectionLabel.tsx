interface SectionLabelProps {
  num: string;
  label: string;
}

export function SectionLabel({ num, label }: SectionLabelProps) {
  return (
    <p className="section-label">
      <span className="num">{num}</span>
      <span aria-hidden="true" className="rule" />
      <span>{label}</span>
    </p>
  );
}
