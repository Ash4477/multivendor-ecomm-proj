import styled from "styled-components";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineHeart } from "react-icons/ai";
import WishlistItem from "./WishlistItem";
import LeftSidebar from "../LeftSidebar";

const wishlistData = [
  {
    id: 1,
    name: "Iphone 14 pro max 256gb ssd and 8gb ram silver color",
    description: "test",
    imageUrl: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
    price: 999,
  },
  {
    id: 2,
    name: "Iphone 14 pro max 256gb ssd and 8gb ram silver color",
    description: "test",
    imageUrl: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
    price: 245,
  },
  {
    id: 3,
    name: "Iphone 14 pro max 256gb ssd and 8gb ram silver color",
    description: "test",
    imageUrl: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
    price: 645,
  },
];

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
  const [wishlist, setWishlist] = useState(wishlistData);

  const deleteWishlistItem = (id) => {
    setWishlist(wishlist.filter((data) => data.id != id));
  };

  return (
    <LeftSidebar>
      <CloseButton onClick={() => setIsWishlistOpen(false)}>
        <RxCross1 size={25} />
      </CloseButton>
      <FlexDiv>
        <AiOutlineHeart size={25} /> <h4>{wishlist.length} Items</h4>
      </FlexDiv>
      {wishlist && wishlist.length > 0 ? (
        <List>
          {wishlist.map((data) => (
            <WishlistItem
              key={data.id}
              data={data}
              handleDeleteItem={deleteWishlistItem}
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
