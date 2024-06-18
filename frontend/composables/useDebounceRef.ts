import { customRef } from 'vue';

export function useDebouncedRef(value: unknown, delay = 500) {
  let timeout: NodeJS.Timeout | string | number | undefined;
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          value = newValue;
          trigger();
        }, delay);
      },
    };
  });
}
