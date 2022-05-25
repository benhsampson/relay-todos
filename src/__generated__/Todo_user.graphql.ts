/**
 * @generated SignedSource<<7d1bebc427f18db8b609c21a5f2aec71>>
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
  readonly userDbId: string;
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
      "name": "userDbId",
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

(node as any).hash = "f400ce7f8a9b5a7d5f8f578f3580d4f8";

export default node;
