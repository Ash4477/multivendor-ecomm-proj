import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Image, ImageDiv } from "../../../styled-comps/commonComps";

const Container = styled.div`
  position: absolute;
  top: 9rem;
  left: 3rem;
  padding: 1rem;
  max-width: 270px;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 0 0 10px 10px;
  background-color: white;
  color: black;
`;
const H3 = styled.h3`
  font-weight: normal;
  font-size: 1rem;
`;

const DropDownItem = styled.div`
  display: flex;
  align-items: center;
  justify-items: start;
  gap: 0.5rem;
  cursor: pointer;
`;

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    navigate(`/products?category=${data.title}`);
    setDropDown(false);
    window.location.reload();
  };

  return (
    <Container>
      {categoriesData &&
        categoriesData.map((data, idx) => (
          <DropDownItem key={idx} onClick={() => handleSubmit(data)}>
            <ImageDiv
              $width="25px"
              $height="25px"
              style={{ userSelect: "none" }}
            >
              <Image src={data.image_Url} alt="category" />
            </ImageDiv>
            <H3>{data.title}</H3>
          </DropDownItem>
        ))}
    </Container>
  );
};

export default DropDown;
