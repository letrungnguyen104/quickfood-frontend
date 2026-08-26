import { useState, useEffect } from "react";
import { Plus, Edit2, Image as ImageIcon, Trash2, Flame } from "lucide-react"; 
import { restaurantService } from "../../services/restaurantService";
import { menuService } from "../../services/menuService";
import Button from "../../components/Button";
import { Toast } from "../../utils/toast";

import ItemFormModal from "./components/ItemFormModal";
import CategoryFormModal from "./components/CategoryFormModal";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

export default function VendorMenu() {
  const [restaurant, setRestaurant] = useState(null);
  const [categories, setCategories] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [newCategoryName, setNewCategoryName] = useState("");

  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [deleteInfo, setDeleteInfo] = useState({ isOpen: false, type: "", id: null, name: "" });
  const [isDeleting, setIsDeleting] = useState(false);

  const currentVendorEmail = "socolla1004@gmail.com"; 

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const resData = await restaurantService.getMyRestaurant(currentVendorEmail);
      if (resData.success) {
        setRestaurant(resData.data);
        const menuData = await menuService.getMenuByRestaurant(resData.data.id);
        if (menuData.success) {
          setCategories(menuData.data);
          if (menuData.data.length > 0 && !activeCategoryId) {
            setActiveCategoryId(menuData.data[0].id);
          }
        }
      }
    } catch (error) {
      console.error("Failed to fetch vendor data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenAddItem = () => {
    setEditingItem(null);
    setIsItemModalOpen(true);
  };

  const handleOpenEditItem = (item) => {
    setEditingItem(item);
    setIsItemModalOpen(true);
  };

  const handleOpenAddCategory = () => {
    setEditingCategory(null);
    setIsCategoryModalOpen(true);
  };

  const handleOpenEditCategory = (category) => {
    setEditingCategory(category);
    setIsCategoryModalOpen(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      if (deleteInfo.type === 'category') {
        await menuService.deleteCategory(deleteInfo.id);
        Toast.success("Category deleted successfully!");
        if (activeCategoryId === deleteInfo.id) setActiveCategoryId(null);
      } else if (deleteInfo.type === 'item') {
        await menuService.deleteMenuItem(deleteInfo.id);
        Toast.success("Item deleted successfully!");
      }
      fetchData();
      setDeleteInfo({ isOpen: false, type: "", id: null, name: "" });
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    try {
      const res = await menuService.createCategory({
        restaurantId: restaurant.id,
        name: newCategoryName,
        sortOrder: categories.length
      });
      if (res.success) {
        Toast.success("Category created successfully!!");
        setNewCategoryName("");
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <div className="p-8 text-center text-gray-500 font-medium">Loading your menu...</div>;
  if (!restaurant) return <div className="p-8 text-center text-red-500 font-medium">Restaurant not found for this account.</div>;

  const activeCategory = categories.find(c => c.id === activeCategoryId);

  return (
    <div className="h-full flex flex-col md:flex-row gap-6 relative">
      
      <div className="w-full md:w-1/3 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col min-h-[500px]">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Categories</h2>
        
        <Button onClick={handleOpenAddCategory} variant="outline" className="w-full mb-6 !rounded-xl border-dashed border-2 hover:border-primary-500 hover:bg-primary-50">
          <Plus className="w-5 h-5 mr-2" /> Add Category
        </Button>

        <div className="flex-1 overflow-y-auto space-y-2 pr-2">
          {categories.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">No categories yet.</p>
          ) : (
            categories.map(category => (
              <div key={category.id} className="flex gap-1 items-center">
                <button
                  onClick={() => setActiveCategoryId(category.id)}
                  className={`flex-1 text-left px-4 py-3 rounded-xl transition-all font-medium flex justify-between items-center ${
                    activeCategoryId === category.id ? 'bg-primary-50 text-primary-700 border-primary-200' : 'hover:bg-gray-50 text-gray-700 border-transparent'
                  } border`}
                >
                  <span className="truncate pr-2">{category.name}</span>
                  <span className="text-xs bg-white px-2.5 py-1 rounded-full text-gray-500 border border-gray-200 shrink-0">{category.menuItems?.length || 0}</span>
                </button>

                <button 
                  onClick={() => handleOpenEditCategory(category)}
                  className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  title="Edit category"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button 
                  onClick={() => setDeleteInfo({ isOpen: true, type: 'category', id: category.id, name: category.name })}
                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete category"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="w-full md:w-2/3 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col min-h-[500px]">
        {activeCategory ? (
          <>
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{activeCategory.name}</h2>
                <p className="text-sm text-gray-500 mt-1">Manage items in this category</p>
              </div>
              <Button onClick={handleOpenAddItem} className="!rounded-xl shadow-sm">
                <Plus className="w-5 h-5 mr-1"/> Add Item
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2">
              {(!activeCategory.menuItems || activeCategory.menuItems.length === 0) ? (
                <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200 mt-4">
                  <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">This category is empty</p>
                  <p className="text-sm text-gray-400 mt-1">Click "Add Item" to add your first dish.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {activeCategory.menuItems.map(item => (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-100 rounded-2xl hover:shadow-md transition-shadow bg-white relative overflow-hidden">
                      {item.bestSeller && (
                        <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm z-10 flex items-center gap-1">
                          <Flame className="w-3 h-3" /> Best Seller
                        </div>
                      )}
                      
                      <img 
                        src={item.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&q=80"} 
                        alt={item.name} 
                        className="w-full sm:w-28 h-40 sm:h-28 object-cover rounded-xl bg-gray-100 shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-bold text-lg text-gray-900 leading-tight">{item.name}</h3>
                            <span className="font-bold text-primary-600 text-lg ml-2">${item.price}</span>
                          </div>
                          <p className="text-sm text-gray-500 line-clamp-2 mt-1.5">{item.description}</p>
                        </div>
                        <div className="mt-4 sm:mt-0 flex items-center justify-between">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${item.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {item.available ? 'Available' : 'Sold Out'}
                          </span>
                          
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleOpenEditItem(item)} 
                              className="text-gray-400 hover:text-primary-600 bg-gray-50 p-2 rounded-lg hover:bg-primary-50 transition-colors"
                              title="Edit item"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => setDeleteInfo({ isOpen: true, type: 'item', id: item.id, name: item.name })} 
                              className="text-gray-400 hover:text-red-600 bg-gray-50 p-2 rounded-lg hover:bg-red-50 transition-colors"
                              title="Delete item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 h-full">
             <ImageIcon className="w-16 h-16 text-gray-200 mb-4" />
             <p>Select or create a category to view items</p>
          </div>
        )}
      </div>

      <ItemFormModal 
        isOpen={isItemModalOpen}
        onClose={() => setIsItemModalOpen(false)}
        activeCategory={activeCategory}
        initialData={editingItem}
        onSuccess={fetchData}
      />

      <CategoryFormModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        initialData={editingCategory}
        restaurantId={restaurant?.id}
        onSuccess={fetchData}
      />

      <ConfirmDeleteModal 
        isOpen={deleteInfo.isOpen}
        onClose={() => setDeleteInfo({ ...deleteInfo, isOpen: false })}
        onConfirm={confirmDelete}
        title={`Delete ${deleteInfo.type === 'category' ? 'Category' : 'Item'}`}
        message={`Are you sure you want to delete "${deleteInfo.name}"? This action cannot be undone.`}
        isLoading={isDeleting}
      />

    </div>
  );
}