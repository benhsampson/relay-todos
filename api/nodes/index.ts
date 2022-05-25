import { fromGlobalId, nodeDefinitions } from "graphql-relay";

import { getTodo, getUserOrThrow, Todo, User } from "../db";

export const { nodeField, nodeInterface } = nodeDefinitions(
  (globalId) => {
    const { id, type } = fromGlobalId(globalId);
    switch (type) {
      case "User":
        return getUserOrThrow(id);
      case "Todo":
        return getTodo(id);
      default:
        return null;
    }
  },
  (obj): string | undefined => {
    if (obj instanceof User) return "User";
    else if (obj instanceof Todo) return "Todo";
  }
);
