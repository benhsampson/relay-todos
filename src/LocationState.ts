import { Location } from "react-router-dom";

export type LocationState =
  | {
      from?: Location;
    }
  | undefined;
