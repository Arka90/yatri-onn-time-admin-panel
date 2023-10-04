import BasicLayout from "@/layout/basicLayout";
import { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid"; // Import Heroicons icons // Import Heroicons icons

const ProductsPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // Track whether we're in edit mode

    // State for new/edit product fields
    const [productToEdit, setProductToEdit] = useState({
        _id: "",
        name: "",
        description: "",
        image: "",
        price: "",
    });

    const products: storeTypes[] = [
        {
            _id: "651cf6aaa46049907e6229f8",
            name: "New Shirt",
            description: "New Description............",
            price: "599",
            image: "https://yatri-onn-time-storage.s3.ap-southeast-1.amazonaws.com/a4cc6b60dcee4a49de8eb4c3189da692",
            inStock: true,
        },
        // Add more products here if needed
    ];

    const openModal = () => {
        setIsModalOpen(true);
        setIsEditing(false); // Reset to add mode
        // Clear the productToEdit state
        setProductToEdit({
            _id: "",
            name: "",
            description: "",
            image: "",
            price: "",
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProductToEdit({
            ...productToEdit,
            [name]: value,
        });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Get the selected file

        if (file) {
            // Read the selected file as a data URL
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
        // Add your logic here to save the new product to your data source
        console.log("New Product:", productToEdit);

        // Close the modal
        closeModal();
    };

    const handleEditProduct = (product: storeTypes) => {
        // Set the productToEdit state with the data of the product being edited
        setProductToEdit(product);
        setIsEditing(true); // Switch to edit mode
        setIsModalOpen(true); // Open the modal
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
                                        </th>{" "}
                                        {/* New column for actions */}
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
                                                <button>
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
                                    value={productToEdit.name}
                                    onChange={handleInputChange}
                                    className="border bg-slate-800 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-slate-400"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-white text-sm font-semibold mb-2">
                                    Description:
                                </label>
                                <textarea
                                    name="description"
                                    value={productToEdit.description}
                                    onChange={handleInputChange}
                                    className="border bg-slate-800 rounded-md px-3 py-2 w-full h-32 resize-none focus:outline-none focus:ring focus:border-slate-400"
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label className="block text-white text-sm font-semibold mb-2">
                                    Image:
                                </label>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*" // Restrict to image files
                                    onChange={(e) => handleImageUpload(e)}
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
                                    value={productToEdit.price}
                                    onChange={handleInputChange}
                                    className="border bg-slate-800 rounded-md px-3 py-2 w-full focus:outline-none focus:ring focus:border-slate-400"
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
                                    className="btn w-full bg-slate-800 text-white border hover:bg-gray-300 "
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
