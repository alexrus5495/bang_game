export interface CardProps {
  cardId: string;
  cardType: "playing" | "character" | "role";
}

export type CardScalerProps = {
  children: React.ReactNode;
};
