import Container from "react-bootstrap/Container";
import "./App.scss";
import { useEffect, useState } from "react";
import TasksList from "./components/TasksList/TasksList";
import NavBar from "./components/NavBar/NavBar";
import ModalWindow from "./components/ModalWindow/ModalWindow";
import { useQuery } from "@apollo/client";
import { GET_TODOS } from "./apollo/query/AllTodos";

function App() {
    const [completedTasksList, setCompletedTasksList] = useState([]);
    const [notCompletedTasksList, setNotCompletedTasksList] = useState([]);
    const { loading, error, data } = useQuery(GET_TODOS);
    const [idTaskInModal, setIdTaskInModal] = useState(0);

    const [nameList, setNameList] = useState("notCompletedTasksList");
    const [nameOpenList, setNameOpenList] = useState("");

    const [openModalNewTask, setOpenModalNewTask] = useState(false);
    const [openModalEditTask, setOpenModalEditTask] = useState(false);

    useEffect(() => {
        if (!loading) {
            const completedTasks = data.allTodos.filter((item) => item.completed === true);
            setCompletedTasksList(completedTasks);
            const notCompletedTasks = data.allTodos.filter((item) => item.completed === false);
            setNotCompletedTasksList(notCompletedTasks);
        }
    }, [data]);

    useEffect(() => {
        if (nameList === "notCompletedTasksList") {
            setNameOpenList("Не виконані завдання");
        } else {
            setNameOpenList("Виконані завдання");
        }
    }, [nameList, completedTasksList, notCompletedTasksList]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;

    return (
        <div className="App">
            <NavBar setNameList={setNameList} setOpenModalNewTask={setOpenModalNewTask} />
            <Container>
                <TasksList
                    nameOpenList={nameOpenList}
                    list={nameList === "notCompletedTasksList" ? notCompletedTasksList : completedTasksList}
                    setOpenModalEditTask={setOpenModalEditTask}
                    setIdTaskInModal={setIdTaskInModal}
                />
                {openModalEditTask && <ModalWindow fnOpen={setOpenModalEditTask} id={idTaskInModal} />}
                {openModalNewTask && <ModalWindow fnOpen={setOpenModalNewTask} />}
            </Container>
        </div>
    );
}

export default App;
