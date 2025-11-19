// App.tsx
import { useState, useEffect, useRef } from "react";
import type { Todo } from "./types";
import { initTodos } from "./initTodos";
// import WelcomeMessage from "./WelcomeMessage"; // 今回は未使用なら削除
import TodoList from "./TodoList";
import { v4 as uuid } from "uuid";
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const App = () => {
  // ... (Stateやロジック部分は変更なしなので省略します) ...
  // ... remove, updateIsDone, plascard, minascard などもそのまま ...
  // ... isValidTodoName などの関数もそのまま ...

  // ★重要: ここから下のみ表示用レイアウトに合わせて変更します

  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoName, setNewTodoName] = useState("");
  const [newTodoPriority, setNewTodoPriority] = useState(3);
  const [newTodourl, setNewTodourl] = useState<string | null>(null);
  const [newTodoNameError, setNewTodoNameError] = useState("");
  const [newTodoPrice, setNewTodoPrice] = useState<number | null>(null);
  const [initialized, setInitialized] = useState(false);
  const localStorageKey = "TodoApp";
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const todoJsonStr = localStorage.getItem(localStorageKey);
    if (todoJsonStr && todoJsonStr !== "[]") {
      const storedTodos: Todo[] = JSON.parse(todoJsonStr);
      const convertedTodos = storedTodos.map((todo) => ({
        ...todo,
        url: todo.url ? todo.url : null,
      }));
      setTodos(convertedTodos);
    } else {
      setTodos(initTodos);
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem(localStorageKey, JSON.stringify(todos));
    }
  }, [todos, initialized]);

  const remove = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const removeCompletedTodos = () => {
    const updatedTodos = todos.filter((todo) => !todo.isDone);
    setTodos(updatedTodos);
  };

  const updateIsDone = (id: string, value: boolean) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isDone: value };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
  };

  const plascard = (id: string, value: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo={ ...todo, priority: value + 1 }
        if (todo.priority > 0) {
          todo={ ...todo, isDone: false};
        }
        return todo;
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
  };

  const minascard = (id: string, value: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo={ ...todo, priority: value - 1 };
        if (todo.priority === 0) {
          todo={ ...todo, isDone: true};
        }
        return todo
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
  };


  const isValidTodoName = (name: string): string => {
    if (name.length > 113) {
      return "113文字以内で入力してください";
    } else {
      return "";
    }
  };

  const updateNewTodoName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoNameError(isValidTodoName(e.target.value));
    setNewTodoName(e.target.value);
  };

  const updateNewTodoPriority = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoPriority(Number(e.target.value));
  };

  const updateNewTodourl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setNewTodourl(url === "" ? null : url);
  };

  const updateNewTodoPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.valueAsNumber; 
    const safeValue = isNaN(newValue) ? 0 : newValue;
    setNewTodoPrice(safeValue);
  }

  const openModal = () => {
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
  };

  const addNewTodo = () => {
    const err = isValidTodoName(newTodoName);
    if (err !== "") {
      setNewTodoNameError(err);
      return;
    }
    const newTodo: Todo = {
      id: uuid(),
      name: newTodoName,
      isDone: false,
      priority: newTodoPriority,
      url: newTodourl,
      price: newTodoPrice,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    setNewTodoName("");
    setNewTodoPriority(3);
    setNewTodourl("");
    setNewTodoPrice(null);
    closeModal();
  };

  return (
    <div className="mx-2 mt-6 max-w-2xl md:mx-auto pb-20"> {/* スマホ向けに余白調整 */}
      <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">カード買い物メモ</h1>
      
      {/* --- ヘッダー部分 --- 
          grid-cols-[1fr_3rem_3.5rem_2rem] 
          1fr: 名前(残り全部)
          3rem: 値段
          3.5rem: 枚数
          2rem: +/-ボタンの幅
      */}
      <div className="hidden sm:grid grid-cols-[2rem_1fr_4rem_4rem_4rem_2.5rem] gap-3 px-4 mb-2 text-sm font-bold text-gray-500">
        <div></div> {/* チェックボックス分 */}
        <div>カード名</div>
        <div className="text-right">値段</div>
        <div className="text-right">合計値段</div>
        <div className="text-center">枚数</div>
        <div></div> {/* ボタン分 */}
      </div>

      {/* スマホ版の簡易ヘッダー (各カードの上にラベルを置くため、ここではタイトルだけにするか、省略してもOK) */}
      <div className="sm:hidden flex justify-between px-4 mb-2 text-xs font-bold text-gray-400">
        <div>リスト</div>
        <div>詳細設定</div>
      </div>

      <TodoList
        todos={todos}
        updateIsDone={updateIsDone}
        remove={remove}
        plascard={plascard}
        minascard={minascard}
      />
      
      {/* --- ボタン群 (固定フッターにするとスマホで押しやすいですが、今回は通常配置) --- */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 px-2">
        <button
          onClick={openModal}
          className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-bold text-white shadow-lg hover:bg-indigo-700 active:scale-95 transition-transform"
        >
        + カードを追加
        </button>

        <button
          type="button"
          onClick={removeCompletedTodos}
          className="w-full rounded-lg bg-gray-200 px-4 py-3 font-bold text-gray-600 shadow hover:bg-gray-300 active:scale-95 transition-transform "
        >
          完了済みを削除
        </button>
      </div>

      {/* --- ダイアログ (内容はそのまま) --- */}
      <dialog
  ref={dialogRef}
  className="p-0 rounded-xl shadow-2xl backdrop:bg-black/60 w-[90%] max-w-md 
             ** left-1/2 -translate-x-1/2 -translate-y-1/2**"
        onClick={(e) => {
            if (e.target === dialogRef.current) closeModal();
        }}
      >
        <div className="p-6 bg-white mx-auto">
          <h2 className="mb-4 text-lg font-bold text-gray-800 border-b pb-2">
            カードの追加
          </h2>

          {/* カードの名前 */}
          <div className="mb-4 ">
            <label className="block mb-1 font-bold text-sm text-gray-700" htmlFor="newTodoName">
              カードの名前
            </label>
            <input
              id="newTodoName"
              type="text"
              value={newTodoName}
              onChange={updateNewTodoName}
              className={twMerge(
                "w-full rounded-md border border-gray-300 p-3 text-base focus:outline-none focus:ring-2 focus:ring-indigo-500",
                newTodoNameError && "border-red-500 ring-1 ring-red-500"
              )}
              placeholder="カード名を入力"
            />
            {newTodoNameError && (
              <div className="mt-1 flex items-center text-xs font-bold text-red-500">
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  className="mr-1"
                />
                {newTodoNameError}
              </div>
            )}
          </div>

          {/* 必要枚数 */}
          <div className="mb-4">
            <div className="mb-2 font-bold text-sm text-gray-700">必要枚数</div>
            <div className="flex justify-between gap-2">
              {[1, 2, 3, 4].map((value) => (
                <label key={value} className={`
                    flex-1 flex items-center justify-center py-2 rounded-md border cursor-pointer transition-colors
                    ${newTodoPriority === value ? 'bg-indigo-100 border-indigo-500 text-indigo-700 font-bold' : 'bg-gray-50 border-gray-200'}
                `}>
                  <input
                    type="radio"
                    name="priorityGroup"
                    value={value}
                    checked={newTodoPriority === value}
                    onChange={updateNewTodoPriority}
                    className="hidden" // ラジオボタン自体は隠してラベルのデザインで見せる
                  />
                  <span>{value}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <div className="flex-1">
                <label className="block mb-1 font-bold text-sm text-gray-700" htmlFor="newTodoPrice">
                値段 (円)
                </label>
                <input
                id="newTodoPrice"
                type="number"
                value={newTodoPrice || ""}
                onChange={updateNewTodoPrice}
                className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="100"
                />
            </div>
          </div>

          {/* URL */}
          <div className="mb-8">
            <label className="block mb-1 font-bold text-sm text-gray-700" htmlFor="newTodoUrl">
              参考URL
            </label>
            <input
              id="newTodoUrl"
              type="text"
              value={newTodourl || ""}
              onChange={updateNewTodourl}
              className="w-full rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://..."
            />
          </div>

          {/* アクションボタン */}
          <div className="flex justify-end gap-3">
            <button
              onClick={closeModal}
              className="rounded-lg bg-gray-100 px-4 py-2 font-bold text-gray-600 hover:bg-gray-200"
            >
              キャンセル
            </button>
            <button
              type="button"
              onClick={addNewTodo}
              disabled={!!newTodoNameError || newTodoName === ""}
              className={twMerge(
                "rounded-lg bg-indigo-600 px-6 py-2 font-bold text-white shadow hover:bg-indigo-700",
                (newTodoNameError || newTodoName === "") && "cursor-not-allowed opacity-50"
              )}
            >
              追加
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default App;