import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { toast } from "sonner";

// Define product type
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  originalPrice: number;
  rating: number;
  quantity: number;
}

interface CartState {
  products: Product[];
}

const initialState: CartState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ product: Product }>) => {
      const { product } = action.payload;
      const exists = state.products.some((item) => item.id === product.id);
      if (!exists) {
        state.products.push(product);
        toast.success("Added to cart");
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      state.products = state.products.filter((product) => product.id !== id);
    },
    incrementQuantity: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      const product = state.products.find((product) => product.id === id);
      if (product) {
        product.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      const product = state.products.find((product) => product.id === id);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
    clearCart: (state) => {
      state.products = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// Hook to get all cart products
export const useCartProducts = (): Product[] => {
  return useSelector((state: { cart: CartState }) => state.cart.products);
};

// Hook to check if a product is in the cart
export const useIsInCart = (id: number): boolean => {
  return useSelector((state: { cart: CartState }) =>
    state.cart.products.some((product) => product.id === id)
  );
};

// Hook to get cart count
export const useCartCount = (): number => {
  return useSelector(
    (state: { cart: CartState }) => state.cart.products.length
  );
};
