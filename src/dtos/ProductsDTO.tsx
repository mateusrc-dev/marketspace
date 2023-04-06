export type ProductsDTO = {
  id: string;
  name: string;
  description: string;
  is_new: boolean;
  price: number;
  accept_trade: boolean;
  user: { avatar: string };
  is_active: boolean;
  payment_methods: [{ key: string; name: string }];
  product_images: [{ id: string; path: string }];
};
