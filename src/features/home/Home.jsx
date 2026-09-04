import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Pizza, Coffee, Utensils, Beef, ArrowRight, TrendingUp } from "lucide-react";
import MainLayout from "../../layouts/MainLayout";
import CategoryBadge from "../../components/CategoryBadge";
import RestaurantCard from "../../components/RestaurantCard";
import Button from "../../components/Button";
import { restaurantService } from "../../services/restaurantService";

const CATEGORIES = [
  { id: 'all', name: 'All', icon: Utensils },
  { id: 'pizza', name: 'Pizza', icon: Pizza },
  { id: 'burger', name: 'Burger', icon: Beef },
  { id: 'coffee', name: 'Coffee', icon: Coffee },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await restaurantService.getAllRestaurants();
        if (response.success) {
          setRestaurants(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <MainLayout>
      <section className="bg-primary-50 py-12 md:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 animate-slide-up">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-4">
              Craving something <span className="text-primary-600">delicious?</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Get your favorite meals delivered to your doorstep in minutes. Fresh, fast, and completely reliable.
            </p>
            <div className="w-48">
              <Button variant="primary" className="!py-3 !text-lg">Order Now</Button>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0 animate-fade-in relative">
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary-200 rounded-full blur-3xl opacity-40"></div>
             <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80" alt="Delicious Food" className="relative z-10 w-full h-auto rounded-3xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500" />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {CATEGORIES.map(category => (
            <CategoryBadge 
              key={category.id}
              icon={category.icon}
              name={category.name}
              isActive={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Popular Restaurants</h2>
          <button className="text-primary-600 font-semibold hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        {isLoading ? (
          <div className="text-center py-10 text-gray-500 font-medium">
            Loading amazing food...
          </div>
        ) : restaurants.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No restaurants found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-gray-900 rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between shadow-xl border border-gray-800">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-primary-600 rounded-full blur-[100px] opacity-30 pointer-events-none"></div>
          
          <div className="relative z-10 md:w-2/3 mb-8 md:mb-0">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary-500/20 p-2 rounded-lg">
                <TrendingUp className="w-6 h-6 text-primary-500" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Want to grow your business?
              </h2>
            </div>
            <p className="text-gray-400 text-lg max-w-xl">
              Partner with QuickFood to reach thousands of new customers, increase your revenue, and manage deliveries seamlessly with our dedicated vendor tools.
            </p>
          </div>
          
          <div className="relative z-10 md:w-1/3 flex justify-start md:justify-end">
            <Link to="/register-restaurant">
              <button className="bg-primary-500 text-white font-bold py-4 px-8 rounded-xl hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/30 flex items-center gap-2">
                Join QuickFood Today <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}