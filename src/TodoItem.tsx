import React from "react";
import type { Todo } from "./types";

type Props = {
  todo: Todo;
  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string) => void;
  plascard: (value: number) => void;
};

const TodoItem = (props: Props) => {
  const todo = props.todo;
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={(e) => props.updateIsDone(todo.id, e.target.checked)}
          className="mr-1.5 cursor-pointer"
        />
        {todo.name}
      </div>
      <div className="mr-5">必要枚数: {todo.priority}</div>
      <button
        onClick={() => props.plascard(todo.priority)}
        className="mr-5 rounded-md bg-slate-200 px-2 py-1 text-sm font-bold text-white hover:bg-green-500"
      >
        +1枚追加
      </button>
      <div>
      <a href={todo.url || "#"} target="_blank" rel="noopener noreferrer">
      <button id="viewCardButton"
          className="mr-2 rounded-md bg-slate-200 px-2 py-1 text-sm font-bold text-white hover:bg-blue-500"
        >
          カードを見る
        </button>
      </a>
        <button
          onClick={() => props.remove(todo.id)}
          className="rounded-md bg-slate-200 px-2 py-1 text-sm font-bold text-white hover:bg-red-500"
        >
          削除
        </button>
      </div>
    </div>
  );
};



export default TodoItem;