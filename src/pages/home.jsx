// import { memo } from "react";
// import Banner from "../components/banner";
// import Card from "../components/card";

// const Home = ({
//   products = [],
//   toggleWishlist,
//   favData = [],
//   loading = false,
// }) => {
//   return (
//     <div>
//       <Banner />

//       <div className="container">
//         {loading ? (
//           <p>Loading products...</p>
//         ) : !Array.isArray(products) || products.length === 0 ? (
//           <p>No products found.</p>
//         ) : (
//           products.map((product) => (
//             <Card
//               key={product._id}
//               product={product}
//               toggleWishlist={toggleWishlist}
//               favData={favData}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default memo(Home);

import { memo } from "react";
import Banner from "../components/banner";
import Card from "../components/card";

const Home = ({ products = [], toggleWishlist, favData }) => {
  return (
    <div>
      <Banner />
      <div className="container">
        {products.map((elem) => (
          <Card
            key={elem._id}
            product={elem}
            toggleWishlist={toggleWishlist}
            favData={favData}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(Home);
