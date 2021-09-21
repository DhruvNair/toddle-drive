import { useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";
import { useHistory } from "react-router";
import MenuIcon from "../assets/DotsVerticalO.svg";
import PDFIcon from "../assets/File-pdf.svg";
import PPTIcon from "../assets/File-ppt.svg";
import TextIcon from "../assets/File-text.svg";
import FolderIcon from "../assets/Folder.svg";
import Entity, { extensionType } from "../models/Entity";
import "./Card.css";
import CardOptions from "./CardOptions";

const mapEntityToStyle = (type: extensionType) => {
  switch (type) {
    case extensionType.text:
    case extensionType.doc:
      return {
        backgroundColor: "#F5F5FF",
        icon: <img alt="text-file" src={TextIcon} />,
      };
    case extensionType.ppt:
      return {
        backgroundColor: "#FFF9EB",
        icon: <img alt="ppt-file" src={PPTIcon} />,
      };
    case extensionType.pdf:
      return {
        backgroundColor: "#FFF5F7",
        icon: <img alt="pdf-file" src={PDFIcon} />,
      };
    case extensionType.folder:
      return {
        backgroundColor: "white",
        icon: <img alt="folder" src={FolderIcon} />,
      };
    case extensionType.unknown:
      return {
        backgroundColor: "#EDEBFF",
        icon: <span className="unknownFileLogo">?</span>,
      };
    default:
      return {
        backgroundColor: "#EDEBFF",
        icon: <span className="unknownFileLogo">?</span>,
      };
  }
};

const getDisplayName = (name: string) => {
  const splitName = name.split(".");
  return splitName.splice(0, splitName.length - 1).join(".");
};

type Props = {
  entity: Entity;
  optionsShown?: boolean;
  showOptions: () => void;
  parentScroll: number;
  options: {
    icon: JSX.Element;
    text: string;
    onClick: () => void;
  }[];
};

const EntityCard = ({
  entity,
  optionsShown,
  showOptions,
  options,
  parentScroll,
}: Props) => {
  const { backgroundColor, icon } = mapEntityToStyle(entity.fileType);
  const displayName =
    entity.type === "file" && entity.fileType !== extensionType.unknown
      ? getDisplayName(entity.name)
      : entity.name;
  const [optionsPosition, setOptionsPosition] = useState<"top" | "bottom">(
    "bottom"
  );
  const optionsRef = useRef<HTMLDivElement | null>(null);
  const history = useHistory();
  useEffect(() => {
    setOptionsPosition(
      (optionsRef.current?.getBoundingClientRect().bottom || 1) <
        window.innerHeight - 220
        ? "bottom"
        : "top"
    );
  }, [parentScroll]);
  return (
    <Card
      onClick={() => {
        if (entity.type === "folder")
          history.push(entity.path + "/" + entity.name);
      }}
      className="cardContainer touchable"
    >
      <Card.Header className="cardHeaderImage" style={{ backgroundColor }}>
        {icon}
      </Card.Header>
      <Card.Body className="cardBottom">
        <div className="cardTitleContainer">
          {entity.type === "file" && (
            <>
              <span className="fileExtension">{entity.fileType}</span>
              <br />
            </>
          )}
          <span className="cardTitle">{displayName}</span>
        </div>
        <div
          className="optionsContainer touchable"
          onClick={(e) => {
            e.stopPropagation();
            showOptions();
          }}
        >
          <div
            className="optionsIconContainer"
            ref={(el) => {
              optionsRef.current = el;
            }}
            style={{ backgroundColor: optionsShown ? "#EBEBEB" : "#fff" }}
          >
            <img src={MenuIcon} alt="options" className="optionsIcon" />
          </div>
          {optionsShown && (
            <CardOptions position={optionsPosition} options={options} />
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default EntityCard;
