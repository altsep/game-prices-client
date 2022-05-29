import { writable, readable } from 'svelte/store';

interface QueriesStore {
  [key: string]: string;
}

interface AppDataEntry {
  [key: string]: string | number;
}
interface AppDataArr {
  [key: string]: ArrayLike<{ [key: string]: string | number }>;
}
interface Props {
  screenshots?: Array<{
    id: number;
    path_thumbnail: string;
    path_full: string;
  }>;
  metacritic?: { score: number; url: string };
}
type LinkedList<T> = T & {
  [key: string]: LinkedList<T>;
};
export type AppData = LinkedList<AppDataEntry> & Props & AppDataArr;
interface AppStore {
  data: AppData;
  active: boolean;
  loading: boolean;
  error: null | unknown;
}

const queriesStore = writable<QueriesStore>({
  name: '',
  appid: '',
});

const appStore = writable<AppStore>({
  data: {},
  active: false,
  loading: false,
  error: null,
});

// const theme = readable<{ [key: string]: string }>({
//   system: 'font-mono italic text-sm text-slate-500 p-4',
// });

export { queriesStore, appStore };
