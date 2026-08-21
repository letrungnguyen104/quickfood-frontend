import { useState } from "react";
import { Pizza, Coffee, Utensils, Beef, ArrowRight } from "lucide-react";
import MainLayout from "../../layouts/MainLayout";
import CategoryBadge from "../../components/CategoryBadge";
import RestaurantCard from "../../components/RestaurantCard";
import Button from "../../components/Button";

const CATEGORIES = [
  { id: 'all', name: 'All', icon: Utensils },
  { id: 'pizza', name: 'Pizza', icon: Pizza },
  { id: 'burger', name: 'Burger', icon: Beef },
  { id: 'coffee', name: 'Coffee', icon: Coffee },
];

const MOCK_RESTAURANTS = [
  {
    id: 1,
    name: "Burger King",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=500&q=80",
    rating: 4.8,
    tags: ["American", "Fast Food", "Burger"],
    deliveryTime: 25,
    deliveryFee: 0,
    isPromo: true
  },
  {
    id: 2,
    name: "Pizza Hut",
    image: "https://images.unsplash.com/photo-1513104890f38-7c0f474c3129?w=500&q=80",
    rating: 4.5,
    tags: ["Italian", "Pizza"],
    deliveryTime: 35,
    deliveryFee: 2.99,
    isPromo: false
  },
  {
    id: 3,
    name: "Starbucks",
    image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=500&q=80",
    rating: 4.9,
    tags: ["Coffee", "Bakery", "Desserts"],
    deliveryTime: 15,
    deliveryFee: 1.5,
    isPromo: true
  }
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('all');

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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Popular Restaurants</h2>
          <button className="text-primary-600 font-semibold hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_RESTAURANTS.map(restaurant => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>
    </MainLayout>
  );
}