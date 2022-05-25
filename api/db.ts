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
  username: string;
  password: string;

  constructor(id: string, username: string, password: string) {
    this.id = id;
    this.username = username;
    this.password = password;
  }
}

const usersById: Record<string, User> = {};

const todosById: Record<string, Todo> = {};

const todoIdsByUser: Record<string, string[]> = {};

let nextTodoId = 0;
let nextUserId = 0;

const delay = async (delay = 1000) =>
  await new Promise<void>((resolve) => setTimeout(resolve, delay));

export const addUser = async (username: string, password: string) => {
  await delay();
  const id = `${nextUserId++}`;
  if (usersById[id]) throw new Error("User already exists");
  const user = new User(id, username, password);
  usersById[user.id] = user;
  todoIdsByUser[id] = [];
  return user.id;
};

export const getUserOrThrow = async (id: string) => {
  console.log(usersById);
  await delay();
  return usersById[id];
};

export const addTodo = async (
  text: string,
  userId: string,
  complete: boolean
) => {
  await delay();
  const todo = new Todo(`${nextTodoId++}`, text, complete);
  todosById[todo.id] = todo;
  todoIdsByUser[userId] = (todoIdsByUser[userId] || []).concat(todo.id);
  return todo.id;
};

const getTodoOrThrow = (id: string) => {
  const todo = todosById[id];
  return todo;
};

export const getTodo = async (id: string) => {
  return getTodoOrThrow(id);
};

export const getTodos = async (userId: string, status = "any") => {
  await delay();
  const todosForUser = todoIdsByUser[userId].map(getTodoOrThrow);
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

// (async () => await addUser("tester", "pass"))();
