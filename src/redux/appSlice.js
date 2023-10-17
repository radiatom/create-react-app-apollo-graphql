import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    task: {},
    completedTasks: [
        { id: 1, title: "перше завдання", description: "невеликий опис 1", statusCompleted: true },
        { id: 2, title: "друге завдання", description: "невеликий опис 2", statusCompleted: true },
        { id: 3, title: "третє завдання", description: "невеликий опис 3", statusCompleted: true },
        { id: 4, title: "четверте завдання", description: "невеликий опис 4", statusCompleted: true },
        { id: 5, title: "п'яте завдання", description: "невеликий опис 5", statusCompleted: true },
    ],
    notCompletedTasks: [
        { id: 6, title: "шосте завдання", description: "невеликий опис 6", statusCompleted: false },
        { id: 7, title: "сьоме завдання", description: "невеликий опис 7", statusCompleted: false },
        { id: 8, title: "восьме завдання", description: "невеликий опис 8", statusCompleted: false },
        { id: 9, title: "девяте завдання", description: "невеликий опис 9", statusCompleted: false },
        { id: 10, title: "десяте завдання", description: "невеликий опис 10", statusCompleted: false },
    ],
};

export const appSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        openTask: (state, action) => {
            if (action.payload.id === 0) {
                state.task = {};
            } else {
                const hasObjectWithId = state.completedTasks.some((obj) => obj.id === action.payload.id);
                if (hasObjectWithId) {
                    const foundObject = state.completedTasks.find((obj) => obj.id === action.payload.id); ///шукаємо завдання яке не має бути в цьому списку
                    state.task = foundObject;
                } else {
                    const foundObject = state.notCompletedTasks.find((obj) => obj.id === action.payload.id); ///шукаємо завдання яке не має бути в цьому списку
                    state.task = foundObject;
                }
            }
        },
        addTask: (state, action) => {
            const newId = state.completedTasks.length + state.notCompletedTasks.length + 1;
            const updateTask = { ...action.payload, id: newId };
            if (action.payload.statusCompleted === true) {
                state.completedTasks.unshift(updateTask);
            } else {
                state.notCompletedTasks.unshift(updateTask);
            }
        },
        editTask: (state, action) => {
            const hasObjectWithId = state.completedTasks.some((obj) => obj.id === action.payload.id);
            if (hasObjectWithId) {
                const newList = state.completedTasks.map((obj) => {
                    //змінюємо завдання в листі
                    if (obj.id === action.payload.id) {
                        return { ...action.payload };
                    }
                    return obj;
                });
                const foundObject = newList.find((obj) => obj.statusCompleted === false); ///шукаємо завдання яке не має бути в цьому списку
                if(foundObject!==undefined){state.notCompletedTasks.unshift(foundObject)}; //добавляємо завдання в інший список
                const updateList = newList.filter((item) => item.statusCompleted === true); //видаляємо завдання яке в цьому листі не потрібне
                state.completedTasks = updateList;
            } else {
                const newList = state.notCompletedTasks.map((obj) => {
                    //змінюємо завдання в листі
                    if (obj.id === action.payload.id) {
                        return { ...action.payload };
                    }
                    return obj;
                });
                const foundObject = newList.find((obj) => obj.statusCompleted === true); ///шукаємо завдання яке не має бути в цьому списку
                if(foundObject!==undefined){state.completedTasks.unshift(foundObject)}; //добавляємо завдання в інший список
                const updateList = newList.filter((item) => item.statusCompleted === false); //видаляємо завдання яке в цьому листі не потрібне
                state.notCompletedTasks = updateList;
            }
        },
        deleteTask: (state, action) => {
            const hasObjectWithId = state.completedTasks.some((obj) => obj.id === action.payload.id);
            if (hasObjectWithId) {
                const newList = state.completedTasks.filter((item) => item.id !== action.payload.id);
                state.completedTasks = newList;
            } else {
                const newList = state.notCompletedTasks.filter((item) => item.id !== action.payload.id);
                state.notCompletedTasks = newList;
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { openTask, addTask, editTask, deleteTask } = appSlice.actions;

export default appSlice.reducer;
