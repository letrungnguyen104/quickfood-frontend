import { Star, Clock, Truck } from "lucide-react";
import { Link } from "react-router-dom";

export default function RestaurantCard({ restaurant }) {
  return (
    <Link to={`/restaurant/${restaurant.id}`}>
      <div className="card-hover cursor-pointer group animate-fade-in">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {restaurant.isPromo && (
            <div className="absolute top-4 left-4 bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce-soft shadow-md">
              Promo
            </div>
          )}
        </div>
        
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary-600 transition-colors">
              {restaurant.name}
            </h3>
            <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
              <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
              <span className="text-sm font-bold text-yellow-700">{restaurant.rating}</span>
            </div>
          </div>
          
          <p className="text-gray-500 text-sm mb-4 truncate">{restaurant.tags.join(" • ")}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 border-t border-gray-100 pt-4">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary-500" />
              <span className="font-medium">{restaurant.deliveryTime} min</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-primary-500" />
              <span className="font-medium">{restaurant.deliveryFee === 0 ? 'Free Delivery' : `$${restaurant.deliveryFee}`}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}