export default function CardTitleComponent({ text }: { text: string }) {
  return (
    <p
      className="
        mt-[10px]
        mb-[20px]
        h-15
        font-oldtowne
        text-[61px]
        leading-none
        text-center
        tracking-wide"
    >
      {text}
    </p>
  );
}
