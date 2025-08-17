import styled from "styled-components";

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: ${({ $imgFill }) => ($imgFill ? "fill" : "contain")};
  display: block;

  border-radius: ${({ $rounded }) => ($rounded ? "15px" : undefined)};
`;

const ImageDiv = styled.div`
  width: ${({ $width }) => $width || "auto"};
  height: ${({ $height }) => $height || "auto"};
  overflow: hidden;
  border-radius: ${({ $rounded }) => ($rounded ? "50%" : undefined)};
`;

const FancyButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  color: white;
  font-family: Raleway, sans-serif;
  font-size: 1rem;
  padding: ${({ $pad }) => $pad || undefined};
  border: none;
  border-radius: ${({ $bRad }) => $bRad || "15px"};
`;

export { Image, ImageDiv, FancyButton };
