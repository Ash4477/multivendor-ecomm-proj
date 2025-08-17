import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineHeart } from "react-icons/ai";
import WishlistItem from "./WishlistItem";
import LeftSidebar from "../LeftSidebar";
import { removeFromWishlist } from "../../../../redux/actions/wishlist";

const CloseButton = styled.button`
  align-self: flex-end;
  background: transparent;
  border: none;
  color: white;
`;

const List = styled.ul`
  padding: 0;
  margin: 1rem 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
`;

const FlexDiv = styled.div`
  display: flex;
  align-items: end;
  gap: 0.5rem;
`;

const Wishlist = ({ setIsWishlistOpen }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const deleteWishlistItem = (id) => {
    dispatch(removeFromWishlist(id));
  };

  return (
    <LeftSidebar>
      <CloseButton onClick={() => setIsWishlistOpen(false)}>
        <RxCross1 size={25} />
      </CloseButton>
      <FlexDiv>
        <AiOutlineHeart size={25} />{" "}
        <h4>{wishlist && wishlist.length} Items</h4>
      </FlexDiv>
      {wishlist && wishlist.length > 0 ? (
        <List>
          {wishlist.map((data) => (
            <WishlistItem
              key={data._id}
              data={data}
              handleDeleteItem={() => deleteWishlistItem(data._id)}
            />
          ))}
        </List>
      ) : (
        <h3 style={{ textAlign: "center" }}>
          🥺 <br /> No items added to wishlist yet!
        </h3>
      )}
    </LeftSidebar>
  );
};

export default Wishlist;
