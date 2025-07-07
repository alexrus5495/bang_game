export default function CardContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="absolute z-10 top-0 m-[50px] h-[675px] w-[400px]">
      {children}
    </div>
  );
}
