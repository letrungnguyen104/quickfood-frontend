import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from "lucide-react";
import MainLayout from "../../layouts/MainLayout";
import Button from "../../components/Button";

const INITIAL_CART = [
  { id: 1, name: "Whopper Meal", price: 8.99, quantity: 2, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&q=80" },
  { id: 3, name: "Crispy Chicken Fries", price: 4.99, quantity: 1, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=200&q=80" }
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(INITIAL_CART);

  const updateQuantity = (id, delta) => {
    setCartItems(items => 
      items.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = cartItems.length > 0 ? 1.50 : 0;
  const total = subtotal + deliveryFee;

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Link to="/" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-primary-600 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Continue Shopping
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <div className="flex justify-center">
              <Link to="/">
                <Button variant="primary" className="px-8">
                  Browse Restaurants
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    <p className="text-primary-600 font-bold mt-1">${item.price.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center gap-3 bg-gray-50 rounded-full px-3 py-1 border border-gray-200">
                    <button onClick={() => updateQuantity(item.id, -1)} className="text-gray-500 hover:text-primary-600 p-1">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-semibold w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="text-gray-500 hover:text-primary-600 p-1">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button onClick={() => removeItem(item.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors ml-2">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="w-full lg:w-96">
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                    <span className="font-bold text-lg text-gray-900">Total</span>
                    <span className="font-bold text-2xl text-primary-600">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button variant="primary" className="w-full !py-3">
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}