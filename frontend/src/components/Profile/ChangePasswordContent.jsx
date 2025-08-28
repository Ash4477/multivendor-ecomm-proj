import styled from "styled-components";
import {
  InputDiv,
  Input,
  Label as L,
  H1,
  PassDiv,
} from "../../styled-comps/formComps";
import { FancyButton } from "../../styled-comps/commonComps";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { SERVER_URL } from "../../server";

const Container = styled.div`
  margin-left: 2rem;
`;

const Label = styled(L)`
  color: white;
  margin-bottom: 0.5rem;
`;

const ChangePasswordContent = () => {
  const [visible, setVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConf, setNewPasswordConf] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword != newPasswordConf) {
      toast.error("Passwords dont match");
      return;
    }

    axios
      .put(
        `${SERVER_URL}/users/change-password`,
        {
          oldPassword,
          newPassword,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setOldPassword("");
        setNewPassword("");
        setNewPasswordConf("");
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  return (
    <Container>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <H1 style={{ fontSize: "2rem" }}>Change Password</H1>
        <InputDiv>
          <Label htmlFor="old-p">Enter Old Password</Label>
          <PassDiv>
            <Input
              $pass
              type={visible ? "text" : "password"}
              id="old-p"
              name="old-p"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              autoComplete="old-password"
              required
              minLength={6}
            />
            {visible ? (
              <AiOutlineEye
                size={25}
                onClick={() => setVisible(false)}
                style={{
                  cursor: "pointer",
                  color: "black",
                }}
              />
            ) : (
              <AiOutlineEyeInvisible
                size={25}
                onClick={() => setVisible(true)}
                style={{
                  cursor: "pointer",
                  color: "black",
                }}
              />
            )}
          </PassDiv>
        </InputDiv>
        <InputDiv>
          <Label htmlFor="new-p">Enter New Password</Label>
          <Input
            id="new-p"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            minLength={6}
            autoComplete="new-password"
            required
          />
        </InputDiv>
        <InputDiv>
          <Label htmlFor="new-p-conf">Re-Enter New Password</Label>
          <Input
            id="new-p-conf"
            type="password"
            value={newPasswordConf}
            onChange={(e) => setNewPasswordConf(e.target.value)}
            minLength={6}
            autoComplete="new-password-confirm"
            required
          />
        </InputDiv>
        <FancyButton
          type="submit"
          $pad="1rem 5rem"
          style={{ width: "max-content" }}
        >
          Submit
        </FancyButton>
      </form>
    </Container>
  );
};

export default ChangePasswordContent;
