import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LocationState } from "./LocationState";

const useGoToFrom = (routeFallback = "/") => {
  const navigate = useNavigate();
  const location = useLocation();

  return [
    useCallback(
      () =>
        navigate(
          (location.state as LocationState)?.from?.pathname || routeFallback,
          { replace: true }
        ),
      [navigate, location.state, routeFallback]
    ),
  ];
};

export default useGoToFrom;
