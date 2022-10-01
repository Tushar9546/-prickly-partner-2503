import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "../Styles/ProductDetailPage.css";
import { useDispatch, useSelector } from "react-redux";
import { addCartData } from "../Redux/CartReducer/action";

export const ProductDetailPage = () => {
  const [currentProduct, setCurrentProduct] = useState([]);
  const { section, id } = useParams();
  const data = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (section === "groceriesproducts" && id) {
      const groceries = data.GroceriesReducer.groceries;
      const productById = groceries.find(
        (groceries) => groceries.id === Number(id)
      );
      productById && setCurrentProduct(productById);
    } else if (section === "womensproducts" && id) {
      const women = data.WomenReducer.women;
      const productById = women.find((women) => women.id === Number(id));
      productById && setCurrentProduct(productById);
    }
  }, [section, id]);

  const handleAddToCart = () => {
    const temp = currentProduct;
    dispatch(addCartData(temp));
  };

  return (
    <div className="parent-wrapper">
      <div className="top-section-wrapper">
        <div className="img-wrapper">
          <div className="img-details-wrapper">
            <div className="details-img">
              <img className="img" src={currentProduct.image1} />
            </div>
            <div className="details-img">
              <img className="img" src={currentProduct.image2} />
            </div>
            <div className="details-img">
              <img className="img" src={currentProduct.image3} />
            </div>
          </div>
          <div className="main-img-wrapper">
            <img className="img" src={currentProduct.image1} />
          </div>
        </div>
        <div className="produt-detail-wrapper">
          <div>
            <h1> {currentProduct.name} </h1>
            <h3> {currentProduct.brand} </h3>
            <h1>₹ {currentProduct.price} </h1> M.R.P:{" "}
            <strike>₹ {currentProduct.mrp} </strike>
            <h2> In Stocs </h2>
            <p>
              {" "}
              Inaugural Offer <b>Free Shipping</b>
            </p>
          </div>
          <div className="payment-logo">
            <img src="https://www.jiomart.com/assets/version1664452279/smartweb/images/icons/food-icon/sodexo.svg" />
            <img src="https://www.jiomart.com/assets/version1664452279/smartweb/images/icons/food-icon/edenred.svg" />
            <img src="https://www.jiomart.com/assets/version1664452279/smartweb/images/icons/food-icon/paytm_food_wallet.svg" />
            <p> T&C Apply </p>
          </div>
          <button id="btn" onClick={handleAddToCart}>
            {" "}
            Add to Cart{" "}
          </button>
        </div>
      </div>
      <div className="middle-section-wrapper">
        <div className="heading-wrapper">
          <h1> Description </h1>
        </div>
        <div className="description-para">
          <h3> {currentProduct.name} </h3>
          <p>
            {" "}
            You’re not competing against every product online. You’re competing
            against similar products in your industry. A hammer vs. hammer, for
            example. And while there’s a lot that goes into the buying decision
            process, one of the biggest reasons why shoppers buy your product
            over others is how you choose to describe it. Describe the little
            features. Talk about the nuances. Nothing is too insignificant or
            trivial!{" "}
          </p>
        </div>
      </div>
      <div className="bottom-section-wrapper"></div>
    </div>
  );
};
