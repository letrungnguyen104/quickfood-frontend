import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { User, MapPin, Plus, Map } from "lucide-react";
import MainLayout from "../../layouts/MainLayout";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import Modal from "../../components/Modal";
import MapPicker from "../../components/MapPicker";
import { userService } from "../../services/userService";
import { Toast } from "../../utils/toast";

export default function UserProfile() {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("profile");
  
  const [profileData, setProfileData] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    receiverName: user?.fullName || "",
    receiverPhone: "",
    streetAddress: "",
    addressType: "HOME",
    isDefault: false
  });
  const [mapPosition, setMapPosition] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user?.email) {
      fetchProfileData();
    }
  }, [user]);

  const fetchProfileData = async () => {
    setIsLoading(true);
    try {
      const res = await userService.getProfile(user.email);
      if (res.success) {
        setProfileData(res.data);
        setAddresses(res.data.addresses || []);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        // Bọc try-catch con ở đây
        try {
           const createRes = await userService.createProfile({
             email: user.email,
             fullName: user.fullName || user.username,
             avatarUrl: user.avatarUrl
           });
           if (createRes.success) {
             setProfileData(createRes.data);
             setAddresses([]);
           }
        } catch (createErr) {
           Toast.error("Cannot load your profile.");
        }
      } else {
         Toast.error("An error occurred while loading profile.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (!mapPosition) {
      return Toast.error("Please select a location on the map");
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...newAddress,
        latitude: mapPosition.lat,
        longitude: mapPosition.lng
      };
      
      const res = await userService.addAddress(user.email, payload);
      if (res.success) {
        Toast.success("Address added successfully!");
        setIsAddressModalOpen(false);
        setMapPosition(null);
        fetchProfileData();
      }
    } catch (error) {
      Toast.error("Failed to add address");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <MainLayout><div className="text-center py-20">Loading profile...</div></MainLayout>;

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64 space-y-2">
            <button 
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === "profile" ? "bg-primary-50 text-primary-700" : "text-gray-600 hover:bg-gray-50"}`}
            >
              <User className="w-5 h-5" /> Personal Info
            </button>
            <button 
              onClick={() => setActiveTab("addresses")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === "addresses" ? "bg-primary-50 text-primary-700" : "text-gray-600 hover:bg-gray-50"}`}
            >
              <MapPin className="w-5 h-5" /> Saved Addresses
            </button>
          </div>

          <div className="flex-1 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
            
            {activeTab === "profile" && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Email Address" value={profileData?.email || ""} disabled />
                  <InputField label="Full Name" value={profileData?.fullName || ""} disabled />
                  <InputField label="Phone Number" value={profileData?.phoneNumber || "Not updated"} disabled />
                  <InputField label="Loyalty Points" value={profileData?.loyaltyPoints || 0} disabled />
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <Button variant="outline">Edit Profile</Button>
                </div>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
                  <Button onClick={() => setIsAddressModalOpen(true)} className="!py-2 !px-4"><Plus className="w-4 h-4 mr-2"/> Add New</Button>
                </div>

                {addresses.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-2xl">
                    <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">You haven't saved any addresses yet.</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {addresses.map(addr => (
                      <div key={addr.id} className="border border-gray-200 rounded-xl p-4 flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-gray-900">{addr.receiverName}</span>
                            <span className="text-gray-500">| {addr.receiverPhone}</span>
                            {addr.isDefault && <span className="bg-primary-100 text-primary-700 text-xs px-2 py-0.5 rounded-full font-bold">Default</span>}
                          </div>
                          <p className="text-gray-600 text-sm">{addr.streetAddress}</p>
                        </div>
                        <Button variant="outline" className="!py-1 !px-3 text-sm">Edit</Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={isAddressModalOpen} onClose={() => setIsAddressModalOpen(false)} title="Add New Address" maxWidth="max-w-2xl">
        <form onSubmit={handleAddAddress} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Receiver Name" value={newAddress.receiverName} onChange={(e) => setNewAddress({...newAddress, receiverName: e.target.value})} required />
            <InputField label="Phone Number" value={newAddress.receiverPhone} onChange={(e) => setNewAddress({...newAddress, receiverPhone: e.target.value})} required />
          </div>
          
          <InputField label="Street Address" value={newAddress.streetAddress} onChange={(e) => setNewAddress({...newAddress, streetAddress: e.target.value})} placeholder="House number, street name..." required />
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-2">
              <Map className="w-4 h-4 text-primary-500" /> Pin Location
            </label>
            <MapPicker position={mapPosition} setPosition={setMapPosition} />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button type="button" variant="outline" onClick={() => setIsAddressModalOpen(false)}>Cancel</Button>
            <Button type="submit" isLoading={isSubmitting}>Save Address</Button>
          </div>
        </form>
      </Modal>

    </MainLayout>
  );
}