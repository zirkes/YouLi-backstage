import { reactive } from 'vue';

export function useTodoList() {
    const state = reactive({
        todos: [] as string[]
    });

    const addTodo = (todo: string) => {
        state.todos.push(todo);
    };

    const removeTodo = (index: number): void => {
        state.todos.splice(index, 1);
    };

    return {
        todos: state.todos,
        addTodo,
        removeTodo,
    };
}

// 组件中使用
// import { useTodoList } from '@/hooks/useTodoList'
// const { todos, addTodo, removeTodo } = useTodoList();