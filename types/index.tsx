export interface NavItems {
  title: string;
  href: string;
}

export interface Category {
  id: number;
  name: string;
  products_count: number;
}

export interface CategoryProps {
  categories: Category[];
  isLoading: boolean;
}

export interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  is_promotion?: boolean;
  isHotSell?: boolean;
  price_special?: number;
  created_at: string;
  category_id: number;
  reviews_avg_note: number;
  reviews_count: number;
}

export interface Item {
  id: number;
  image: string;
  title: string;
  price: number;
  is_promotion?: boolean;
  price_special?: number;
  created_at: string;
}

export interface TabNavigationProps {
  products: Product[];
  categories: Category[];
  isLoading: boolean;
}

export interface FeaturedProductProps {
  item: Product;
  items: Product[];
  products: Product[];
  setApi: (api: any) => void;
  isLoading: boolean;
}

export interface CardProdProps {
  item: Product;
  items: Product[];
  setApi: (api: any) => void;
  isLoading: boolean;
}

export interface SingleItem {
  item: Product;
  isLoading: boolean;
}
