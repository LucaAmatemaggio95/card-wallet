export type CardElement = {
  cvv?: number;
  circuit?: string;
  exp?: string;
  Card_Number?: string;
  id: number;
};

export interface CardProps {
  card: CardElement;
  handleDeleteCard: (id: number) => void;
}

export type CardPost = {
  cvv?: number;
  circuit?: string;
  exp?: string;
  Card_Number?: string;
};
