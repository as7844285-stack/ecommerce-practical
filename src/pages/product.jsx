import Card from "../components/card";

export default function Product({ data, addToCart }) {
  return (
    <div className="">
      <h2>All Products </h2>
      <div className="container">
        {data.map((elem) => {
          return (
            <Card
              key={elem.id}
              id={elem.id}
              title={elem.title}
              discription={elem.description}
              price={elem.price}
              image={elem.image}
              addToCart={addToCart}
            />
          );
        })}
      </div>
    </div>
  );
}
