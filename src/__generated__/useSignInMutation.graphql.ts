/**
 * @generated SignedSource<<4f6c42923d846aee9662e23ab7d15c5e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SignInInput = {
  username: string;
  password: string;
};
export type useSignInMutation$variables = {
  input?: SignInInput | null;
};
export type useSignInMutation$data = {
  readonly signIn: {
    readonly user: {
      readonly id: string;
    } | null;
  } | null;
};
export type useSignInMutation = {
  variables: useSignInMutation$variables;
  response: useSignInMutation$data;
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
    "concreteType": "SignInPayload",
    "kind": "LinkedField",
    "name": "signIn",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
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
    "name": "useSignInMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useSignInMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "bfdaafa9ec028c18a5a617fb042e4a63",
    "id": null,
    "metadata": {},
    "name": "useSignInMutation",
    "operationKind": "mutation",
    "text": "mutation useSignInMutation(\n  $input: SignInInput\n) {\n  signIn(input: $input) {\n    user {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "228b731265a0430d768319df23edd865";

export default node;
