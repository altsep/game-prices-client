import axios from 'axios';
import { API_ROOT } from '../../constants';
import type { AppData } from '../stores';

async function getItemData(serviceName: string, query: string) {
  try {
    const url = `${API_ROOT}api/${serviceName}/${query}`;
    const res = await axios.get(url);
    return res.data as AppData;
  } catch (err) {
    if (err) throw err;
  }
}

export { getItemData };
