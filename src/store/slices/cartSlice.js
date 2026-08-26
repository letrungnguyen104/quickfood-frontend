import { createSlice } from '@reduxjs/toolkit';
import { Toast } from '../../utils/toast';

const loadCartFromStorage = () => {
  const saved = localStorage.getItem('quickfood_cart');
  return saved ? JSON.parse(saved) : [];
};

const initialState = {
  items: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { item, restaurantId } = action.payload;
      const existingItem = state.items.find(i => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        const image = item.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&q=80";
        state.items.push({ ...item, quantity: 1, image, restaurantId });
      }
      
      localStorage.setItem('quickfood_cart', JSON.stringify(state.items));
      Toast.success(`Added ${item.name} to cart!`);
    },
    
    updateQuantity: (state, action) => {
      const { id, delta } = action.payload;
      const existingItem = state.items.find(i => i.id === id);
      if (existingItem) {
        existingItem.quantity = Math.max(1, existingItem.quantity + delta);
      }
      localStorage.setItem('quickfood_cart', JSON.stringify(state.items));
    },

    removeItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
      localStorage.setItem('quickfood_cart', JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('quickfood_cart');
    }
  }
});

export const { addToCart, updateQuantity, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;