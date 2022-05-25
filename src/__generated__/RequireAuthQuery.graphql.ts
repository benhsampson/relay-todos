/**
 * @generated SignedSource<<958bc8befaeac29aafbd7ec3c9c650ff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type RequireAuthQuery$variables = {};
export type RequireAuthQuery$data = {
  readonly authenticated: boolean;
};
export type RequireAuthQuery = {
  variables: RequireAuthQuery$variables;
  response: RequireAuthQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "authenticated",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RequireAuthQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "RequireAuthQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "bb59c352b5623fe4b6b99c0e6cb1ef44",
    "id": null,
    "metadata": {},
    "name": "RequireAuthQuery",
    "operationKind": "query",
    "text": "query RequireAuthQuery {\n  authenticated\n}\n"
  }
};
})();

(node as any).hash = "029f70f1b50cb2e83791609c4514ea3f";

export default node;
