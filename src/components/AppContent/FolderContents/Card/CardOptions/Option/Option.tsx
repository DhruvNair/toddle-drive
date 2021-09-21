import "./Option.css";

type Props = {
  icon: JSX.Element;
  text: string;
  onClick: () => void;
};

const Option = ({ icon, text, onClick }: Props) => {
  return (
    <div onClick={onClick} className="optionContainer touchable">
      {icon}
      <span className="optionText">{text}</span>
    </div>
  );
};

export default Option;
