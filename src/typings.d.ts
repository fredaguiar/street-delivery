type Customer = {
  name: string;
  email: string;
};

type Customers = {
  name: ID;
  value: Customer;
};

type Items = {
  item_id: ID;
  name: string;
  price: number;
  quantity: number;
};

type TrackingItems = {
  customer_id: ID;
  items: [Items];
  customer: Customer;
};

type Order = {
  address: string;
  city: string;
  lat: number;
  lng: number;
  carrier: string;
  createdAt: string;
  shippingCost: number;
  trackingId: string;
  key: string;
  trackingItems: TrackingItems;
};
