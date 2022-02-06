import React, { FC, useRef } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useBudgets } from "../contexts/BudgetContext";

interface AddBudgetModalProps {
  show: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddBudgetModal: FC<AddBudgetModalProps> = ({ show, handleClose }) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);

  const { addBudget } = useBudgets();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBudget({
      name: nameRef.current?.value,
      max: parseFloat(maxRef.current?.value!),
    });
    handleClose(false);
  };

  const handleCloseModal = () => handleClose(false);

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Maximum Spending <span style={{ opacity: '0.4'}}>USD</span> </Form.Label>
            <Form.Control
              ref={maxRef}
              type="number"
              required
              min={0}
              step={0.01}
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default AddBudgetModal;
