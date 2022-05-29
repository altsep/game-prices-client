import axios from 'axios';
import { API_ROOT } from './constants';
import type { AppData } from './stores';

async function getSteamAppData(id: string | number, filters?: string) {
  try {
    const url = `${API_ROOT}api/steamappdetails/${id}/?filters=${
      filters || ''
    }`;
    const res: { data: AppData } = await axios.get(url);
    if (res.data.type === 'game') return res.data;
    throw new Error('Not a game');
  } catch (err) {
    if (err) throw err;
  }
}

interface GogEntry {
  [key: string]: string;
}
type LinkedList<T> = T & {
  [key: string]: LinkedList<T>;
};
type GogPrice = LinkedList<GogEntry>;

async function getGogProductPrice(query: string) {
  try {
    const url = `${API_ROOT}api/gogproducts/${query}`;
    const res: { data: GogPrice } = await axios.get(url);
    return res.data;
  } catch (err) {
    if (err) throw err;
  }
}

export { getSteamAppData, getGogProductPrice };
