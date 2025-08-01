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

export { Image, ImageDiv };
