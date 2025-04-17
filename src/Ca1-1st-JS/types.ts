export type Items = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  count: number;
};

export type ItemsOmit = {
  name: string;
  description: string;
  price: number;
  category: string;
  count: number;
}
