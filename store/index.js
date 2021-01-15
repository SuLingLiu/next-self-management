import { createStore } from "redux";


//单例模式，全局只有一个store
//符合函数式编程的纯函数，所以用return,传进去是什么，返回一个可预测的，状态不能变更。而vuex可以直接改状态
const counterReducer = function(state = 0, action) {
    const num = action.payload || 1
    switch (action.type) {
        case 'add': 
            return state + num;
        case 'minus': 
            return state -num;
        default: 
            return state;
    }
}

//创建实例
const store = createStore(counterReducer)
export default store;