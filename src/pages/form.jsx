import { useState, memo } from "react";

const Form = () => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [price, setPrice] = useState("");
  const [category, setcategory] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    let newError = {};

    if (!name.trim()) {
      newError.name = "Name field is required.";
    }

    if (!text.trim()) {
      newError.text = "Description field is required.";
    }

    if (!price.trim()) {
      newError.price = "Price field is required.";
    }

    if (!category) {
      newError.category = "Category is required.";
    }

    if (!image) {
      newError.image = "Image is required.";
    }

    setError(newError);

    if (Object.keys(newError).length > 0) {
      return;
    }

    const obj = {
      name,
      text,
      price,
      category,
      image: image.name,
    };

    localStorage.setItem("obj", JSON.stringify(obj));

    alert("Form Submitted Successfully!");

    // Clear form
    setName("");
    setText("");
    setPrice("");
    setcategory("");
    setImage(null);
    setPreviewImage(null);
    setError({});
    setSubmitted(false);
  };

  const handleImageChange = (e) => {
    const singleImage = e.target.files[0];

    if (singleImage) {
      setImage(singleImage);
      setPreviewImage(URL.createObjectURL(singleImage));

      if (submitted) {
        setError((prev) => ({
          ...prev,
          image: "",
        }));
      }
    }
  };

  return (
    <div className="productForm">
      <form onSubmit={handleSubmit}>
        <h1>Product Form</h1>

        {/* Name */}

        <input
          type="text"
          placeholder="Enter Product Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);

            if (submitted) {
              setError((prev) => ({
                ...prev,
                name: "",
              }));
            }
          }}
        />

        {error.name && <ErrorField field={error.name} />}

        {/* Description */}

        <textarea
          rows={5}
          cols={30}
          placeholder="Enter Description"
          value={text}
          onChange={(e) => {
            setText(e.target.value);

            if (submitted) {
              setError((prev) => ({
                ...prev,
                text: "",
              }));
            }
          }}
        ></textarea>

        {error.text && <ErrorField field={error.text} />}

        {/* Image */}

        <input type="file" accept="image/*" onChange={handleImageChange} />

        {error.image && <ErrorField field={error.image} />}

        {previewImage && (
          <div className="previweImg">
            <img src={previewImage} alt="Preview" />
          </div>
        )}

        {/* Category */}

        <div className="category">
          <label>Category</label>

          <select
            value={category}
            onChange={(e) => {
              setcategory(e.target.value);

              if (submitted) {
                setError((prev) => ({
                  ...prev,
                  category: "",
                }));
              }
            }}
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Books">Books</option>
          </select>

          {error.category && <ErrorField field={error.category} />}
        </div>

        {/* Price */}

        <div className="price">
          <label>Price</label>

          <input
            type="number"
            placeholder="Enter Product Price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);

              if (submitted) {
                setError((prev) => ({
                  ...prev,
                  price: "",
                }));
              }
            }}
          />

          {error.price && <ErrorField field={error.price} />}
        </div>

        <button type="submit" className="subBtn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default memo(Form);

function ErrorField({ field }) {
  return (
    <p
      style={{
        color: "red",
        fontSize: "14px",
        marginTop: "5px",
      }}
    >
      {field}
    </p>
  );
}
