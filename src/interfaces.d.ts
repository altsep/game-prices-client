import type { AxiosResponse } from 'axios';

interface Product {
  id: string;
  name: string;
  length: number;
}

interface Service {
  serviceName: string;
  res: AxiosResponse<Product[]>;
}
