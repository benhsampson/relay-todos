/**
 * @generated SignedSource<<10876322f47a28352c01a742b071321c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Todo_user$data = {
  readonly id: string;
  readonly completedCount: number;
  readonly " $fragmentType": "Todo_user";
};
export type Todo_user$key = {
  readonly " $data"?: Todo_user$data;
  readonly " $fragmentSpreads": FragmentRefs<"Todo_user">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Todo_user",
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
      "name": "completedCount",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "19baf1200f9ad16a61d73240bdea320b";

export default node;
