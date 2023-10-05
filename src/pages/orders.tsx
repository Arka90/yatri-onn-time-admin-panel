import React, { useState, useEffect } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import BasicLayout from "@/layout/basicLayout";
import getAdminToken from "@/lib/utils/getAdminToken";
import PulseLoader from "react-spinners/PulseLoader";

const API_BASE_URL: string | undefined =
  "http://ec2-52-207-129-114.compute-1.amazonaws.com:3100";

interface Order {
  address: any;
  price: string;
  product: any;
  status: string;
  user: any;
  _id: string;
}

const statusOptions = [
  { key: "Pending", value: "pending" },
  { key: "In Progress", value: "in_progress" },
  { key: "Out for Delivery", value: "out_for_delivery" },
  { key: "Delivered", value: "delivered" },
];

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<{
    [orderId: string]: string;
  }>({});
  const [isEditLoading, setIsEditLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [currentEditId, setCurrentEditId] = useState("");
  const [currentDeleteId, setCurrentDeleteId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    const token = getAdminToken();
    try {
      const response = await axios.get(API_BASE_URL + `/api/order/all`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setOrders(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    setCurrentDeleteId(orderId);
    setIsDeleteLoading(true);
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
      setIsDeleteLoading(false);
      fetchOrders().then(() => {
        alert("Order deleted successfully!");
      });
    } catch (error) {
      console.log("error", error);
      setIsDeleteLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    setCurrentEditId(orderId);
    setIsEditLoading(true);
    const token = getAdminToken();
    try {
      const response = await axios.patch(
        API_BASE_URL + `/api/order/` + orderId,
        { status: newStatus },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setIsEditLoading(false);
      fetchOrders().then(() => {
        alert("Order status updated successfully!");
      });
    } catch (error) {
      console.log("error", error);
      alert("Error updating order status. Please try again.");
      setIsEditLoading(false);
    }
  };

  const handleUpdateStatus = (orderId: string) => {
    const selectedStatus = selectedStatuses[orderId];
    if (selectedStatus) {
      updateOrderStatus(orderId, selectedStatus);
    }
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setSelectedStatuses({
      ...selectedStatuses,
      [orderId]: newStatus,
    });
  };

  return (
    <BasicLayout>
      <>
        <div className="font-semibold text-4xl text-slate-800 mb-6">
          Order details
        </div>
        {isLoading ? (
          <>
            <PulseLoader color="#334155" />
          </>
        ) : (
          <></>
        )}
        <div className="col-span-2 card h-fit my-5">
          <div className="flex items-center justify-around">
            <div className="overflow-x-auto">
              <table className="w-full table-auto" style={{ width: "80vw" }}>
                <thead>
                  <tr>
                    <th className="border px-4 py-2">User</th>
                    <th className="border px-4 py-2">Product</th>
                    <th className="border px-4 py-2">Address</th>
                    <th className="border px-4 py-2">Price</th>
                    <th className="border px-4 py-2">Status</th>
                    <th className="border px-4 py-2">Update</th>
                    <th className="border px-4 py-2">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="border px-4 py-2 text-center">
                        {order.user?.name}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {order.product?.name}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {order.address?.house_no}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {order.price}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <select
                          value={selectedStatuses[order._id] || order.status}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                        >
                          {statusOptions.map((statusOption) => (
                            <option
                              key={statusOption.value}
                              value={statusOption.value}
                            >
                              {statusOption.key}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="border px-4 py-2 text-center">
                        {isEditLoading && currentEditId === order._id ? (
                          <>
                            {" "}
                            <PulseLoader color="#334155" size={10} />
                          </>
                        ) : (
                          <>
                            <button
                              className="bg-slate-200 text-slate-600 rounded-md font-semibold"
                              style={{
                                height: "30px",
                                width: "80px",
                              }}
                              onClick={() => handleUpdateStatus(order._id)}
                            >
                              Update
                            </button>
                          </>
                        )}
                      </td>

                      <td className="border px-4 py-2 text-center">
                        {isDeleteLoading && currentDeleteId === order._id ? (
                          <>
                            {" "}
                            <PulseLoader color="#334155" size={10} />
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleDeleteOrder(order._id)}
                            >
                              <TrashIcon className="h-6 w-6 text-slate-500 hover:text-slate-700" />
                            </button>
                          </>
                        )}
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
