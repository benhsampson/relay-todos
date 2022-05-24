/**
 * @generated SignedSource<<957dcbfa4d5eab4665616b1b7378e969>>
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
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "b6d37c85573cac697d1f6fbfcb4846ad";

export default node;
