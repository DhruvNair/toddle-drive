import Button from "react-bootstrap/Button";
import "./FolderHeader.css";

type Props = {
  folderName?: string;
  folderCount?: number;
  fileCount?: number;
  onNewFolderClicked?: () => void;
  onNewFileClicked?: () => void;
};
const FolderHeader = ({
  folderName = "New hire onboarding",
  folderCount = 1,
  fileCount = 1,
  onNewFolderClicked = () => {},
  onNewFileClicked = () => {},
}: Props) => {
  return (
    <div className="container folderHeaderContainer">
      <div className="d-flex justify-content-between align-items-center">
        <span className="folderName">{folderName}</span>
        <div>
          <Button
            onClick={onNewFolderClicked}
            className="m-2"
            variant="outline-dark"
          >
            New Folder
          </Button>
          <Button
            onClick={onNewFileClicked}
            className="m-2"
            variant="secondary"
          >
            New File
          </Button>
        </div>
      </div>
      <span className="folderDetails">
        {(folderCount > 0 || fileCount === 0) &&
          folderCount + " folder" + (folderCount !== 1 ? "s" : "")}
        {((folderCount > 0 && fileCount > 0) || folderCount === fileCount) &&
          ", "}
        {(fileCount > 0 || folderCount === 0) &&
          fileCount + " file" + (fileCount !== 1 ? "s" : "")}
      </span>
    </div>
  );
};

export default FolderHeader;
