export const completedTasksSelector=(state)=>{
    return state.appPage.completedTasks
}
export const notCompletedTasksSelector=(state)=>{
    return state.appPage.notCompletedTasks
}
export const taskSelector=(state)=>{
    return state.appPage.task
}