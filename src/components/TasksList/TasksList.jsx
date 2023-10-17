import React, { useEffect } from "react";
import { Button, Card, CloseButton, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { editTask, openTask } from "../../redux/appSlice";
import edit from "./../../assets/edit.png";
import { useMutation } from "@apollo/client";
import { DELETE_TODO } from "../../mutation/doto";

const TasksList = ({ nameOpenList, list, setOpenModalEditTask,setIdTaskInModal }) => {
    
    const dispatch = useDispatch();
    const openModalEditTask = (id) => {
        setOpenModalEditTask(true);
        setIdTaskInModal(id)
    };

    const [deleteTodo] = useMutation(DELETE_TODO);
    const deleteTask = (id) => {
        deleteTodo({
            variables: {
                id: id,
            },
        }).then(({ data }) => {
            console.log(data);
        });
    };
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
                                <CloseButton className="m-1" onClick={() => deleteTask(item.id)} />
                            </Container>
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                                <Card.Text>Якийсь опис</Card.Text>
                                <Card.Text>{item.completed ? "Виконане" : "Не виконане"}</Card.Text>
                                {item.completed ? (
                                    <Button variant="danger" onClick={() => dispatch(editTask({ ...item, completed: false }))}>
                                        Позничити як не виконане
                                    </Button>
                                ) : (
                                    <Button variant="success" onClick={() => dispatch(editTask({ ...item, completed: true }))}>
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
