import { useState, useEffect } from "react";
import { Upload, Flame } from "lucide-react";
import Modal from "../../../components/Modal";
import InputField from "../../../components/InputField";
import TextAreaField from "../../../components/TextAreaField";
import Button from "../../../components/Button";
import { mediaService } from "../../../services/mediaService";
import { menuService } from "../../../services/menuService";
import { Toast } from "../../../utils/toast";

export default function ItemFormModal({ isOpen, onClose, activeCategory, initialData, onSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [itemForm, setItemForm] = useState({ name: "", price: "", description: "", isBestSeller: false, isAvailable: true });
  const [itemImageFile, setItemImageFile] = useState(null);
  const [itemImagePreview, setItemImagePreview] = useState("");

  const isEditMode = !!initialData;

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setItemForm({
          name: initialData.name,
          price: initialData.price,
          description: initialData.description || "",
          isBestSeller: initialData.bestSeller ?? false,
          isAvailable: initialData.available ?? true, 
        });
        setItemImagePreview(initialData.imageUrl || "");
        setItemImageFile(null);
      } else {
        setItemForm({ name: "", price: "", description: "", isBestSeller: false, isAvailable: true });
        setItemImagePreview("");
        setItemImageFile(null);
      }
    }
  }, [isOpen, initialData]);

  const handleFormChange = (e) => {
    setItemForm({ ...itemForm, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setItemImageFile(file);
      setItemImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!activeCategory) return;

    setIsSubmitting(true);
    try {
      let imageUrl = isEditMode ? initialData.imageUrl : "";

      if (itemImageFile) {
        const uploadRes = await mediaService.uploadImage(itemImageFile, "menu_items");
        if (uploadRes.success) {
          imageUrl = uploadRes.data;
        }
      }

      const payload = {
        name: itemForm.name,
        price: parseFloat(itemForm.price),
        description: itemForm.description,
        imageUrl: imageUrl,
        isAvailable: itemForm.isAvailable,
        isBestSeller: itemForm.isBestSeller
      };

      if (isEditMode) {
        await menuService.updateMenuItem(initialData.id, payload);
        Toast.success("Menu item updated successfully!");
      } else {
        await menuService.addMenuItem(activeCategory.id, payload);
        Toast.success("Menu item added successfully!");
      }
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to save item:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditMode ? "Edit Menu Item" : "Add New Item"}>
      {!isEditMode && (
        <p className="text-sm text-gray-500 mb-6 -mt-4">
          Adding to: <span className="font-bold text-primary-600">{activeCategory?.name}</span>
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col items-center justify-center w-full mb-2">
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors relative overflow-hidden group">
            {itemImagePreview ? (
              <>
                <img src={itemImagePreview} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-sm font-medium">Change Photo</span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 font-medium">Upload dish photo</p>
              </div>
            )}
            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Dish Name" name="name" value={itemForm.name} onChange={handleFormChange} required placeholder="e.g. Burger" />
          <InputField label="Price ($)" type="number" name="price" value={itemForm.price} onChange={handleFormChange} required placeholder="e.g. 9.99" />
        </div>

        <TextAreaField label="Description" name="description" value={itemForm.description} onChange={handleFormChange} placeholder="What's in this dish?" rows={2} />

        <div className="flex gap-6 pt-2">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="isBestSeller"
              name="isBestSeller"
              checked={itemForm.isBestSeller}
              onChange={(e) => setItemForm({ ...itemForm, isBestSeller: e.target.checked })} 
              className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 cursor-pointer"
            />
            <label
              htmlFor="isBestSeller"
              className="text-sm font-medium text-gray-700 cursor-pointer flex items-center gap-1.5"
            >
              <Flame className="w-4 h-4 text-orange-500" />
              Best Seller
            </label>
          </div>
          {isEditMode && (
            <div className="flex items-center gap-2">
              <input type="checkbox" id="isAvailable" name="isAvailable" checked={itemForm.isAvailable} onChange={(e) => setItemForm({ ...itemForm, isAvailable: e.target.checked })} className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500 cursor-pointer"/>
              <label htmlFor="isAvailable" className="text-sm font-medium text-gray-700 cursor-pointer">Available (In Stock)</label>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isSubmitting}>{isEditMode ? "Save Changes" : "Create Item"}</Button>
        </div>
      </form>
    </Modal>
  );
}