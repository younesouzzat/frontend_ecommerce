import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  label: string;
  price: number;
  old_price?: number;
  src: string;
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
    toggleWishlist: (state, action: PayloadAction<number>) => {
      if (state.wishlist.includes(action.payload)) {
        state.wishlist = state.wishlist.filter((id) => id !== action.payload);
      } else {
        state.wishlist.push(action.payload);
      }
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
    toggleCompare: (state, action: PayloadAction<number>) => {
      if (state.compareList.includes(action.payload)) {
        state.compareList = state.compareList.filter(
          (id) => id !== action.payload
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
    addToCart(state, action: PayloadAction<Product>) {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
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
  toggleCompare,
  clearCompareList,
  setQuickView,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} = globalSlice.actions;

export default globalSlice.reducer;
