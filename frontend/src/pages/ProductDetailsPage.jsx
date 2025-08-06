import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { productData } from "../static/data";
import Header from "../components/Layout/Header/Header";
import ProductDetails from "../components/Products/ProductDetails";
import RelatedProducts from "../components/Products/RelatedProducts";

const ProductDetailsPage = () => {
  const [data, setData] = useState(null);
  const { name } = useParams();

  useEffect(() => {
    const productName = name.replace(/-/g, " ");
    const tempData = productData.find((d) => d.name === productName);
    setData(tempData);
  }, [name]);

  return (
    <>
      <Header />
      <ProductDetails data={data} />
      {data && <RelatedProducts category={data.category} />}
    </>
  );
};

export default ProductDetailsPage;
