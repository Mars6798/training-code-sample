import { useState } from "react";
import { Modal, TextField } from "@shopify/polaris";
const CreateModal = ({onOpen, onAdd, onClose, isLoading, errorMessage}) => {
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
                loading: isLoading,
            }}
            secondaryActions={[
                {
                    content: "Cancel",
                    onAction: handleClose,
                    disabled: isLoading,
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
                {errorMessage && (
                    <p style={{ color: 'red' }}>{errorMessage}</p>
                )}
            </Modal.Section>
        </Modal>
    )
}

export default CreateModal;