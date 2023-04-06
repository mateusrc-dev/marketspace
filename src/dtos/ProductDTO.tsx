export type ProductDTO = {
  id: string;
  name: string;
  description: string;
  is_new: boolean;
  price: number;
  accept_trade: boolean;
  user: { avatar: string; name: string; tel: string };
  is_active: boolean;
  payment_methods: [{ key: string; name: string }];
  product_images: [{ id: string; path: string }];
  user_id: string;
};
