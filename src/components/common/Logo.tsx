
export default function Logo({ className = '' }: { className?: string }) {
  return (
    <h1 className={`text-3xl font-bold text-white ${className}`}>
      Extroverts
    </h1>
  );
}