import { Button, Modal } from "react-bootstrap";
import Entity from "../models/Entity";
import "./EntityDeleteModal.css";

type Props = {
  modalShown: boolean;
  entity?: Entity;
  deleteEntity: (entity: Entity) => void;
  handleClose: () => void;
};

const EntityDeleteModal = ({
  modalShown,
  entity,
  deleteEntity,
  handleClose,
}: Props) => {
  return (
    <Modal show={modalShown} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="modalTitle">
          Delete {entity?.name} {entity?.type}?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span className="textInputLabel">
          Are you sure you want to delete this {entity?.type}? This is a
          permanent action and can’t be undone.
        </span>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={() => {
            if (entity) deleteEntity(entity);
          }}
        >
          Delete {entity?.type}
        </Button>
        <Button variant="outline-dark" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EntityDeleteModal;
