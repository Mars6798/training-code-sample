import { useState, useCallback } from "react";
import { Modal, TextField } from "@shopify/polaris";
const CreateModal = ({onOpen, onAdd, onClose}) => {
    const [newTitle, setNewTitle] = useState("");

    const handleChangeTitle = (newValue) => setNewTitle(newValue);

    const handleAdd = () => {
        onAdd(newTitle);
        setNewTitle("");
    };

    const handleClose = () => {
        setNewTitle("");
        onClose();
    };

    return (
        <Modal
            open={onOpen}
            onClose={handleClose}
            title="Create Todo"
            primaryAction={{
                content: "Add",
                onAction: handleAdd,
            }}
            secondaryActions={[
                {
                    content: "Cancel",
                    onAction: handleClose,
                },
            ]}
        >
            <Modal.Section>
                <TextField
                    label="Title"
                    value={newTitle}
                    onChange={handleChangeTitle}
                    autoComplete="off"
                />
            </Modal.Section>
        </Modal>
    )
}

export default CreateModal;