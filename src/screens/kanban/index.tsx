import { ScreenContainer } from "@/components/lib"
import { useDocumentTitle } from "@/utils"
import { useKanbans } from "@/utils/kanban"
import styled from "@emotion/styled"
import { CreateKanban } from "./create-kanban"
import { KanbanColumn } from "./kanban-column"
import { SearchPanel } from "./search-panel"
import { useKanbansQueryKey, useProjectInUrl } from "./util"

export const KanBanScreen = () => {
    useDocumentTitle('看板列表')

    const { data: currentProject } = useProjectInUrl()

    const { data: kanbans = [] } = useKanbans(useKanbansQueryKey())

    return <ScreenContainer>
        <h1>{currentProject?.name}</h1>
        <SearchPanel/>
        <ColumnsContainer>
            {
                kanbans.map(kanban => <KanbanColumn kanban={kanban} key={kanban.id}/>)
            }
            <CreateKanban/>
        </ColumnsContainer>
    </ScreenContainer>
}


export const ColumnsContainer = styled.div`
    flex: 1;
    display: flex;
    overflow-x: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
`