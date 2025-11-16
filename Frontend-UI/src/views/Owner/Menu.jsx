import React, { useState } from "react";
import axios from "axios";
import { BURL } from "../../App";
import { useFetch } from "../../hooks/useItems";
import AddItemForm from "./AddAndEditItemFrom";
import { toast } from "sonner";


const Menu = () => {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [ShowitemForm, setShowitemForm] = useState(false)
  const [EditItem, setEditItem] = useState(null)
  const [RequestType, setRequestType] = useState('')
  const { data: menuItems, loading, error, refetch } = useFetch(
    `${BURL}/owner/item/getItem`,
  );
 
  const handleEditItem = async (item) => {
    console.log("Editing item:", item);
    setEditItem(item);
    setRequestType('edit');
    setShowitemForm(true);
 
  };
 
  // ---------------------
  //  DELETE ITEM
  // ---------------------
  const handleDeleteItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      setLoadingDelete(true);
      await axios.delete(`${BURL}/owner/item/delete/${id}`, {
        withCredentials: true,
      });

      toast.success("Item deleted successfully!");

      // Refresh the list
      refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete item");
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleAdditem = () => {
    setRequestType('add');
    setEditItem(null);
    setShowitemForm(true);
  }


  // ---------------------
  //  LOADING & ERROR
  // ---------------------
  if (loading) return <div className="p-6">Loading menu...</div>;
  if (error) return <div className="p-6 text-red-600">Error loading menu</div>;
  if (ShowitemForm) return <AddItemForm setShowitemForm={setShowitemForm} refetch={refetch} formeditdata={EditItem} RequestType={RequestType} />;


  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Menu Management</h3>

          {/* Add new item btn */}
          <button onClick={handleAdditem} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            <span className="flex items-center gap-2">
              <p>+</p> <p className="hidden md:block">Add New Item</p>
            </span>
          </button>
        </div>

        {/* ITEMS LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg p-4 hover:shadow-lg transition"
            >
              <img src={item.image} alt={item.name} className="rounded mb-3" />

              <h4 className="font-semibold text-lg mb-2">{item.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{item.category}</p>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>

              <div className="flex justify-between items-center mb-3">
                <span className="text-xl font-bold text-green-600">
                  ${item.price}
                </span>

                <span
                  className={`px-2 py-1 text-xs rounded-full ${item.stock === "Available"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                    }`}
                >
                  {item.stock}
                </span>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditItem(item)}
                  className="flex-1 bg-blue-100 text-blue-700 px-3 py-2 rounded text-sm hover:bg-blue-200"
                >
                  Edit
                </button>

                <button
                  disabled={loadingDelete}
                  onClick={() => handleDeleteItem(item._id)}
                  className="flex-1 bg-red-100 text-red-700 px-3 py-2 rounded text-sm hover:bg-red-200 disabled:opacity-50"
                >
                  {loadingDelete ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
