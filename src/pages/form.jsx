import { useEffect, useState } from "react";
import { memo } from "react";

const Form = () => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [price, setPrice] = useState("");
  const [category, setcategory]=useState("");
  const [image ,setImage ] = useState("");
  const [previewImage , setPreviewImage] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formData");

    console.log(name, text, price , category , image);
  };

 
const handleImageChange=(e)=>{
  const singleImage= e.target.file[0];
 
  if(singleImage){
    setPreviewImage(URL.createObjectURL(singleImage))

  }
}


  
  return (
    <div className="productForm">

      {previewImage && (
        <img src={previewImage} alt="image" />
      )}
      <form onSubmit={handleSubmit}>
        <h1> Product Form</h1>
        <input
          type="text"
          placeholder="Enter Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br></br>
        <textarea
          rows={5}
          cols={30}
          placeholder="Enter Discription"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <br />
        <input
      
        onChange={handleImageChange}
        type="file" accept="image/*" multiple />
        <br />
        <div className="category">
          <label htmlFor="">category</label>
          <select name="" id="" value={category}
          onChange={((e)=> setcategory(e.target.value))}>
            <option value="">Select Catagory</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Books">Books</option>

          </select>
          </div>
          {/* <p>selected:{category}</p> */}
          <div className="price">
          <label htmlFor="">Price</label>
          <input
            type="number"
            placeholder="Enter Product Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button type="submit" className="subBtn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default memo(Form);
