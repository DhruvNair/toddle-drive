import { useEffect, useState } from "react";
import { Button, FormControl, Modal } from "react-bootstrap";
import Entity from "../models/Entity";
import "./EntityRenameModal.css";

type Props = {
  modalShown: boolean;
  entity?: Entity;
  renameEntity: (name: string, entity: Entity) => void;
  handleClose: () => void;
};

const EntityRenameModal = ({
  modalShown,
  entity,
  renameEntity,
  handleClose,
}: Props) => {
  const [newEntityName, setNewEntityName] = useState<string | undefined>(
    entity?.name
  );
  useEffect(() => {
    setNewEntityName(entity?.name);
  }, [entity]);
  return (
    <Modal show={modalShown} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="modalTitle">Rename {entity?.type}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span className="textInputLabel">Name of the {entity?.type}</span>
        <FormControl
          placeholder={"Enter " + entity?.type + " name"}
          aria-label={"Enter " + entity?.type + " name"}
          aria-describedby="basic-addon1"
          className="textInput"
          value={newEntityName || ""}
          onChange={(event) => setNewEntityName(event.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          disabled={
            !newEntityName ||
            newEntityName === entity?.name ||
            newEntityName.includes("/") ||
            (entity?.type === "folder" && newEntityName.includes("."))
          }
          variant="secondary"
          onClick={() => {
            if (!!newEntityName && entity) renameEntity(newEntityName, entity);
          }}
        >
          Rename {entity?.type}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EntityRenameModal;
