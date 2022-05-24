/**
 * @generated SignedSource<<a3eaa153d25df73841b1bfd18e15a970>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TodoList_user$data = {
  readonly todos: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"Todo_todo">;
      } | null;
    } | null> | null;
  } | null;
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"Todo_user">;
  readonly " $fragmentType": "TodoList_user";
};
export type TodoList_user$key = {
  readonly " $data"?: TodoList_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"TodoList_user">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": null,
        "cursor": null,
        "direction": "forward",
        "path": [
          "todos"
        ]
      }
    ]
  },
  "name": "TodoList_user",
  "selections": [
    {
      "alias": "todos",
      "args": null,
      "concreteType": "TodoConnection",
      "kind": "LinkedField",
      "name": "__TodoList_todos_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "TodoEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Todo",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "Todo_todo"
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
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
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Todo_user"
    }
  ],
  "type": "User",
  "abstractKey": null
};
})();

(node as any).hash = "1ea54d2b554189e4ff99a3b3d0aacb01";

export default node;
