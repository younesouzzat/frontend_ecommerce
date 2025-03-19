import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  title: string;
  price: number;
  old_price?: number;
  image: string;
  images: string[];
  has_promo: boolean;
  sells: number;
  targetDate: string;
  rating: number;
  category: string;
  tags: string[];
  description: string;
  quantity: number;
}

interface GlobalState {
  wishlist: number[];
  compareList: number[];
  quickViewProduct: Product | null;
  cartItems: Product[];
}

const loadFromLocalStorage = (key: string, defaultValue: any) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};

const initialState: GlobalState = {
  wishlist: loadFromLocalStorage("wishlist", []),
  compareList: loadFromLocalStorage("compareList", []),
  quickViewProduct: null,
  cartItems: loadFromLocalStorage("cartItems", []),
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<Product>) => {
      const exists = state.wishlist.some((item) => item.id === action.payload.id);
      if (exists) {
        state.wishlist = state.wishlist.filter((item) => item.id !== action.payload.id);
      } else {
        state.wishlist.push(action.payload);
      }
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
    removeFromWishlist: (state, action: PayloadAction<Product>) => {
      state.wishlist = state.wishlist.filter((item) => item.id !== action.payload.id);
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
    toggleCompare: (state, action: PayloadAction<Product>) => {
      const existingIndex = state.compareList.findIndex(
        (item) => item.id === action.payload.id
      );
    
      if (existingIndex !== -1) {
        state.compareList = state.compareList.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        if (state.compareList.length < 4) {
          state.compareList.push(action.payload);
        }
      }
    
      localStorage.setItem("compareList", JSON.stringify(state.compareList));
    },    
    clearCompareList: (state) => {
      state.compareList = [];
      localStorage.setItem("compareList", JSON.stringify(state.compareList));
    },
    setQuickView: (state, action: PayloadAction<Product | null>) => {
      state.quickViewProduct = action.payload;
    },
    // addToCart(state, action: PayloadAction<{ product: Product; quantity?: number }>) {
    //   const { product, quantity = 1 } = action.payload;
    //   console.log(product);
    //   const existingItem = state.cartItems.find((item) => item.id === product.id);
    
    //   if (existingItem) {
    //     existingItem.quantity += quantity;
    //   } else {
    //     state.cartItems.push({ ...product, quantity });
    //   }
    
    //   localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    // },    
    addToCart(state, action: PayloadAction<{ product: Product; quantity?: number }>) {
      const { product, quantity = 1 } = action.payload;
      const price = product.is_promotion ? product.price_special : product.price;
      const existingItem = state.cartItems.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cartItems.push({ ...product, quantity, price });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },    
    updateQuantity(
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const {
  toggleWishlist,
  removeFromWishlist,
  toggleCompare,
  clearCompareList,
  setQuickView,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} = globalSlice.actions;

export default globalSlice.reducer;
