import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ArrowLeft, MapPin, Phone, FileText, CheckCircle2 } from "lucide-react";
import MainLayout from "../../layouts/MainLayout";
import InputField from "../../components/InputField";
import TextAreaField from "../../components/TextAreaField";
import Button from "../../components/Button";
import { Toast } from "../../utils/toast";
import { clearCart } from "../../store/slices/cartSlice";
import { orderService } from "../../services/orderService";

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/");
      Toast.error("Your cart is empty!");
    }
  }, [cartItems, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    if (!user) {
      Toast.error("Please login to place an order!");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        customerEmail: user.email,
        restaurantId: cartItems[0].restaurantId,
        deliveryAddress: formData.address,
        customerPhone: formData.phone,
        notes: formData.notes,
        items: cartItems.map(item => ({
          menuItemId: item.id,
          quantity: item.quantity
        }))
      };

      const res = await orderService.createOrder(payload);
      
      if (res.success) {
        Toast.success("Order placed successfully!");
        dispatch(clearCart());
        navigate("/");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      Toast.error("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Tính tiền
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 1.50;
  const total = subtotal + deliveryFee;

  if (cartItems.length === 0) return null;

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-screen pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link to="/cart" className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-primary-600 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Cart
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

          <div className="flex flex-col lg:flex-row gap-8">
            
            <div className="flex-1">
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-4">
                  <MapPin className="w-5 h-5 text-primary-500" /> Delivery Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <InputField 
                      label="Delivery Address" 
                      name="address" 
                      value={formData.address} 
                      onChange={handleChange} 
                      required 
                      placeholder="e.g. 123 Main St, Apartment 4B" 
                    />
                  </div>
                  <div>
                    <InputField 
                      label="Phone Number" 
                      type="tel"
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      required 
                      placeholder="e.g. 0987654321" 
                    />
                  </div>
                </div>

                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-4 pt-4">
                  <FileText className="w-5 h-5 text-primary-500" /> Additional Info
                </h2>

                <TextAreaField 
                  label="Order Notes (Optional)" 
                  name="notes" 
                  value={formData.notes} 
                  onChange={handleChange} 
                  placeholder="Any specific requests for the restaurant or driver?" 
                  rows={3}
                />
              </form>
            </div>

            <div className="w-full lg:w-[400px]">
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Your Order</h3>
                
                <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-3 flex-1">
                        <span className="font-semibold text-gray-900 w-6">{item.quantity}x</span>
                        <span className="text-gray-600 line-clamp-1">{item.name}</span>
                      </div>
                      <span className="font-semibold text-gray-900 ml-4">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 mb-8 pt-4 border-t border-gray-100">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="font-bold text-lg text-gray-900">Total</span>
                    <span className="font-bold text-3xl text-primary-600">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  form="checkout-form" // Trỏ tới ID của thẻ form bên cột trái
                  variant="primary" 
                  className="w-full !py-4 text-lg flex justify-center items-center gap-2"
                  isLoading={isSubmitting}
                >
                  <CheckCircle2 className="w-5 h-5" /> Place Order
                </Button>
                <p className="text-xs text-center text-gray-400 mt-4">
                  By placing your order, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </MainLayout>
  );
}