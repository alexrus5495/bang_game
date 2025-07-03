import { game } from "../../main";

export interface CardProps {
  cardId: (typeof game.deck)[number];
}

export type CardScalerProps = {
  children: React.ReactNode;
};
