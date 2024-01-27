type Subs<T> = Set<(message: T) => void>;

type Subscribe<T> = (message: T) => void;

type Unsubscribe = () => void;

export default function createPubSub<T>() {
  const subscribers: Subs<T> = new Set();

  return {
    sub(callback: Subscribe<T>): Unsubscribe {
      subscribers.add(callback);
      return () => {
        subscribers.delete(callback);
      };
    },
    pub(message: T): void {
      subscribers.forEach((subCallback) => subCallback(message));
    },
  };
}
