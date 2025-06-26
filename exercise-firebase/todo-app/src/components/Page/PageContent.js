import {useState } from 'react';
import { Page, LegacyCard, ResourceList, Button, Box , InlineError, Spinner} from '@shopify/polaris';
import CreateModal from '../Page/CreateModal';
import RowItem from '../Page/RowItem';
import useTodos from '../../hooks/useTodos';

function PageContent() {
    const [modalActive, setModalActive] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');
    const {
        todos,
        addTodo,
        updateTodo,
        handleDeleteTodo,
        handleBulkAction,
        handleBulkDeleteTodos
    } = useTodos();

    const handleAddTodo = async (title) => {
        if (title.trim() === "") return;
        try {
            setIsLoading(true);
            setErrorMessage('');
            await addTodo(title);
            setModalActive(false);
        } catch (error) {
            setErrorMessage('Failed to create todo.')
        } finally {
            setIsLoading(false)
        }
    };

    const handleModalChange = () => {
        setModalActive((active) => !active);
    };

    const handleSelectionChange = (selected) => {
        setSelectedItems(selected)
    };

    const handleCompleteTodo = (id) => {
        updateTodo(id);
    };

    const handleBulkActionTodos = async (selected, type) => {
        try {
            setIsLoading(true);
            setErrorMessage('');
            await handleBulkAction(selected, type);
            setSelectedItems([]);
        } catch (error) {
            setErrorMessage('Failed to update todo status.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBulkDelete = async (selected) => {
        try {
            setIsLoading(true);
            setErrorMessage('');
            await handleBulkDeleteTodos(selected);
            setSelectedItems([]);
        } catch (error) {
            setErrorMessage('Failed to create todo.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Page
            title="Todoes"
            primaryAction={{
               content: 'Create',
               onAction: handleModalChange,
            }}>
            <LegacyCard>
                <ResourceList
                    resourceName={{singular: 'todo', plural: 'todos'}}
                    items={todos}
                    selectedItems={selectedItems}
                    onSelectionChange={handleSelectionChange}
                    selectable
                    renderItem={(todo) => {
                        const {id, title, completed} = todo;
                        return (
                            <RowItem
                                id={id}
                                title={title}
                                isCompleted={completed}
                                onComplete={() => handleCompleteTodo(id)}
                                onDelete={() => handleDeleteTodo(id)}
                            />
                        );
                    }}
                />
            </LegacyCard>

            {isLoading && (
                <Box padding="2">
                    <Spinner accessibilityLabel="Đang xử lý..." size="small" />
                </Box>
            )}

            {errorMessage && (
                <Box padding="2">
                    <InlineError message={errorMessage} fieldID="bulk-actions-error" />
                </Box>
            )}

            {selectedItems.length > 0 && (
                <Box>
                    <div className="bulk-actions">
                        <Button onClick={() => handleBulkActionTodos(selectedItems, 'complete')}>Complete</Button>
                        <Button onClick={() => handleBulkActionTodos(selectedItems, 'inComplete')}>Incomplete</Button>
                        <Button tone="critical" onClick={() => handleBulkDelete(selectedItems)}>
                            Delete
                        </Button>
                    </div>
                </Box>
            )}

            <CreateModal
                onOpen={modalActive}
                onClose={handleModalChange}
                onAdd={handleAddTodo}
                isLoading={isLoading}
                errorMessage={errorMessage}
            />
        </Page>
    );
}

export default PageContent;