export const Order = {
  Recent: "recent",
  Like: "like",
} as const;

export type Order = (typeof Order)[keyof typeof Order];

export const orderOptions: { [key in Order]: string } = {
  [Order.Recent]: "최신순",
  [Order.Like]: "인기순",
};
