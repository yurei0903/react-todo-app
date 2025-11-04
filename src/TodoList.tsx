import React from "react";
import type { Todo } from "./types";

type Props = {
  todos: Todo[];
};

const TodoList = (props: Props) => {
const todos = [...props.todos].sort((a, b) => {
  if (a.isDone !== b.isDone) {
    return a.isDone ? 1 : -1; // 未完了タスクを先に表示
  }
  if (a.deadline === null && b.deadline === null) {
  return a.deadline.getTime() - b.deadline.getTime();}
);

  if (todos.length === 0) {
    return (
      <div className="text-red-500">
        現在、登録されているタスクはありません。
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.name} 優先度: {todo.priority}
        </div>
      ))}
    </div>
  );
};

export default TodoList;