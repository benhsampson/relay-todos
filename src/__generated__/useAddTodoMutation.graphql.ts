/**
 * @generated SignedSource<<5d959d7ba9f77ea1c573c0fd700976ab>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AddTodoInput = {
  text: string;
  userId: string;
  clientMutationId?: string | null;
};
export type useAddTodoMutation$variables = {
  input: AddTodoInput;
};
export type useAddTodoMutation$data = {
  readonly addTodo: {
    readonly todoEdge: {
      readonly cursor: string;
      readonly node: {
        readonly id: string;
        readonly text: string;
        readonly complete: boolean;
      } | null;
    };
    readonly user: {
      readonly id: string;
      readonly totalCount: number;
    };
  } | null;
};
export type useAddTodoMutation = {
  variables: useAddTodoMutation$variables;
  response: useAddTodoMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "AddTodoPayload",
    "kind": "LinkedField",
    "name": "addTodo",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "TodoEdge",
        "kind": "LinkedField",
        "name": "todoEdge",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "cursor",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Todo",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "text",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "complete",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "totalCount",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useAddTodoMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useAddTodoMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "d964115387f098a404ee34503e1e03dd",
    "id": null,
    "metadata": {},
    "name": "useAddTodoMutation",
    "operationKind": "mutation",
    "text": "mutation useAddTodoMutation(\n  $input: AddTodoInput!\n) {\n  addTodo(input: $input) {\n    todoEdge {\n      cursor\n      node {\n        id\n        text\n        complete\n      }\n    }\n    user {\n      id\n      totalCount\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "72c5595510de05731645da61249e211b";

export default node;
