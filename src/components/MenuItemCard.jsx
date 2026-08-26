import { Plus } from "lucide-react";

export default function MenuItemCard({ item, onAddToCart }) {
  return (
    <div className="flex gap-4 p-4 bg-white border border-gray-100 rounded-2xl hover:shadow-md transition-shadow">
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-gray-900 text-lg">{item.name}</h4>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">{item.description}</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-bold text-primary-600 text-lg">${item.price.toFixed(2)}</span>
          <button 
            onClick={() => onAddToCart(item)}
            className="flex items-center justify-center bg-primary-50 text-primary-600 hover:bg-primary-500 hover:text-white p-2 rounded-full transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="w-28 h-28 flex-shrink-0">
        <img 
          src={item.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80"} 
          alt={item.name} 
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
    </div>
  );
}