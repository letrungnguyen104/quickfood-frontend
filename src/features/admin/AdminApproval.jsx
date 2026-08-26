import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Store } from "lucide-react";
import { restaurantService } from "../../services/restaurantService";
import apiClient from "../../services/apiClient";
import { Toast } from "../../utils/toast";
import Button from "../../components/Button";

export default function AdminApproval() {
  const [pendingRestaurants, setPendingRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPendingRestaurants = async () => {
    setIsLoading(true);
    try {
      const response = await restaurantService.getAllRestaurants();
      if (response.success) {
        const pending = response.data.filter(r => r.status === "PENDING");
        setPendingRestaurants(pending);
      }
    } catch (error) {
      console.error("Failed to fetch:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingRestaurants();
  }, []);

  const handleApprove = async (restaurant) => {
    try {
      await restaurantService.updateRestaurant(restaurant.id, {
        ...restaurant,
        status: "ACTIVE"
      });

      if (restaurant.ownerEmail) {
        await apiClient.put(`/auth/upgrade-vendor/${restaurant.ownerEmail}`);
      }

      Toast.success(`${restaurant.name} has been approved!`);
      fetchPendingRestaurants();
    } catch (error) {
      console.error("Approval failed:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Pending Approvals</h1>
      <p className="text-gray-500 mb-8">Review and approve new restaurant partner applications.</p>

      {isLoading ? (
        <div className="text-center py-10 text-gray-500">Loading...</div>
      ) : pendingRestaurants.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl border border-gray-200 text-center shadow-sm">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-bold text-gray-700">All caught up!</h3>
          <p className="text-gray-500 mt-2">There are no pending restaurant applications at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {pendingRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-6 items-center">
              <img 
                src={restaurant.coverImageUrl || "https://via.placeholder.com/150"} 
                alt={restaurant.name} 
                className="w-full md:w-48 h-32 object-cover rounded-xl"
              />
              <div className="flex-1 w-full">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold text-gray-900">{restaurant.name}</h2>
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full border border-yellow-200">
                    PENDING
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{restaurant.description}</p>
                <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
                  <div><strong>Email:</strong> {restaurant.ownerEmail || 'N/A'}</div>
                  <div><strong>Phone:</strong> {restaurant.contactPhone}</div>
                  <div className="col-span-2"><strong>Address:</strong> {restaurant.address}</div>
                </div>
              </div>
              <div className="flex md:flex-col gap-3 w-full md:w-auto">
                <Button 
                  onClick={() => handleApprove(restaurant)} 
                  variant="primary" 
                  className="w-full !bg-green-600 hover:!bg-green-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" /> Approve
                </Button>
                <Button variant="outline" className="w-full !text-red-600 !border-red-200 hover:!bg-red-50">
                  <XCircle className="w-4 h-4 mr-2" /> Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}