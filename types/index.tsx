export interface User {
  id: number | null;
  name: string | null;
  token: string | null;
  email: string | null;
  displayname: string | null;
}

export interface AuthContextType {
  user: User;
  isLoading?: boolean;
}

export type Role = {
  id: string;
  name: string;
};

export interface Roles {
  data?: Role[];
  isLoading?: boolean;
  isError?: boolean;
  refetch?: () => void;
}

export interface NavItems {
  title: string;
  href: string;
}

export interface CategoryItems {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  products_count: number;
}

export interface CategoryProps {
  id: string;
  name: string;
  categories: Category[];
  isLoading: boolean;
}

export interface Dimensions {
  length: number;
  width: number;
  height: number;
}

export interface Review {
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ProductFormData {
  title: string;
  description: string;
  sku: string;
  price: number;
  sale_price: number | null;
  stock_quantity: number;
  weight: number;
  dimensions: Dimensions;
  category: string;
  brand: string;
  meta_title: string;
  meta_description: string;
  is_active: boolean;
  is_promotion: boolean;
  cover?: File | null;
  images?: File[];
}

export interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  last_page?: number;
  current_page?: number;
  is_promotion?: boolean;
  isHotSell?: boolean;
  price_special?: number;
  created_at: string;
  category?: string;
  category_id?: number | string | undefined;
  rating: number;
  reviews_avg_note: number;
  reviews_count: number;
}

export interface CartItem {
  id: number;
  title: string;
  price: number;
  old_price?: number;
  ref: string;
  size: string;
  image: string;
  images: string[];
  isNew: boolean;
  is_promotion: boolean;
  price_special: number;
  has_promo: boolean;
  sells: number;
  targetDate: string;
  rating: number;
  category: string;
  tags: string[];
  dimensions: Dimensions | string;
  description: string;
  fullDescription: string;
  quantity: number;
  reviews: Review[];
  user: string;
  material: string;
  specifications: string;
  reviews_count: number;
  reviews_avg_note: number;
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

export interface ShopProdCardProps {
  product: CartItem;
}

export interface TabNavigationProps {
  products: Product[];
  isLoading: boolean;
  categories?: Category[];
}

export interface FeaturedProductProps {
  products: Product[];
  isLoading: boolean;
}

export interface SingleProductProps {
  item?: Product;
  items: Product[];
  products?: Product[];
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
  index?: number;
  isLoading?: boolean;
}


export interface ImageProdSkeletonProps {
  index: number;
}

export interface Permission {
  id: number | string;
  name: string;
}
