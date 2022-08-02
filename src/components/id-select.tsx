import { Raw } from "@/types"
import { Select } from "antd"



interface IdSelectProps extends Omit<React.ComponentProps<typeof Select>, 'value' | 'onChange' | 'options'> {
    value: Raw | null | undefined
    onChange: (value?: number) => void
    defaultOptionName?: string
    options?: { name: string, id: number }[]
}

/**
 * value可以传入多种类型的值
 * onChange只回调number | undefined
 * 当 isNan(Number(value)) 为true的时候，代表选择默认类型
 * 当选择默认类型的时候，onChange会回调undefined
 * @returns 
 */
export const IdSelect: React.FC<IdSelectProps> = ({ value, onChange, defaultOptionName, options, ...restProps }) => {
    return <Select
        value={options?.length ? toNumber(value) : 0}
        onChange={value => onChange(toNumber(value) || undefined)}
        {...restProps}
    >
        {
            defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null
        }
        {
            options?.map(option => <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>)
        }
    </Select>
}

const toNumber = (value: unknown) => isNaN(Number(value)) ? 0 : Number(value)