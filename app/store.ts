import { useEffect } from "react";
import { create } from "zustand";

import { useLocalStorage } from "@/hooks/use-local-storage";

// Define the store state type
interface CounterState {
  counter: number;
  increment: () => void;
  reset: () => void;
  setCounter: (counter: number) => void;
}

// Create the store with proper typing
export const useCounterStoreRaw = create<CounterState>((set) => ({
  counter: 0,
  increment: () => set((state) => ({ counter: state.counter + 1 })),
  reset: () => set({ counter: 0 }),
  setCounter: (counter: number) => set({ counter }),
}));

export function useCounterStore({ persist = false }: { persist?: boolean }) {
  const { counter, setCounter, ...rest } = useCounterStoreRaw();
  const [storedCounter, setStoredCounter, isLoading] = useLocalStorage<number>(
    "counter",
    0
  );

  // subscribe zustand to save new changes
  useEffect(() => {
    return useCounterStoreRaw.subscribe((state, previousState) => {
      if (state.counter !== previousState.counter) {
        // TODO add save function with debounce
        setStoredCounter(state.counter);
      }
    });
  }, []);

  // Load from localStorage when component mounts (only once)
  useEffect(() => {
    if (!persist || isLoading || storedCounter === undefined) {
      return;
    }

    setCounter(storedCounter);
  }, [isLoading]);

  return {
    ...rest,
    counter,
    isLoading: persist ? isLoading : false,
  };
}
