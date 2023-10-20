import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_TODO } from "../../apollo/query/todo";
import { CREATE_TODO, UPDATE_TODO } from "../../apollo/mutation/todo";
import { GET_TODOS } from "../../apollo/query/AllTodos";

const ModalWindow = ({ fnOpen, id = 0, }) => {
    const defaultTask={ title: "", description: "", completed: false }
    const [task, setTask] = useState({ ...defaultTask});
    const [erorr, setErorr] = useState(false);
    const [getData, { data, loading }] = useLazyQuery(GET_TODO, {
        variables: {
            id: id,
        },
    });
    const [creatTodo] = useMutation(CREATE_TODO, {
        refetchQueries: [GET_TODOS],
    });
    const [updateTodo] = useMutation(UPDATE_TODO, {
        refetchQueries: [GET_TODOS],
    });

    const changeTitle = (event) => {
        setTask({ ...task, title: event.target.value });
    };
    const changeDescription = (event) => {
        setTask({ ...task, description: event.target.value });
    };
    const changeChecked = () => {
        setTask({ ...task, completed: !task.completed });
    };
    const saveChanges = () => {
        if (/[^\s]/.test(task.title)) {
            if (id === 0) {
                creatTodo({ variables: task });
            }
            if (id !== 0) {
                updateTodo({ variables: { ...task, id: task.id } });
            }
            fnOpen(false);
        } else {
            setErorr(true);
        }
    };

    const close = () => {
        fnOpen(false);
        setTask({...defaultTask});
        // setIdTaskInModal(0);
    };

    useEffect(() => {
        if (id !== 0) {
            console.log(data);
            getData({ variables: { id: id } });
            if (data !== undefined) {
                setTask(data.Todo);
            }
        }
    }, [id, data]);
    if (loading) return <p>Loading...</p>;
    return (
        <div className="modal show" style={{ display: "block", position: "absolute", backgroundColor: "rgba(0, 0, 0, 0.603)" }}>
            <Modal.Dialog>
                <Modal.Header closeButton onClick={() => close()}></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Назва</Form.Label>
                            <Form.Control type="text" placeholder="Назва" value={task.title} onChange={changeTitle} />
                            {erorr && <Form.Text style={{ color: "red" }}>Назва не може бути порожньою</Form.Text>}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Опис</Form.Label>
                            <Form.Control as="textarea" rows={3} value={task.description} onChange={changeDescription} />
                        </Form.Group>
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Виконане"
                            className="mb-3"
                            checked={task.completed}
                            onChange={changeChecked}
                        />

                        <Button className="me-3" variant="secondary" onClick={() => close()}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => saveChanges()}>
                            Save changes
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal.Dialog>
        </div>
    );
};

export default ModalWindow;
