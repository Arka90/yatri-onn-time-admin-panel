import React, { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import getAdminToken from "@/lib/utils/getAdminToken";
import axios from "axios";

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

export default function Order({ order }) {
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

    const fetchOrders = async () => {
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
        }
    };

    const handleDeleteOrder = async (orderId: string) => {
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

            fetchOrders();
        } catch (error) {
            console.log("error", error);
        }
    };

    const updateOrderStatus = async (orderId: string, newStatus: string) => {
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
            fetchOrders();
        } catch (error) {
            console.log("error", error);
        }
    };

    const handleUpdateStatus = (orderId: string) => {
        if (selectedStatus) {
            updateOrderStatus(orderId, selectedStatus);
            setSelectedStatus(null);
        }
    };
    return (
        <tr key={order._id}>
            <td className="border px-4 py-2 text-center">{order.user}</td>
            <td className="border px-4 py-2 text-center">{order.product}</td>
            <td className="border px-4 py-2 text-center">{order.address}</td>
            <td className="border px-4 py-2 text-center">{order.price}</td>
            <td className="border px-4 py-2 text-center">
                <select
                    value={selectedStatus || order.status}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                >
                    {[
                        "pending",
                        "in_progress",
                        "out_for_delivery",
                        "delivered",
                    ].map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </td>

            <td className="border  px-4 py-2 text-center">
                <button
                    className="bg-slate-400  rounded-md font-semibold"
                    style={{
                        height: "30px",
                        width: "80px",
                    }}
                    onClick={() => handleUpdateStatus(order._id)}
                >
                    Update
                </button>
            </td>

            <td className="border px-4 py-2 text-center">
                <button onClick={() => handleDeleteOrder(order._id)}>
                    <TrashIcon className="h-6 w-6 text-slate-500 hover:text-slate-700" />
                </button>
            </td>
        </tr>
    );
}
