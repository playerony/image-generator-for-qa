import type { QRL } from "@builder.io/qwik";
import { $, useTask$, useStore } from "@builder.io/qwik";

export const useLocalStorage = <T>(key: string, initialState: T): [{ value: T }, QRL<(value: T) => void>] => {
  const store = useStore<{ value: T }>({ value: initialState });

  useTask$(() => {
    if (typeof window !== "undefined") {
      try {
        const item = window.localStorage.getItem(key);
        store.value = item ? JSON.parse(item) : initialState;
      } catch (error) {
        console.log(error);
        store.value = initialState;
      }
    }
  });

  const setValue$ = $((value: T) => {
    try {
      store.value = value;
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.log(error);
    }
  });

  return [store, setValue$];
}