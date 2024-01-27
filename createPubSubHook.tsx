import { useLayoutEffect, useState } from "react";
import createPubSub from "./createPubSub";

type PubSubHook<T> = () => [T, (value: T) => void];

// It still needs to handle the previous value
export default function createPubSubHook<T>(initialValue: T): PubSubHook<T> {
  const subs = createPubSub<T>();

  return function () {
    const [value, setValue] = useState<T>(initialValue);

    useLayoutEffect(() => {
      const unsub = subs.sub(setValue);

      return () => {
        unsub();
      };
    }, []);

    return [
      value,
      (v: T) => {
        subs.pub(v);
      },
    ];
  };
}
