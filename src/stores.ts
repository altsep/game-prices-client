import { writable } from 'svelte/store';

interface QueriesStore {
  [key: string]: string;
}

const queriesStore = writable<QueriesStore>({
  name: '',
});

export { queriesStore };
