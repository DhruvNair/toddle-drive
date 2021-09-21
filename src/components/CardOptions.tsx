import { Dropdown } from "react-bootstrap";
import Option from "./Option";
import "./CardOptions.css";

type Props = {
  position: "bottom" | "top";
  options: {
    icon: JSX.Element;
    text: string;
    onClick: () => void;
  }[];
};

const CardOptions = ({ position, options }: Props) => {
  return (
    <div
      className="cardOptionsContainer"
      style={{
        top: position === "bottom" ? "calc(50% + 20px)" : undefined,
        bottom: position === "bottom" ? undefined : "calc(50% + 20px)",
      }}
    >
      {options.map((option, index) => (
        <div key={index}>
          <Option {...option} />
          {index < options.length - 1 && (
            <Dropdown.Divider style={{ backgroundColor: "#F9F9FB" }} />
          )}
        </div>
      ))}
    </div>
  );
};

export default CardOptions;
