import styled from "styled-components";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FancyButton } from "../../styled-comps/commonComps";
import {
  InputDiv,
  Input,
  Label as L,
  Select,
} from "../../styled-comps/formComps";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import Loader from "../Layout/Loader/Loader";
import axios from "axios";
import { SERVER_URL } from "../../server";

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* dim background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background-color: var(--color-4);
  padding: 2rem;
  border-radius: 12px;
  max-width: 800px;
  max-height: 90vh;
  width: 90%;
  position: relative;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;

const IconBtn = styled.button`
  color: white;
  background: transparent;
  border: none;
`;

const Label = styled(L)`
  color: white;
`;

const AllCoupons = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [name, setName] = useState("");
  const [value, setValue] = useState(0);
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState("");
  const { products, loading } = useSelector((state) => state.product);
  const { shop } = useSelector((state) => state.shop);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${SERVER_URL}/coupons/shop/${shop._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setCoupons(res.data.couponCodes);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => setIsLoading(false));
  }, [shop]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      name,
      value,
      shop,
    };

    if (minAmount !== 0) payload.minAmount = minAmount;
    if (maxAmount !== 0) payload.maxAmount = maxAmount;

    if (selectedProduct.length > 0) {
      payload.selectedProductId = selectedProduct;
    }

    axios
      .post(`${SERVER_URL}/coupons`, payload, { withCredentials: true })
      .then(() => {
        toast.success("Coupon Created Successfully!");
        setOpen(false);
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`${SERVER_URL}/coupons/shop/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  };

  const columns = [
    {
      field: "id",
      headerName: "Product Id",
      minWidth: 180,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 100,
      flex: 2,
    },
    {
      field: "percentDiscount",
      headerName: "Discount",
      minWidth: 100,
      flex: 1,
    },
    {
      field: "delete",
      headerName: "",
      type: "number",
      minWidth: 120,
      flex: 0.8,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              style={{ color: "red" }}
              onClick={() => handleDelete(params.id)}
            >
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = coupons?.map((item) => ({
    id: item._id,
    name: item.name,
    percentDiscount: item.value + " %",
  }));

  if (loading || isLoading) return <Loader />;

  return (
    <Container>
      {open && (
        <ModalContainer>
          <Modal>
            <IconBtn
              style={{ alignSelf: "flex-end" }}
              onClick={() => setOpen(false)}
            >
              <RxCross2 size={30} />
            </IconBtn>
            <h2>Create Coupon Code</h2>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                margin: "1rem 0",
                padding: "0 5rem",
              }}
              aria-required={true}
              onSubmit={handleSubmit}
            >
              <InputDiv>
                <Label>Name:</Label>
                <Input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Coupon Name"
                />
              </InputDiv>
              <InputDiv>
                <Label>Discount Percentage:</Label>
                <Input
                  type="number"
                  required
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter Coupon Code Value"
                />
              </InputDiv>
              <InputDiv>
                <Label>Min Amount:</Label>
                <Input
                  type="number"
                  value={minAmount}
                  onChange={(e) => setMinAmount(e.target.value)}
                  placeholder="Enter Coupon Code Minimum Amount"
                />
              </InputDiv>
              <InputDiv>
                <Label>Max Amount:</Label>
                <Input
                  type="number"
                  value={maxAmount}
                  onChange={(e) => setMaxAmount(e.target.value)}
                  placeholder="Enter Coupon Code Maximum Amount"
                />
              </InputDiv>
              <InputDiv>
                <Label htmlFor="categ">Selected Product:</Label>
                <Select
                  id="categ"
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                >
                  <option value={"Choose your selected product"}>
                    Choose your selected product
                  </option>
                  {products &&
                    products.map((p) => (
                      <option value={p._id} key={p.name}>
                        {p.name}
                      </option>
                    ))}
                </Select>
              </InputDiv>
              <FancyButton $pad="0.5rem" $bRad="5px" type="submit">
                Submit
              </FancyButton>
            </form>
          </Modal>
        </ModalContainer>
      )}
      <FancyButton
        $pad="1rem 2rem"
        $bRad="5px"
        style={{ alignSelf: "flex-end" }}
        onClick={() => setOpen(true)}
      >
        Create Coupon Code
      </FancyButton>
      <DataGrid
        style={{ color: "black" }}
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
      />
    </Container>
  );
};

export default AllCoupons;
