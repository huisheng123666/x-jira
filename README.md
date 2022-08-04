### Utility type
Parameters：将函数参数类型以tuple形式返回  
Partial：将类型的属性变为可选  
Omit<Type, 'key' ｜ 'key2'>: 删除类型属性组成新类型  
Pick<Type, 'key'>: 挑选属性留下组成新类型  
Exclude<Type, 'name'>: 联合类型删除一个（如：keyof Type 删除其中一个）  


### Partial实现
```
type Partial<T> = {
    [P in keyof T]?: T[P]
}
```

### keyof Type
将类型的属性取出 


### 闭包的坑
```
const test = () => {
    let num = 0
    const effect = () => {
        num += 1
        const message = `现在的num值是：${num}`
        return function unMount() {
            console.log(message)
        }
    }

    return effect
} 

const add = test()
const unmount = add() // message在unmount闭包只改变了一次
add()
add()
unmount() // 打印1
```


### as const
将数组多种混合类型转换为tuple，每一项类型都确定
```
// <K extends string>(keys: K[]) 和 {[key in K]: string}组合后返回确定key、value类型
// 如传入['name', 'age']返回{name: string, age: string}
export const useUrlQueryQueryParam = <K extends string>(keys: K[]) => {
    const [searchParams, setSearchParam] = useSearchParams()

    return [
        keys.reduce((prev, key) => {
            return {
              ...prev,
              [key]: searchParams.get(key) || ''
            }  
        }, {} as {[key in K]: string}),
        setSearchParam
    ] as const
}
```


### Object.fromEntries
将iterator转换为对象


### 惰性初始state
useState直接传入函数的含义是惰性初始化，所以要用useState保存函数，不能直接传入函数
```
const [state, setState] = useState(() => initialState) // 传入的函数会自动执行，返回值作为初始值
```

### useRef
useRef 返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内保持不变。  
请记住，当 ref 对象内容发生变化时，useRef 并不会通知你。变更 .current 属性不会引发组件重新渲染。如果想要在 React 绑定或解绑 DOM 节点的 ref 时运行某些代码，则需要使用回调 ref 来实现。