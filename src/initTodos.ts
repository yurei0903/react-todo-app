import type { Todo } from "./types";
import { v4 as uuid } from "uuid"; // v4 を uuid という名前でインポート
export const initTodos: Todo[] = [
  {
    id: uuid(), // UUID v4 を生成してIDにセット
    name: "Sample Card A",
    isDone: false,
    priority: 4,
    url: null,
    price: 33,
  },
];