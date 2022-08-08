import { RootState } from "@/store"
import { createSlice } from "@reduxjs/toolkit"

interface State {
    projectModalOpen: boolean
}

const initialState: State = {
    projectModalOpen: false
}

export const projectListSlice = createSlice({
    name: 'projectListSlice',
    initialState,
    reducers: {
        // immerjs https://immerjs.github.io/immer/
        // immutable，执行前已经创建了一个新的对象，所以可以直接修改
        openProjectModal(state) {
            state.projectModalOpen = true
        },
        closeProjectModal(state) {
            state.projectModalOpen = false
        }
    }
})

export const projectListActions = projectListSlice.actions

export const selectProjectModalOpen = (state: RootState) => state.projectList.projectModalOpen