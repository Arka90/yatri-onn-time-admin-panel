import React, { useState, useEffect } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import BasicLayout from "@/layout/basicLayout";
import getAdminToken from "@/lib/utils/getAdminToken";

const API_BASE_URL: string | undefined =
  "http://ec2-52-207-129-114.compute-1.amazonaws.com:3100";

interface Order {
  address: string;
  price: string;
  product: string;
  status: string;
  user: string;
  _id: string;
}

const OrdersPage: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  const [orderToEdit, setOrderToEdit] = useState<Order>({
    address: "",
    price: "",
    product: "",
    status: "",
    user: "",

    _id: "",
  });

  useEffect(() => {
    const token = getAdminToken();
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = getAdminToken();
    try {
      const response = await axios.get(API_BASE_URL + `/api/order/all`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(response.data.data);
      setOrders(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const updateProduct = async (
    productId: string,
    updatedProductData: Partial<Order>
  ) => {};

  const deleteProduct = async (productId: string) => {
    const token = getAdminToken();
    try {
      const response = await axios.delete<Product>(
        API_BASE_URL + `/api/product/` + productId,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      //fetch again
      fetchOrders();
    } catch (error) {
      console.log("error", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const handleAddProduct = async () => {
    const token = getAdminToken();
    try {
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEditProduct = () => {
    const { _id, ...updatedData } = orderToEdit;
    updateProduct(_id, updatedData);
    closeModal();
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(productId);
    }
  };

  return (
    <BasicLayout>
      <>
        <div className="font-semibold text-4xl text-slate-800 mb-6">
          Order details
        </div>

        <div className="col-span-2 card h-fit my-5">
          <div className="flex items-center justify-around">
            <div className="overflow-x-auto">
              <table className="w-full table-auto" style={{ width: "80vw" }}>
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Address</th>
                    <th className="border px-4 py-2">Price</th>
                    <th className="border px-4 py-2">Product</th>
                    <th className="border px-4 py-2">Status</th>
                    <th className="border px-4 py-2">User</th>
                    <th className="border px-4 py-2">Id</th>
                    <th className="border px-4 py-2">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="border px-4 py-2 text-center">
                        {order.address}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {order.price}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {order.product}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {order.status}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {order.user}
                      </td>
                      <td className="border px-4 py-2 text-center cursor-pointer">
                        <button
                          onClick={() => handleEditProduct()}
                          className="mr-2"
                        >
                          <PencilIcon className="h-6 w-6 text-slate-500 hover:text-slate-700" />
                        </button>
                      </td>
                      <td className="border px-4 py-2 text-center cursor-pointer">
                        <button onClick={() => handleDeleteProduct(order._id)}>
                          <TrashIcon className="h-6 w-6 text-slate-500 hover:text-slate-700" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-slate-800 p-6 rounded-lg shadow-xl">
              <h2 className="text-2xl text-white font-semibold mb-4">
                {isEditing ? "Edit Product" : "Add New Product"}
              </h2>
              <div className="mb-4">
                <label className="block text-white  text-sm font-semibold mb-2">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="border text-white bg-slate-800 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-slate-400"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-semibold mb-2">
                  Description:
                </label>
                <textarea
                  name="description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  className="border text-white bg-slate-800 rounded-md px-3 py-2 w-full h-32 resize-none focus:outline-none focus:ring focus:border-slate-400"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-semibold mb-2">
                  Image:
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="border bg-slate-800 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-slate-400"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-semibold mb-2">
                  Price:
                </label>
                <input
                  type="text"
                  name="price"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  className="border text-white bg-slate-800 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-slate-400"
                />
              </div>
              <div className=" py-4">
                <button
                  onClick={isEditing ? handleEditProduct : handleAddProduct}
                  className="btn w-full mb-4 bg-white text-slate-800 hover:bg-slate-400"
                >
                  {isEditing ? "Save Changes" : "Add Product"}
                </button>
                <button
                  onClick={closeModal}
                  className="btn w-full bg-slate-800 text-white border hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </BasicLayout>
  );
};

export default OrdersPage;
