import UpperPart from "./UpperPart";
import LowerPart from "./LowerPart";

const Header = ({ activeHeading }) => {
  return (
    <div>
      <UpperPart />
      <LowerPart activeHeading={activeHeading} />
    </div>
  );
};

export default Header;
