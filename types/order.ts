export enum Order {
  Recent = "recent",
  Like = "like",
}

export const orderOptions: { [key in Order]: string } = {
  [Order.Recent]: "최신순",
  [Order.Like]: "인기순",
};
