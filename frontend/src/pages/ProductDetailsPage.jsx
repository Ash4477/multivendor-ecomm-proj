import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Layout/Header/Header";
import ProductDetails from "../components/Products/ProductDetails";
import RelatedProducts from "../components/Products/RelatedProducts";
import axios from "axios";
import { SERVER_URL } from "../server";
import { toast } from "react-toastify";
import Loader from "../components/Layout/Loader/Loader";

const ProductDetailsPage = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${SERVER_URL}/products/${id}`)
      .then((res) => setData(res.data.product))
      .catch(() => toast.error("Server is down"))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) return <Loader />;

  return (
    <>
      <Header />
      <ProductDetails data={data} />
      {data && <RelatedProducts category={data.category} />}
    </>
  );
};

export default ProductDetailsPage;
