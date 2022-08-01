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