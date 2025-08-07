import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import styled from "styled-components";

const Container = styled.div`
  display: "flex";
  flex-direction: "column";
  margin-left: 1rem;
`;

const orders = [
  {
    _id: "4714134jjbjfbjaasjd123123",
    orderItems: [{ name: "Iphone 14 pro max" }],
    totalPrice: 120,
    orderStatus: "Processing",
  },
];

const columns = [
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
    field: "itemsQty",
    headerName: "Items Qty",
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
          <Link to={`/user/order/${params.id}`}>
            <Button>
              <AiOutlineArrowRight size={20} />
            </Button>
          </Link>
        </>
      );
    },
  },
];

const row = [];

orders &&
  orders.forEach((item) => {
    row.push({
      id: item._id,
      itemsQty: item.orderItems.length,
      total: "US$ " + item.totalPrice,
      status: item.orderStatus,
    });
  });

const OrdersContent = () => {
  return (
    <Container>
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
      />
    </Container>
  );
};

export default OrdersContent;
