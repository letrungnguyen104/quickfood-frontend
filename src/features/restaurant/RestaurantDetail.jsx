import { useParams, Link } from "react-router-dom";
import { Star, Clock, Truck, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import MainLayout from "../../layouts/MainLayout";
import MenuItemCard from "../../components/MenuItemCard";
import { Toast } from "../../utils/toast";
import { restaurantService } from "../../services/restaurantService";
import { menuService } from "../../services/menuService";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";

export default function RestaurantDetail() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRestaurantAndMenu = async () => {
      setIsLoading(true);
      try {
        const [restaurantRes, menuRes] = await Promise.all([
          restaurantService.getRestaurantById(id),
          menuService.getMenuByRestaurant(id)
        ]);

        if (restaurantRes.success) setRestaurant(restaurantRes.data);
        if (menuRes.success) setCategories(menuRes.data);
        
      } catch (error) {
        console.error("Failed to fetch details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchRestaurantAndMenu();
    }
  }, [id]);

  const handleAddToCart = (item) => {
    dispatch(addToCart({ item, restaurantId: restaurant.id }));
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="text-xl font-semibold text-gray-500 animate-pulse">Loading restaurant details...</div>
        </div>
      </MainLayout>
    );
  }

  if (!restaurant) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Restaurant not found</h2>
          <Link to="/" className="text-primary-600 hover:underline">Go back to Home</Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="relative h-64 md:h-80 bg-gray-900">
        <img 
          src={restaurant.coverImageUrl || "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&q=80"} 
          alt={restaurant.name} 
          className="w-full h-full object-cover opacity-60" 
        />
        <div className="absolute top-4 left-4">
          <Link to="/" className="bg-white p-2 rounded-full inline-flex hover:bg-gray-100 transition-colors shadow-sm">
            <ArrowLeft className="w-5 h-5 text-gray-800" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 pb-20">
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-gray-100 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
          
          <p className="text-gray-500 mb-6">
            {restaurant.tags?.length > 0 ? restaurant.tags.join(" • ") : restaurant.description}
          </p>
          
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="font-bold text-gray-900">{restaurant.averageRating}</span>
              <span className="text-gray-500">({restaurant.totalReviews})</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5 text-primary-500" />
              <span className="font-medium">{restaurant.deliveryTime || "20-30"} min</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Truck className="w-5 h-5 text-primary-500" />
              <span className="font-medium">
                {restaurant.deliveryFee === 0 ? "Free delivery" : `$${restaurant.deliveryFee} delivery`}
              </span>
            </div>
          </div>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-10 text-gray-500 bg-white rounded-2xl border border-gray-100">
            This restaurant hasn't added any menu items yet.
          </div>
        ) : (
          categories.map(category => (
            <div key={category.id} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                {category.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {category.menuItems.map(item => (
                  <MenuItemCard key={item.id} item={item} onAddToCart={handleAddToCart} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </MainLayout>
  );
}