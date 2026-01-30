interface RatingProps {
  value: number;
}

export default function Rating({ value }: RatingProps) {
  return (
    <div className="text-yellow-400">
      {"★".repeat(value)}
      {"☆".repeat(5 - value)}
    </div>
  );
}
