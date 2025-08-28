import Lottie from "react-lottie";
import animationData from "../../../assets/animations/loading.json";

const AnimationLoader = ({ size = 120 }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          minHeight: "20vh",
          minWidth: "20vw",
        }}
      >
        <Lottie options={defaultOptions} width={size} height={size} />
        <h1>Loading...</h1>
        <br />
        <br />
      </div>
    </>
  );
};

export default AnimationLoader;
