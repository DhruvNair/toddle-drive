import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { initialEntities } from "../data";
import { seperateNameFromExtension } from "../helpers";
import Entity, {
  extensionType,
  getExtensionFromFileName,
} from "../models/Entity";
import EntityCreationModal from "./EntityCreationModal";
import FolderContents from "./FolderContents";
import FolderHeader from "./FolderHeader";
import NotFound from "./NotFound";
import Search from "./Search";

const AppContent = () => {
  const [creationEntityType, setCreationEntityType] = useState<
    "file" | "folder"
  >("file");
  const [creationDialogShown, setCreationDialogShown] = useState(false);
  const showCreateDialog = (type: "file" | "folder") => {
    setCreationEntityType(type);
    setCreationDialogShown(true);
  };
  const location = useLocation();
  const [isValidLocation, setIsValidLocation] = useState(true);
  const [allEntities, setAllEntities] = useState(initialEntities);
  const [searchText, setSearchText] = useState("");
  const [displayedEntities, setDisplayedEntities] = useState<Entity[]>([]);
  useEffect(() => {
    setIsValidLocation(
      allEntities.some(
        (entity) =>
          entity.type === "folder" &&
          location.pathname === entity.path + "/" + entity.name
      )
    );
    setDisplayedEntities(
      allEntities.filter(
        (entity) =>
          entity.path === location.pathname &&
          entity.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [location, allEntities, searchText]);
  useEffect(() => {
    setCreationDialogShown(false);
  }, [allEntities]);
  const path = location.pathname.split("/").filter((item) => item);
  const folders = displayedEntities.filter(
    (entity) => entity.type === "folder"
  );
  const files = displayedEntities.filter((entity) => entity.type === "file");
  const createEntity = (
    name: string,
    type: "file" | "folder",
    counter?: number
  ): string => {
    const [nameWithoutExtension, extension] =
      type === "file" ? seperateNameFromExtension(name) : [name, ""];
    const newName = nameWithoutExtension + (!!counter ? "-" + counter : "");
    if (
      displayedEntities.some(
        (entity) => entity.name === newName + extension && entity.type === type
      )
    ) {
      return createEntity(name, type, (counter || 0) + 1);
    } else {
      setAllEntities([
        new Entity(newName + extension, type, location.pathname),
        ...allEntities,
      ]);
      return newName;
    }
  };
  const renameEntity = (name: string, entity: Entity, counter?: number) => {
    const [nameWithoutExtension, extension] =
      entity.type === "file" ? seperateNameFromExtension(name) : [name, ""];
    const newName = nameWithoutExtension + (!!counter ? "-" + counter : "");
    if (
      displayedEntities.some(
        (eachEntity) =>
          eachEntity.name === newName + extension &&
          eachEntity.type === entity.type
      )
    ) {
      renameEntity(name, entity, (counter || 0) + 1);
    } else {
      setAllEntities((entities) =>
        entities.map((eachEntity) =>
          entity === eachEntity
            ? {
                ...eachEntity,
                fileType:
                  entity.type === "file"
                    ? getExtensionFromFileName(newName)
                    : extensionType.folder,
                name: newName,
              }
            : eachEntity
        )
      );
    }
    setAllEntities((entities) =>
      entities.map((eachEntity) =>
        eachEntity.path.startsWith(entity.path + "/" + entity.name)
          ? {
              ...eachEntity,
              path: eachEntity.path.replace(
                entity.path + "/" + entity.name,
                entity.path + "/" + newName
              ),
            }
          : eachEntity
      )
    );
  };
  const deleteEntity = (entity: Entity) => {
    setAllEntities((entities) =>
      entities.filter(
        (eachEntity) =>
          eachEntity !== entity &&
          !eachEntity.path.startsWith(entity.path + "/" + entity.name)
      )
    );
  };
  const duplicateEntity = (entity: Entity) => {
    const newName = createEntity("Duplicate of " + entity.name, entity.type);
    setAllEntities((entities) => {
      const newEntities = entities
        .filter((eachEntity) =>
          eachEntity.path.startsWith(entity.path + "/" + entity.name)
        )
        .map((eachEntity) => ({
          ...eachEntity,
          path: eachEntity.path.replace(
            entity.path + "/" + entity.name,
            entity.path + "/" + newName
          ),
        }));
      return [...newEntities, ...entities];
    });
  };
  return isValidLocation ? (
    <div className="content">
      <FolderHeader
        folderName={path[path.length - 1]}
        folderCount={folders.length}
        fileCount={files.length}
        onNewFileClicked={() => showCreateDialog("file")}
        onNewFolderClicked={() => showCreateDialog("folder")}
      />
      <Search searchText={searchText} setSearchText={setSearchText} />
      <FolderContents
        folders={folders}
        files={files}
        renameEntity={renameEntity}
        duplicateEntity={duplicateEntity}
        deleteEntity={deleteEntity}
      />
      <EntityCreationModal
        modalShown={creationDialogShown}
        type={creationEntityType}
        createEntity={(name: string) => {
          createEntity(name, creationEntityType);
        }}
        handleClose={() => setCreationDialogShown(false)}
      />
    </div>
  ) : (
    <NotFound />
  );
};
export default AppContent;
