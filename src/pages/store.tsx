import BasicLayout from "@/layout/basicLayout";
import { useState, useEffect } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios";

// Define your API base URL
const API_BASE_URL: string | undefined = process.env.NEXT_PUBLIC_API_BASE_URL;

// Define your product interface
interface Product {
    _id: string;
    name: string;
    description: string;
    image: string;
    price: string;
    inStock: boolean;
}

const ProductsPage: React.FC = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);

    const [productToEdit, setProductToEdit] = useState<Product>({
        _id: "",
        name: "",
        description: "",
        image: "",
        price: "",
        inStock: false,
    });

    useEffect(() => {
        // Fetch products from your backend when the component mounts
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get<Product[]>(
                `${API_BASE_URL}/api/products`
            );
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const createProduct = async (
        name: string,
        description: string,
        price: string,
        image: string
    ) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/api/products`,
                (name = name)
            );
            console.log("Response from createProduct:", response);
            // Fetch products again after creating a new product
            fetchProducts();
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    const updateProduct = async (
        productId: string,
        updatedProductData: Partial<Product>
    ) => {
        try {
            await axios.put(
                `${API_BASE_URL}/api/products/${productId}`,
                updatedProductData
            );
            // Fetch products again after updating
            fetchProducts();
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const deleteProduct = async (productId: string) => {
        try {
            await axios.delete(`${API_BASE_URL}/api/products/${productId}`);
            // Fetch products again after deleting
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
        setIsEditing(false);
        setProductToEdit({
            _id: "",
            name: "",
            description: "",
            image: "",
            price: "",
            inStock: false,
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     setProductToEdit({
    //         ...productToEdit,
    //         [name]: value,
    //     });
    // };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProductToEdit({
                    ...productToEdit,
                    image: reader.result as string,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddProduct = () => {
        createProduct(name, description, price);
        closeModal();
    };

    const handleEditProduct = () => {
        const { _id, ...updatedData } = productToEdit;
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
                    Product details
                </div>
                <button
                    onClick={openModal}
                    className="btn text-white bg-slate-800 hover:bg-slate-700"
                >
                    Add a new Product
                </button>
                <div className="col-span-2 card h-fit my-5">
                    <div className="flex items-center justify-around">
                        <div className="overflow-x-auto">
                            <table
                                className="w-full table-auto"
                                style={{ width: "80vw" }}
                            >
                                <thead>
                                    <tr>
                                        <th className="border px-4 py-2">ID</th>
                                        <th className="border px-4 py-2">
                                            Name
                                        </th>
                                        <th className="border px-4 py-2">
                                            Description
                                        </th>
                                        <th className="border px-4 py-2">
                                            Price
                                        </th>
                                        <th className="border px-4 py-2">
                                            Image
                                        </th>
                                        <th className="border px-4 py-2">
                                            In Stock
                                        </th>
                                        <th className="border px-4 py-2">
                                            Edit
                                        </th>
                                        <th className="border px-4 py-2">
                                            Delete
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product._id}>
                                            <td className="border px-4 py-2 text-center">
                                                {product._id}
                                            </td>
                                            <td className="border px-4 py-2 text-center">
                                                {product.name}
                                            </td>
                                            <td className="border px-4 py-2 text-center">
                                                {product.description}
                                            </td>
                                            <td className="border px-4 py-2 text-center">
                                                {product.price}
                                            </td>
                                            <td className="border px-4 py-2 text-center">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    style={{
                                                        maxWidth: "100px",
                                                    }}
                                                />
                                            </td>
                                            <td className="border px-4 py-2 text-center">
                                                {product.inStock ? "Yes" : "No"}
                                            </td>
                                            <td className="border px-4 py-2 text-center cursor-pointer">
                                                <button
                                                    onClick={() =>
                                                        handleEditProduct(
                                                            product
                                                        )
                                                    }
                                                    className="mr-2"
                                                >
                                                    <PencilIcon className="h-6 w-6 text-slate-500 hover:text-slate-700" />
                                                </button>
                                            </td>
                                            <td className="border px-4 py-2 text-center cursor-pointer">
                                                <button
                                                    onClick={() =>
                                                        handleDeleteProduct(
                                                            product._id
                                                        )
                                                    }
                                                >
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
            {/* Modal */}
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
                                    onClick={
                                        isEditing
                                            ? handleEditProduct
                                            : handleAddProduct
                                    }
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
            {/* End Modal */}
        </BasicLayout>
    );
};

export default ProductsPage;
