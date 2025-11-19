// TodoItem.tsx
import React from "react";
import type { Todo } from "./types";
import { twMerge } from "tailwind-merge";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
type Props = {
  todo: Todo;
  updateIsDone: (id: string, value: boolean) => void;
  remove: (id: string) => void;
  plascard: (id: string, value: number) => void;
  minascard: (id: string, value: number) => void;
  openModal: () => void;
  
};

const TodoItem = (props: Props) => {
  const todo = props.todo;

  return (
    <div className={twMerge(
        "bg-white rounded-xl shadow-sm border border-gray-200 p-3 mb-3 transition-all",
        todo.isDone && "bg-gray-50 opacity-60"
    )}>
      {/* 上段：メイン情報 (Gridレイアウト) */}
      <div className="grid grid-cols-[2rem_1fr_auto_auto_auto_2rem_2rem] gap-3 items-center">
        
        {/* 1. チェックボックス */}
        <div className="flex justify-center">
            <input
            type="checkbox"
            checked={todo.isDone}
            onChange={(e) => props.updateIsDone(todo.id, e.target.checked)}
            className="w-5 h-5 cursor-pointer accent-indigo-500"
            />
        </div>

        {/* 2. カード名 + ラベル */}
        <div className="flex flex-col min-w-0"> {/* min-w-0はtruncateに必須 */}
            <span className="text-[10px] text-gray-400 font-bold leading-none mb-0.5">カード名</span>
            <span className={twMerge(
                "font-bold text-gray-800 truncate", 
                todo.isDone && "line-through text-gray-400"
            )}>
                {todo.name}
            </span>
        </div>

        {/* 3. 値段 */}
        <div className="flex flex-col items-end min-w-">
            <span className="text-[10px] text-gray-400 font-bold leading-none mb-0.5">単価</span>
            <span className="text-sm font-medium text-gray-600">
                {todo.price ? `¥${todo.price}` : "-"}
            </span>
        </div>
        <div className="flex flex-col items-end min-w-">
            <span className="text-[10px] text-gray-400 font-bold leading-none mb-0.5">合計</span>
            <span className="text-sm font-medium text-gray-600">
                {todo.price ? `¥${todo.price*todo.priority}` : "-"}
            </span>
        </div>

        {/* 4. 枚数 (重要情報なので少し大きく) */}
        <div className="flex flex-col items-center min-w-">
             <span className="text-[10px] text-gray-400 font-bold leading-none mb-0.5">枚数</span>
             <span className="text-lg font-bold text-indigo-600">
                {todo.priority}
             </span>
        </div>

        {/* 5. +/- ボタン (縦並び) */}
        <div className="flex flex-col gap-1">
            <button
                onClick={() => props.plascard(todo.id, todo.priority)}
                className="h-6 w-8 flex items-center justify-center rounded bg-indigo-100 text-indigo-600 font-bold hover:bg-indigo-200 active:bg-indigo-300"
            >
            +
            </button>
            <button
                onClick={() => props.minascard(todo.id, todo.priority)}
                disabled={todo.priority <= 0}
                className="h-6 w-8 flex items-center justify-center rounded bg-gray-100 text-gray-500 font-bold hover:bg-gray-200 active:bg-gray-300 disabled:opacity-30"
            >
            -
            </button>
            
        </div>
        <div className="flex flex-col gap-1">
            <button
                onClick={() => props.openModal()}
                className="rounded bg-gray-100 hover:bg-indigo-100 active:bg-indigo-300"
            >
             <FontAwesomeIcon icon={faGear} />
            </button>
            </div>
      </div>

      {/* 下段：サブアクション (URLリンク と 削除) */}
      {todo.url && ( // レイアウト崩れ防止のため常に表示エリアを確保しても良い
          <div className="mt-3 pt-2 border-t border-gray-100 flex justify-end gap-3">
            {todo.url && (
                <a 
                    href={todo.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-indigo-500 flex items-center hover:underline px-2 py-1"
                >
                    外部サイトで見る
                </a>
            )}
            
            <button
              onClick={() => props.remove(todo.id)}
              className="text-xs font-bold text-red-400 hover:text-red-600 hover:bg-red-50 px-3 py-1 rounded transition-colors"
            >
              削除
            </button>
          </div>
      )}
    </div>
  );
};

export default TodoItem;