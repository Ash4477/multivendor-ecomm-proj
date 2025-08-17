import styled from "styled-components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoriesData } from "../../static/data";
import { createEvent } from "../../redux/actions/events";
import {
  H1,
  InputDiv,
  Input,
  Select,
  TextArea,
  Label as L,
} from "../../styled-comps/formComps";
import { ImageDiv, Image, FancyButton } from "../../styled-comps/commonComps";

const Container = styled.div`
  padding: 1rem;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const Label = styled(L)`
  color: white;
`;

const ImagesDiv = styled.div`
  margin-top: 0.5rem;
  border: 1px solid grey;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem;
  gap: 0.5rem;
`;

const CreateEvent = () => {
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Computers and Laptops");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { shop } = useSelector((state) => state.shop);
  const { success, error } = useSelector((state) => state.event);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const endDateRef = useRef();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Event Product Created Successfully!");
      navigate("/dashboard");
      window.location.reload();
    }
  }, [dispatch, navigate, error, success]);

  const handleStartDateChange = (e) => {
    const startDate = new Date(e.target.value);
    const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
    setStartDate(startDate);
    setEndDate(null);
    endDateRef.current.min = minEndDate.toISOString.slice(0, 10);
  };

  const handleEndDateChange = (e) => {
    const endDate = new Date(e.target.value);
    setEndDate(endDate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();
    images.forEach((img) => newForm.append("images", img));
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", shop._id);
    newForm.append("startDate", startDate.toISOString());
    newForm.append("endDate", endDate.toISOString());

    dispatch(createEvent(newForm));
  };

  const handleImageChange = (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const today = new Date().toISOString().slice(0, 10);
  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : today;

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <H1 style={{ gridColumn: "1/-1" }}>New Event</H1>
        <InputDiv>
          <Label htmlFor="name">Name:</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your event product name"
          />
        </InputDiv>
        <InputDiv>
          <Label htmlFor="categ">Category:</Label>
          <Select
            id="categ"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categoriesData &&
              categoriesData.map((cat) => (
                <option value={cat.title} key={cat.title}>
                  {cat.title}
                </option>
              ))}
          </Select>
        </InputDiv>
        <InputDiv style={{ gridColumn: "1/-1" }}>
          <Label htmlFor="desc">Description:</Label>
          <TextArea
            rows={7}
            id="desc"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your event product description"
            required
          />
        </InputDiv>

        <InputDiv>
          <Label htmlFor="tags">Tags:</Label>
          <Input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter your event product tags"
          />
        </InputDiv>
        <InputDiv>
          <Label htmlFor="og-price">Original Price:</Label>
          <Input
            id="og-price"
            type="number"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter your event product price"
            min={1}
          />
        </InputDiv>
        <InputDiv>
          <Label htmlFor="dis-price">Price (With Discount):</Label>
          <Input
            id="dis-price"
            type="number"
            value={discountPrice}
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Enter your discounted event product price"
            min={1}
          />
        </InputDiv>
        <InputDiv>
          <Label htmlFor="st">Product Stock:</Label>
          <Input
            id="st"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter your product stock value"
            min={1}
          />
        </InputDiv>
        <InputDiv>
          <Label htmlFor="start-date">Start Date:</Label>
          <Input
            id="start-date"
            type="date"
            value={startDate ? startDate.toISOString().slice(0, 10) : ""}
            onChange={handleStartDateChange}
            placeholder="Enter event start date"
            min={today}
          />
        </InputDiv>
        <InputDiv>
          <Label htmlFor="end-date">Product Stock:</Label>
          <Input
            ref={endDateRef}
            id="end-date"
            type="date"
            value={endDate ? endDate.toISOString().slice(0, 10) : ""}
            onChange={handleEndDateChange}
            placeholder="Enter event end date"
            min={minEndDate}
          />
        </InputDiv>
        <InputDiv style={{ gridColumn: "1/-1" }}>
          <Label htmlFor="img-up">Upload Images</Label>
          <Input
            id="img-up"
            type="file"
            multiple
            onChange={handleImageChange}
          />
          {images && images.length > 0 && (
            <ImagesDiv>
              {images.map((img, idx) => (
                <ImageDiv $width="120px" $height="120px" key={idx}>
                  <Image
                    $imgFill
                    src={URL.createObjectURL(img)}
                    key={img}
                    alt="product"
                  />
                </ImageDiv>
              ))}
            </ImagesDiv>
          )}
        </InputDiv>
        <FancyButton $pad="1rem" $bRad="5px" style={{ gridColumn: "1/-1" }}>
          Create Event
        </FancyButton>
      </Form>
    </Container>
  );
};

export default CreateEvent;
