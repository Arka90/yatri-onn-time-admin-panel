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
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
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
  const deleteOrder = async (orderId: string) => {
    const token = getAdminToken();
    try {
      const response = await axios.delete<Order>(
        API_BASE_URL + `/api/order/` + orderId,
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

  const updateOrder = async (
    productId: string,
    updatedProductData: Partial<Order>
  ) => {};

  const handleDeleteOrder = (orderId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteOrder(orderId);
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
                        <button onClick={() => handleDeleteOrder(order._id)}>
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
    </BasicLayout>
  );
};

export default OrdersPage;
