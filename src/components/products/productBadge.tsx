interface Props {
  colors: string[];
}

export default function ProductBadge({
  colors,
}: Props) {
  return (
    <>
      <div>
        {colors.map((color, index) => (
          <span key={index} className={`badge filter rounded-4 bg-${color}`}></span>
        ))}
      </div>
    </>
  );
}

