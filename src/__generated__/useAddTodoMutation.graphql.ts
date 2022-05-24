/**
 * @generated SignedSource<<c1a5188806ffa040b92c11db3e3a5d53>>
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
      readonly node: {
        readonly id: string;
        readonly text: string;
        readonly complete: boolean;
      } | null;
      readonly cursor: string;
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
v1 = [
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
            "concreteType": "Todo",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              },
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "cursor",
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
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useAddTodoMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d6e15cd24240224bf29927f3f47cf1a7",
    "id": null,
    "metadata": {},
    "name": "useAddTodoMutation",
    "operationKind": "mutation",
    "text": "mutation useAddTodoMutation(\n  $input: AddTodoInput!\n) {\n  addTodo(input: $input) {\n    todoEdge {\n      node {\n        id\n        text\n        complete\n      }\n      cursor\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "878091e00c672a79812e2ff62bcb947f";

export default node;
