/**
 * @generated SignedSource<<867eacedc11eff74072c79019ddd2155>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Todo_todo$data = {
  readonly id: string;
  readonly text: string;
  readonly complete: boolean;
  readonly " $fragmentType": "Todo_todo";
};
export type Todo_todo$key = {
  readonly " $data"?: Todo_todo$data;
  readonly " $fragmentSpreads": FragmentRefs<"Todo_todo">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Todo_todo",
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
  "type": "Todo",
  "abstractKey": null
};

(node as any).hash = "9688ea4ed5397f08547476ec6b95d8d9";

export default node;
