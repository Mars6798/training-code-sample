import {Badge, Button, ResourceItem, Text} from "@shopify/polaris";
import React from "react";

const RowItem = ({id, title, isCompleted, onComplete, onDelete}) => {
    const handleCompleteTodo = () => {
        onComplete();
    }

    const handleDeleteTodo = () => {
        onDelete();
    }
    return (
        <ResourceItem
            id={id}
            accessibilityLabel={title}
            name={title}
        >
            <div className="row-todo">
                <Text variant="bodyMd" fontWeight="bold" as="h3">
                    {title}
                </Text>
                <div className="actions">
                    <Badge
                        tone={isCompleted ? "success" : "warning"}
                    >
                        {isCompleted ? "Complete" : "Incomplete"}
                    </Badge>

                    <Button
                        onClick={e => {
                            e.stopPropagation();
                            handleCompleteTodo();
                        }}
                        disabled={isCompleted}
                    >
                        Complete
                    </Button>

                    <Button
                        onClick={e => {
                            e.stopPropagation();
                            handleDeleteTodo();
                        }}
                        tone="critical"
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </ResourceItem>
    )
}

export default RowItem;