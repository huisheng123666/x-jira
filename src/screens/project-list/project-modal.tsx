import { ErrorBox } from "@/components/lib"
import { UserSelect } from "@/components/user-select"
import { useAddProject, useEditProject } from "@/utils/use-projects"
import styled from "@emotion/styled"
import { Button, Drawer, Form, Input, Spin } from "antd"
import { useEffect } from "react"
import { useProjectModal } from "./util"


export const ProjectModal = () => {
    const {projectModalOpen, close, editingProject, isLoading} = useProjectModal()

    const useMutateProject = editingProject ? useEditProject : useAddProject

    const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject()

    const [form] = Form.useForm()

    const closeForm = () => {
        form.resetFields()
        close()
    }

    const onFinish = (values: any) => {
        mutateAsync({ ...editingProject, ...values }).then(closeForm)
    }

    useEffect(() => {
        form.setFieldsValue(editingProject)
    }, [editingProject, form])

    return <Drawer
        width="100vw"
        visible={projectModalOpen}
        onClose={closeForm}
        title={editingProject ? '编辑项目' : '创建项目'}
        forceRender={true}
    >
        <Container>
            {
                isLoading ? <Spin size='large' /> : <>
                    <h1>{editingProject ? '编辑项目' : '创建项目'}</h1>
                    <ErrorBox error={error} />
                    <Form form={form} layout='vertical' style={{ width: '40rem' }} onFinish={onFinish}>
                        <Form.Item label='名称' name={'name'} rules={[{ required: true, message: '请输入项目名' }]}>
                            <Input placeholder="请输入项目名称" />
                        </Form.Item>
                        <Form.Item label='部门' name={'organization'} rules={[{ required: true, message: '请输入部门名' }]}>
                            <Input placeholder="请输入部门名" />
                        </Form.Item>
                        <Form.Item label='负责人' name={'personId'}>
                            <UserSelect defaultOptionName="负责人" />
                        </Form.Item>
                        <Form.Item>
                            <Button block loading={mutateLoading} type='primary' htmlType="submit">提交</Button>
                        </Form.Item>
                    </Form>
                </>
            }
        </Container>
    </Drawer>
}

const Container = styled.div`
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`