export class Todo {
  id: string;
  text: string;
  complete: boolean;

  constructor(id: string, text: string, complete: boolean) {
    this.id = id;
    this.text = text;
    this.complete = complete;
  }
}

export class User {
  id: string;

  constructor(id: string) {
    this.id = id;
  }
}

export const USER_ID = "me";

const usersById: Record<string, User> = { [USER_ID]: new User(USER_ID) };

const todosById: Record<string, Todo> = {};

const todoIdsByUser: Record<string, string[]> = { [USER_ID]: [] };

let nextTodoId = 0;

// const withDelay = async <F extends (...args: any) => any>(
//   fn: F,
//   delay = 1000
// ) => {
//  await Promise.resolve(setTimeout(fn, delay));
// };

const delay = async (delay = 1000) =>
  await new Promise<void>((resolve) => setTimeout(resolve, delay));

export const getUserOrThrow = async (id: string) => {
  await delay();
  return usersById[id];
};

export const addTodo = async (text: string, complete: boolean) => {
  await delay();
  const todo = new Todo(`${nextTodoId++}`, text, complete);
  todosById[todo.id] = todo;
  todoIdsByUser[USER_ID] = (todoIdsByUser[USER_ID] || []).concat(todo.id);
  return todo.id;
};

const getTodoOrThrow = (id: string) => {
  const todo = todosById[id];
  return todo;
};

export const getTodo = async (id: string) => {
  return getTodoOrThrow(id);
};

export const getTodos = async (status = "any") => {
  await delay();
  const todosForUser = todoIdsByUser[USER_ID].map(getTodoOrThrow);
  if (status === "any") return todosForUser;
  return todosForUser.filter(
    (todo) => todo.complete === (status === "completed")
  );
};

export const changeTodoStatus = async (id: string, complete: boolean) => {
  await delay();
  const todo = getTodoOrThrow(id);
  todo.complete = complete;
};
