import { useParams, Link } from "react-router-dom";
import { Star, Clock, Truck, ArrowLeft } from "lucide-react";
import MainLayout from "../../layouts/MainLayout";
import MenuItemCard from "../../components/MenuItemCard";
import { Toast } from "../../utils/toast";

const RESTAURANT = {
  name: "Burger King",
  image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=1200&q=80",
  rating: 4.8,
  deliveryTime: "20-30",
  deliveryFee: 1.5,
  tags: ["American", "Fast Food", "Burger"],
  menu: [
    { id: 1, name: "Whopper Meal", description: "Flame-grilled beef patty, topped with tomatoes, fresh cut lettuce, mayo, pickles, a swirl of ketchup, and sliced white onions.", price: 8.99, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80" },
    { id: 2, name: "Double Cheeseburger", description: "Two flame-grilled patties, topped with melted American cheese.", price: 6.49, image: "https://images.unsplash.com/photo-1586816001966-79b736744398?w=500&q=80" },
    { id: 3, name: "Crispy Chicken Fries", description: "Breaded, crispy white meat chicken perfect for dipping.", price: 4.99, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&q=80" },
  ]
};

export default function RestaurantDetail() {
  const { id } = useParams();

  const handleAddToCart = (item) => {
    Toast.success(`Added ${item.name} to cart!`);
    // TODO: Tích hợp logic thêm vào giỏ hàng (Redux/Context) sau
  };

  return (
    <MainLayout>
      <div className="relative h-64 md:h-80 bg-gray-900">
        <img src={RESTAURANT.image} alt={RESTAURANT.name} className="w-full h-full object-cover opacity-60" />
        <div className="absolute top-4 left-4">
          <Link to="/" className="bg-white p-2 rounded-full inline-flex hover:bg-gray-100 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-800" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 pb-20">
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{RESTAURANT.name}</h1>
          <p className="text-gray-500 mb-6">{RESTAURANT.tags.join(" • ")}</p>
          
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="font-bold text-gray-900">{RESTAURANT.rating}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5 text-primary-500" />
              <span className="font-medium">{RESTAURANT.deliveryTime} min</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Truck className="w-5 h-5 text-primary-500" />
              <span className="font-medium">${RESTAURANT.deliveryFee} delivery</span>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {RESTAURANT.menu.map(item => (
            <MenuItemCard key={item.id} item={item} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}