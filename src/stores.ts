import { writable } from 'svelte/store';

interface QueriesStore {
  [key: string]: string;
}

interface Item {
  [key: string]: string | number | Item[];
}

type LinkedList<T> = T & {
  [key: string]: LinkedList<T>;
};

export type AppData = LinkedList<Item>;

interface AppStore {
  data: { serviceName: string; res: AppData };
  active: boolean;
  loading: boolean;
  error: null | { status: number; statusText: string; data: unknown };
}

const queriesStore = writable<QueriesStore>({
  name: '',
  appid: '',
});

const servicesStore = writable<{ [key: string]: AppStore }>({
  gog: {
    data: { serviceName: '', res: {} },
    active: false,
    loading: false,
    error: null,
  },
});

const promisesStore = writable([])

export { queriesStore, servicesStore, promisesStore };
