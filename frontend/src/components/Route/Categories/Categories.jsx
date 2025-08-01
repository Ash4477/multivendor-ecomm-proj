import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Image, ImageDiv } from "../../../styled-comps/commonComps";
import { brandingData, categoriesData } from "../../../static/data";

const Container = styled.div`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const ServicesBox = styled.div`
  background-color: var(--color-5);
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 4.5rem;
`;

const ServiceDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const ServiceTitle = styled.h3`
  font-size: 1rem;
`;

const CatBox = styled.div`
  background-color: var(--color-5);
  border-radius: 10px;
  padding: 1rem;

  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-auto-flow: column;
  overflow-x: auto;
  gap: 1rem;
`;

const CatItem = styled.div`
  padding: 0.5rem;
  font-size: 0.8rem;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const CatTitle = styled.h3`
  font-weight: normal;
`;

const Categories = () => {
  const navigate = useNavigate();

  const handleSubmit = (category) => {
    navigate(`/products?category=${category}`);
  };

  return (
    <Container>
      <ServicesBox>
        {brandingData.map((data) => (
          <ServiceDiv key={data.id}>
            {data.icon}
            <div>
              <ServiceTitle>{data.title}</ServiceTitle>
              <p>{data.Description}</p>
            </div>
          </ServiceDiv>
        ))}
      </ServicesBox>
      <CatBox id="categories">
        {categoriesData.map((data) => (
          <CatItem key={data.id} onClick={() => handleSubmit(data.title)}>
            <CatTitle>{data.title}</CatTitle>
            <ImageDiv $width="100px" $height="100px">
              <Image src={data.image_Url} alt={data.title} />
            </ImageDiv>
          </CatItem>
        ))}
      </CatBox>
    </Container>
  );
};

export default Categories;
