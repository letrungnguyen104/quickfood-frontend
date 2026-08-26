import { useState, useEffect } from "react";
import Modal from "../../../components/Modal";
import InputField from "../../../components/InputField";
import TextAreaField from "../../../components/TextAreaField";
import Button from "../../../components/Button";
import { menuService } from "../../../services/menuService";
import { Toast } from "../../../utils/toast";

export default function CategoryFormModal({ isOpen, onClose, initialData, restaurantId, onSuccess }) {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = !!initialData;

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          name: initialData.name || "",
          description: initialData.description || ""
        });
      } else {
        setFormData({ name: "", description: "" });
      }
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSubmitting(true);
    try {
      if (isEditMode) {
        await menuService.updateCategory(initialData.id, { 
          name: formData.name,
          description: formData.description
        });
        Toast.success("Category updated successfully!");
      } else {
        await menuService.createCategory({
          restaurantId: restaurantId,
          name: formData.name,
          description: formData.description,
          sortOrder: 0
        });
        Toast.success("Category created successfully!");
      }
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditMode ? "Edit Category" : "Add New Category"} maxWidth="max-w-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField 
          label="Category Name" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
          placeholder="e.g. Main Course, Drinks" 
        />
        
        <TextAreaField 
          label="Description (Optional)" 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          placeholder="Briefly describe this category" 
          rows={2}
        />

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
          <Button type="submit" isLoading={isSubmitting}>{isEditMode ? "Save Changes" : "Create Category"}</Button>
        </div>
      </form>
    </Modal>
  );
}