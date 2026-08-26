import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store, Upload, MapPin, Phone, Clock, Mail } from "lucide-react";
import MainLayout from "../../layouts/MainLayout";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { Toast } from "../../utils/toast";
import { mediaService } from "../../services/mediaService";
import { restaurantService } from "../../services/restaurantService";
import TextAreaField from "../../components/TextAreaField";
import TimePickerField from "../../components/TimePickerField";

export default function RegisterRestaurant() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    contactPhone: "",
    ownerEmail: "",
    openTime: "08:00",
    closeTime: "22:00",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let coverImageUrl = "";

      if (imageFile) {
        const uploadRes = await mediaService.uploadImage(imageFile, "restaurants");
        if (uploadRes.success) {
          coverImageUrl = uploadRes.data;
        }
      }

      const payload = {
        ...formData, 
        coverImageUrl: coverImageUrl,
        openTime: formData.openTime + ":00",
        closeTime: formData.closeTime + ":00",
      };

      const res = await restaurantService.createRestaurant(payload);
      
      if (res.success) {
        Toast.success("Restaurant registered successfully! Please wait for admin approval.");
        navigate("/");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <Store className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Partner with QuickFood</h1>
          <p className="text-gray-500 mt-2">Register your restaurant and reach thousands of new customers.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
          <div className="flex flex-col items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors relative overflow-hidden">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 text-gray-400 mb-3" />
                  <p className="text-sm text-gray-500 font-semibold">Click to upload restaurant cover</p>
                  <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                </div>
              )}
              <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField 
              label="Restaurant Name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              placeholder="e.g. The Golden Burger"
            />
            <InputField 
              label="Business Email"
              type="email"
              name="ownerEmail" 
              value={formData.ownerEmail} 
              onChange={handleChange} 
              required 
              icon={Mail}
              placeholder="e.g. owner@restaurant.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField 
              label="Contact Phone" 
              name="contactPhone" 
              value={formData.contactPhone} 
              onChange={handleChange} 
              required 
              icon={Phone}
              placeholder="e.g. 0987654321"
            />
            <InputField 
              label="Full Address" 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
              required 
              icon={MapPin}
              placeholder="e.g. 123 Main St, District 1"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TimePickerField 
              label="Opening Time" 
              name="openTime" 
              value={formData.openTime} 
              onChange={handleChange} 
              required 
              icon={Clock}
            />
            <TimePickerField 
              label="Closing Time" 
              name="closeTime" 
              value={formData.closeTime} 
              onChange={handleChange} 
              required 
              icon={Clock}
            />
          </div>

          <TextAreaField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tell customers about your food and restaurant..."
          />

          <Button type="submit" className="w-full !py-3 !text-lg" isLoading={isLoading}>
            Submit Application
          </Button>
        </form>
      </div>
    </MainLayout>
  );
}