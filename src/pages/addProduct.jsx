import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

const AddProduct = () => {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {

    e.preventDefault();

    const data = new FormData();

    data.append("name", name);
    data.append("description", description);
    data.append("price", price);
    data.append("image", image);

    try {

      const response = await axiosInstance.post(
        "/product",
        data
      );

      console.log(response.data);

      alert("Product added successfully!");

      setName("");
      setDescription("");
      setPrice("");
      setImage(null);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Product add failed"
      );

    }
  };

  return (
    <div className="add-product">

      <h1>Add New Product</h1>

      <form onSubmit={handleSubmit}>

        {/* Product Name */}

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Description */}

        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        {/* Price */}

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          required
        />

        {/* Image */}

        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setImage(e.target.files[0])
          }
          required
        />

        {/* Submit */}

        <button type="submit">
          Add Product
        </button>

      </form>

    </div>
  );
};

export default AddProduct;