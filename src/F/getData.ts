import axios from 'axios';
import { API_ROOT } from '../../constants';

async function getItemData(serviceName: string, query: string) {
  try {
    const url = `${API_ROOT}api/${serviceName}/${query}`;
    return await axios.get(url);
  } catch (err) {
    if (err) throw err;
  }
}

export { getItemData };
