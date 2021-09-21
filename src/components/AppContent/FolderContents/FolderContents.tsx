import { useEffect, useState } from "react";
import Entity from "../../../models/Entity";
import Card from "./Card/Card";
import RenameIcon from "../../../assets/Rename.svg";
import DuplicateIcon from "../../../assets/Duplicate.svg";
import DeleteIcon from "../../../assets/Delete.svg";
import "./FolderContents.css";
import EntityRenameModal from "./EntityRenameModal/EntityRenameModal";
import EntityDeleteModal from "./EntityDeleteModal/EntityDeleteModal";

type Props = {
  folders: Entity[];
  files: Entity[];
  renameEntity: (name: string, entity: Entity) => void;
  duplicateEntity: (entity: Entity) => void;
  deleteEntity: (entity: Entity) => void;
};

const FolderContents = ({
  folders,
  files,
  renameEntity,
  duplicateEntity,
  deleteEntity,
}: Props) => {
  const [selectedEntityOptions, setSelectedEntityOptions] = useState<
    string | null
  >(null);
  const [scroll, setScroll] = useState(0);
  const handleScroll = () => {
    setScroll(window.scrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    setDeleteModalShown(false);
    setRenameModalShown(false);
    setSelectedEntityOptions(null);
  }, [folders, files]);
  const [renameModalShown, setRenameModalShown] = useState(false);
  const [entityToRename, setEntityToRename] = useState<Entity | undefined>();
  const [deleteModalShown, setDeleteModalShown] = useState(false);
  const [entityToDelete, setEntityToDelete] = useState<Entity | undefined>();
  const onRenameClicked = (entity: Entity) => {
    setEntityToRename(entity);
    setRenameModalShown(true);
  };
  const onDuplicateClicked = (entity: Entity) => {
    setSelectedEntityOptions(null);
    duplicateEntity(entity);
  };
  const onDeleteClicked = (entity: Entity) => {
    setEntityToDelete(entity);
    setDeleteModalShown(true);
  };
  const generateOptions = (entity: Entity) => {
    return [
      {
        icon: <img alt="rename" src={RenameIcon} className="optionIcon" />,
        text: "Rename " + entity.type,
        onClick: () => onRenameClicked(entity),
      },
      {
        icon: (
          <img alt="duplicate" src={DuplicateIcon} className="optionIcon" />
        ),
        text: "Duplicate " + entity.type,
        onClick: () => onDuplicateClicked(entity),
      },
      {
        icon: <img alt="delete" src={DeleteIcon} className="optionIcon" />,
        text: "Delete " + entity.type,
        onClick: () => onDeleteClicked(entity),
      },
    ];
  };
  return (
    <>
      <div
        className="container mt-5"
        onClick={() => setSelectedEntityOptions(null)}
      >
        {folders.length > 0 && (
          <div>
            <span className="subHeading">
              {folders.length} folder{folders.length > 1 && "s"}
            </span>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {folders.map((folder) => {
                return (
                  <Card
                    key={folder.path + "/" + folder.name}
                    entity={folder}
                    optionsShown={selectedEntityOptions === folder.name}
                    showOptions={() => setSelectedEntityOptions(folder.name)}
                    options={generateOptions(folder)}
                    parentScroll={scroll}
                  />
                );
              })}
            </div>
          </div>
        )}
        <br />
        {files.length > 0 && (
          <div>
            <span className="subHeading">
              {files.length} file{files.length > 1 && "s"}
            </span>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {files.map((file) => {
                return (
                  <Card
                    key={file.path + "/" + file.name}
                    entity={file}
                    optionsShown={selectedEntityOptions === file.name}
                    showOptions={() => setSelectedEntityOptions(file.name)}
                    options={generateOptions(file)}
                    parentScroll={scroll}
                  />
                );
              })}
            </div>
          </div>
        )}
        {folders.length === 0 && files.length === 0 && (
          <div className="emptyFolderMessage">Nothing to show here</div>
        )}
      </div>
      <EntityRenameModal
        modalShown={renameModalShown}
        entity={entityToRename}
        renameEntity={(name: string, entity: Entity) => {
          setSelectedEntityOptions(null);
          setRenameModalShown(false);
          renameEntity(name, entity);
          setEntityToRename(undefined);
        }}
        handleClose={() => {
          setRenameModalShown(false);
          setTimeout(() => setEntityToRename(undefined), 300);
          setSelectedEntityOptions(null);
        }}
      />
      <EntityDeleteModal
        modalShown={deleteModalShown}
        entity={entityToDelete}
        deleteEntity={(entity: Entity) => {
          setSelectedEntityOptions(null);
          setDeleteModalShown(false);
          deleteEntity(entity);
          setEntityToDelete(undefined);
        }}
        handleClose={() => {
          setDeleteModalShown(false);
          setTimeout(() => setEntityToDelete(undefined), 300);
          setSelectedEntityOptions(null);
        }}
      />
    </>
  );
};

export default FolderContents;
