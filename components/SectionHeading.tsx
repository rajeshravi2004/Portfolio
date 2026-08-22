type Props = { label: string; title: string; intro?: string };

export function SectionHeading({ label, title, intro }: Props) {
  return (
    <header className="section-heading">
      <div className="section-kicker"><i />{label}</div>
      <h2>{title}</h2>
      {intro && <p>{intro}</p>}
    </header>
  );
}
