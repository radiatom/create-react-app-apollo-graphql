import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { openTask } from "../../redux/appSlice";
import { useQuery } from "@apollo/client";
import { GET_TODO } from "../../query/todo";

const ModalWindow = ({ fnOpen, action, id }) => {
    const [task, setTask] = useState({});
    const { data, loading } = useQuery(GET_TODO, {
        variables: {
            id: id,
        },
    });
    useEffect(() => {
        if (!loading) {
            setTask(data.todo);
        }
    }, [data]);
    const dispatch = useDispatch();
    const [erorr, setErorr] = useState(false);

    const close = () => {
        fnOpen(false);
        dispatch(openTask({ id: 0 }));
    };
    const changeTitle = (event) => {
        setTask({ ...task, title: event.target.value });
    };

    const saveChanges = () => {
        if (/[^\s]/.test(task.title)) {
            // action(task);
            fnOpen(false);
        } else {
            setErorr(true);
        }
    };

    const handleChange = () => {
        setTask({ ...task, completed: !task.completed });
    };
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
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Виконане"
                            className="mb-3"
                            checked={task.completed}
                            onChange={handleChange}
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
