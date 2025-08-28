import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { getUserOrders } from "../../redux/actions/order";

const Container = styled.div`
  display: "flex";
  flex-direction: "column";
  margin-left: 1rem;
`;

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

const RefundsContent = () => {
  const { user } = useSelector((state) => state.user);
  const { userOrders: orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders(user._id));
  }, [dispatch, user]);

  const row = [];

  orders &&
    orders.forEach((item) => {
      if (item.status === "Processing Refund") {
        row.push({
          id: item._id,
          totalItems: item.cart.reduce((acc, curr) => acc + curr.quantity, 0),
          total: "$ " + item.totalPrice,
          status: item.status,
        });
      }
    });

  return (
    <Container>
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
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
      />
    </Container>
  );
};

export default RefundsContent;
