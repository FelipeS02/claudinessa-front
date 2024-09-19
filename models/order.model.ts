export type OrderItemExtra = {
  id: number;
  name: string;
  amount?: number;
  price: number;
};

export type OrderItem = {
  id?: number;
  idProduct: number;
  name: string;
  price: number;
  img: string;
  amount: number;
  comment: string;
  idOrder: number;
  extras: OrderItemExtra[];
};

export type Order = {
  id: number;
  price: number;
  shipment: number;
  phone: string;
  client: string;
  adress: string;
  houseNumber: string;
  neighborhood?: string;
  complement?: string;
  instructions?: string;
  state: number;
  service: number;
  created: Date;
  method: number;
  products: OrderItem[];
};
