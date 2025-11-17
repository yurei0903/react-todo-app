import type { Todo } from "./types";
import { v4 as uuid } from "uuid"; // v4 を uuid という名前でインポート
export const initTodos: Todo[] = [
  {
    id: uuid(), // UUID v4 を生成してIDにセット
    name: "解析2の宿題",
    isDone: false,
    priority: 3,
    url: null,
    price: null,
  },
  {
    id: uuid(),
    name: "TypeScriptの勉強 (復習)",
    isDone: false,
    priority: 3,
    url: null,
    price: null,
  },
  {
    id: uuid(),
    name: "基礎物理学3の宿題",
    isDone: false,
    priority: 3,
    url: "https://takeshiwada1980.github.io/Programming3-2025/lecture04.html",
    price: null,
  },
];