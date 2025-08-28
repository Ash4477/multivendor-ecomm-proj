import styled from "styled-components";
import { Link as L } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineMoneyCollect,
  AiOutlineEye,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { FaLocationArrow } from "react-icons/fa";
import { IoReceiptOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import { useEffect, useMemo } from "react";
import { getShopOrders } from "../../redux/actions/order";
import { getAllShopProducts } from "../../redux/actions/product";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const Container = styled.div`
  padding: 0 1rem;
  margin-bottom: 1rem;
`;

const Card = styled.div`
  background-color: var(--color-5);
  padding: 1rem;
  border-radius: 5px;
  max-width: 300px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CardText = styled.b`
  font-family: Roboto, sans-serif;
  margin-left: 2rem;
  font-size: 19px;
`;

const Link = styled(L)`
  margin-left: 2rem;
  font-size: 14px;
  color: #17ebf7;
  border-bottom: 1px solid #17ebf7;
  width: max-content;
`;

const Title = styled.h2`
  margin-bottom: 0.5rem;
  margin-top: 1rem;
`;

const orderColumns = [
  { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

  {
    field: "status",
    headerName: "Status",
    minWidth: 130,
    flex: 0.7,
    cellClassName: (params) =>
      params.row.status === "Delivered" ? "greenColor" : "redColor",
  },
  {
    field: "totalItems",
    headerName: "Total Items",
    type: "number",
    minWidth: 130,
    flex: 0.7,
  },

  {
    field: "total",
    headerName: "Total",
    type: "number",
    minWidth: 130,
    flex: 0.8,
  },

  {
    field: "actions",
    flex: 1,
    minWidth: 150,
    headerName: "",
    type: "number",
    sortable: false,
    renderCell: (params) => {
      return (
        <>
          <L to={`/shop/order/${params.id}`}>
            <Button>
              <AiOutlineArrowRight size={20} />
            </Button>
          </L>
        </>
      );
    },
  },
];

const productColumns = [
  {
    field: "id",
    headerName: "Product Id",
    minWidth: 150,
    flex: 0.7,
  },
  {
    field: "name",
    headerName: "Name",
    minWidth: 180,
    flex: 1.4,
  },
  {
    field: "price",
    headerName: "Price",
    minWidth: 100,
    flex: 0.6,
  },
  {
    field: "stock",
    headerName: "Stock",
    minWidth: 80,
    flex: 0.5,
  },
  {
    field: "sold",
    headerName: "Sold Out",
    minWidth: 130,
    flex: 0.6,
  },
  {
    field: "preview",
    headerName: "",
    type: "number",
    sortable: false,
    minWidth: 100,
    flex: 0.8,
    renderCell: (params) => {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <L to={`/products/${params.row.id}`}>
            <AiOutlineEye size={20} />
          </L>
        </div>
      );
    },
  },
];

const Dashboard = () => {
  const { shop } = useSelector((state) => state.shop);
  const { shopOrders } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    if (shop?._id) {
      dispatch(getShopOrders(shop._id));
      dispatch(getAllShopProducts(shop._id));
    }
  }, [shop, dispatch]);

  const totalBalance = useMemo(() => {
    let totalAmount = 0;
    shopOrders.forEach((order) => {
      if (order.status === "Delivered") {
        totalAmount += order.totalPrice;
      }
    });
    const serviceCharge = totalAmount * 0.1;
    const balance = (totalAmount - serviceCharge).toFixed(2);
    return balance;
  }, [shopOrders]);

  const orderRow = [];
  shopOrders &&
    shopOrders.forEach((item) => {
      orderRow.push({
        id: item._id,
        totalItems: item.cart.reduce((acc, curr) => acc + curr.quantity, 0),
        total: "$ " + item.totalPrice,
        status: item.status,
      });
    });

  const productRow = products?.map((item) => ({
    id: item._id,
    name: item.name,
    price: `US$ ${item.discountPrice}`,
    stock: item.stock,
    sold: item.sold_out,
  }));

  return (
    <Container>
      <Title>Overview</Title>
      <Row style={{ gap: "1rem", alignItems: "stretch" }}>
        <Card style={{ flex: "1" }}>
          <Row>
            <AiOutlineMoneyCollect size={25} />
            <p>
              Account Balance
              <br />
              <span style={{ fontSize: "12px" }}>
                (with 10% Service Charge)
              </span>
            </p>
          </Row>
          <CardText>${totalBalance}</CardText>
          <Link to="/dashboard/withdraw">
            <Row>
              <p> Withdraw Money</p> <FaLocationArrow size={10} />
            </Row>
          </Link>
        </Card>
        <Card style={{ flex: "1" }}>
          <Row>
            <IoReceiptOutline size={25} />
            <p>Total Orders</p>
          </Row>
          <CardText>{shop.totalOrders}</CardText>
          <Link to="/dashboard/all-orders">
            <Row>
              <p>View Orders</p> <FaLocationArrow size={10} />
            </Row>
          </Link>
        </Card>
        <Card style={{ flex: "1" }}>
          <Row>
            <CiShoppingCart size={25} />
            <p>Total Products</p>
          </Row>
          <CardText>{shop.totalProducts}</CardText>
          <Link to="/dashboard/all-products">
            <Row>
              <p>View Products</p> <FaLocationArrow size={10} />
            </Row>
          </Link>
        </Card>
      </Row>
      <Title>Latest Orders</Title>
      <DataGrid
        sx={{
          border: "1px solid black",
          color: "#e0e0e0",
          backgroundColor: "#1e1e1e",
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#2a2a2a",
            color: "#fff",
            fontWeight: "bold",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#2a2a2a",
            color: "#fff",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          },
          "& .MuiTablePagination-root": {
            color: "#e0e0e0",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "rgba(255,255,255,0.08)",
          },
        }}
        rows={orderRow}
        columns={orderColumns}
        pageSize={10}
        disableSelectionOnClick
      />
      <Title>Recently Added Products</Title>
      <DataGrid
        sx={{
          border: "1px solid black",
          color: "#e0e0e0",
          backgroundColor: "#1e1e1e",
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#2a2a2a",
            color: "#fff",
            fontWeight: "bold",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#2a2a2a",
            color: "#fff",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          },
          "& .MuiTablePagination-root": {
            color: "#e0e0e0",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "rgba(255,255,255,0.08)",
          },
        }}
        rows={productRow}
        columns={productColumns}
        pageSize={10}
        disableSelectionOnClick
      />
    </Container>
  );
};

export default Dashboard;
