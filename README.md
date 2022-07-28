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