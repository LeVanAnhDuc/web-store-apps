"use client";

// libs
import { useEffect, useRef } from "react";
// types
import type { DependencyList, EffectCallback } from "react";

const useUpdateEffect = (callback: EffectCallback, deps?: DependencyList) => {
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    return callback();
  }, deps);
};

export default useUpdateEffect;
