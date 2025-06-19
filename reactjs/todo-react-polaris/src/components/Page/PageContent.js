import { useEffect, useState, useCallback } from 'react';
import { Page, LegacyCard, ResourceList, Button, Box } from '@shopify/polaris';
import CreateModal from '../Page/CreateModal';
import RowItem from '../Page/RowItem';

function PageContent() {
    const [todos, setTodos] = useState([]);
    const [modalActive, setModalActive] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    async function fetchData () {
        try {
            const resp = await fetch('https://jsonplaceholder.typicode.com/todos');
            const respData = await resp.json();

            setTodos(respData.slice(0, 5));
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleAddTodo = (title) => {
        if (title.trim() === "") return;
        
        setTodos(prevTodos => {
            return [...prevTodos, {
                userId: 1,
                id: prevTodos.length + 1,
                title: title,
                completed: false
            }];
        });
        setModalActive(false);
    };

    const handleModalChange = () => {
        setModalActive((active) => !active);
    };

    const handleCompleteTodo = (id) => {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id ? {...todo, completed: true} : todo
            )
        )
    };

    const handleDeleteTodo = (id) => {
        setTodos(prevTodos =>
            prevTodos.filter(todo => todo.id !== id)
        )
    };
    
    const handleBulkComplete = () => {
        setTodos((prev) =>
            prev.map(todo =>
                selectedItems.includes(todo.id)
                    ? { ...todo, completed: true }
                    : todo
            )
        );
        setSelectedItems([])
    };

    const handleBulkIncomplete = () => {
        setTodos((prev) =>
            prev.map(todo =>
                selectedItems.includes(todo.id)
                    ? { ...todo, completed: false }
                    : todo
            )
        );
        setSelectedItems([])
    };

    const handleBulkDelete = () => {
        setTodos((prev) => prev.filter(todo => !selectedItems.includes(todo.id)));
        setSelectedItems([])
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
                    onSelectionChange={setSelectedItems}
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

            {selectedItems.length > 0 && (
                <Box>
                    <div className="bulk-actions">
                        <Button onClick={handleBulkComplete}>Complete</Button>
                        <Button onClick={handleBulkIncomplete}>Incomplete</Button>
                        <Button tone="critical" onClick={handleBulkDelete}>
                            Delete
                        </Button>
                    </div>
                </Box>
            )}

            <CreateModal
                onOpen={modalActive}
                onClose={handleModalChange}
                onAdd={handleAddTodo}
            />
        </Page>
    );
}

export default PageContent;