import { useState } from "react";
import { Button, FormControl, Modal } from "react-bootstrap";
import "./EntityCreationModal.css";

type Props = {
  modalShown: boolean;
  type: "file" | "folder";
  createEntity: (name: string) => void;
  handleClose: () => void;
};

const EntityCreationModal = ({
  modalShown,
  type,
  createEntity,
  handleClose,
}: Props) => {
  const [newEntityName, setNewEntityName] = useState<string | null>(null);
  const createNewEntity = () => {
    if (!!newEntityName) createEntity(newEntityName);
  };
  return (
    <Modal show={modalShown} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="modalTitle">Create a new {type}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span className="textInputLabel">Name of the {type}</span>
        <FormControl
          placeholder={"Enter " + type + " name"}
          aria-label={"Enter " + type + " name"}
          aria-describedby="basic-addon1"
          className="textInput"
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
            newEntityName.includes("/") ||
            (type === "folder" && newEntityName.includes("."))
          }
          variant="secondary"
          onClick={createNewEntity}
        >
          Create {type}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EntityCreationModal;
