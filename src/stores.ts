import { writable } from 'svelte/store';

interface QueriesStore {
  [key: string]: string;
}

export const queries = writable<QueriesStore>({});
