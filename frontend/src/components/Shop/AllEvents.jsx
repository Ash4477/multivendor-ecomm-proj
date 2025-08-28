import styled from "styled-components";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import Loader from "../Layout/Loader/Loader";
import { useEffect } from "react";
import { deleteEvent, getAllShopEvents } from "../../redux/actions/events";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

const Container = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AllEvents = () => {
  const { events, loading } = useSelector((state) => state.event);
  const { shop } = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllShopEvents(shop._id));
  }, [dispatch, shop]);

  const handleDelete = (id) => {
    dispatch(deleteEvent(id));
    window.location.reload();
  };

  const columns = [
    {
      field: "id",
      headerName: "Event Id",
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
        const d = params.row.name;
        const productName = d.replace(/\s+/g, "-");
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
            <Link to={`/product/${productName}`}>
              <AiOutlineEye size={20} />
            </Link>
          </div>
        );
      },
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

  const rows = events?.map((item) => ({
    id: item._id,
    name: item.name,
    price: `US$ ${item.discountPrice}`,
    stock: item.stock,
    sold: item.sold_out,
  }));

  if (loading) return <Loader />;

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
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
      />
    </Container>
  );
};

export default AllEvents;
