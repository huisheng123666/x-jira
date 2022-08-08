export interface Task {
  id: number
  name: string
  // 经办人
  processorid: number
  projectId: number
  epicId: number
  KanbanId: number
  // bug or task
  typeId: number
  note: string
}