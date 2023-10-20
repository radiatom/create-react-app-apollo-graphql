import React, {} from "react";
import { Button, Card, CloseButton, Container, Row } from "react-bootstrap";
import edit from "./../../assets/edit.png";
import { useMutation } from "@apollo/client";
import { DELETE_TODO, UPDATE_COMPLITED } from "../../apollo/mutation/todo";
import { GET_TODOS } from "../../apollo/query/AllTodos";

const TasksList = ({ nameOpenList, list, setOpenModalEditTask, setIdTaskInModal }) => {
    const openModalEditTask = (id) => {
        setOpenModalEditTask(true);
        setIdTaskInModal(id);
    };

    const [deleteTodo] = useMutation(DELETE_TODO, {
        refetchQueries: [GET_TODOS],
    });
    const [updateComplited] = useMutation(UPDATE_COMPLITED, {
        refetchQueries: [GET_TODOS],
    });
    
    return (
        <>
            <h3 className="mt-1">{nameOpenList}:</h3>
            <Row>
                {list.map((item, index) => {
                    return (
                        <Card className="m-1" style={{ width: "18rem" }} key={index}>
                            <Container className="text-end">
                                <img
                                    className="m-1"
                                    style={{ width: "21px", cursor: "pointer" }}
                                    src={edit}
                                    alt="edit"
                                    onClick={() => openModalEditTask(item.id)}
                                />
                                <CloseButton className="m-1" onClick={() => deleteTodo({ variables: { id: item.id } })} />
                            </Container>
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                                <Card.Text>{item.description}</Card.Text>
                                <Card.Text>{item.completed ? "Виконане" : "Не виконане"}</Card.Text>
                                {item.completed ? (
                                    <Button
                                        variant="danger"
                                        onClick={() => updateComplited({ variables: { id: item.id, completed: false } })}
                                    >
                                        Позничити як не виконане
                                    </Button>
                                ) : (
                                    <Button
                                        variant="success"
                                        onClick={() => updateComplited({ variables: { id: item.id, completed: true } })}
                                    >
                                        Позничити як виконане
                                    </Button>
                                )}
                            </Card.Body>
                        </Card>
                    );
                })}
            </Row>
        </>
    );
};

export default TasksList;
