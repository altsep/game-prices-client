import { getApiData } from './getApiData';

export default function getAllProducts(
  name: string,
  services: string[],
  module: string
) {
  if (name) {
    return services.map(async (service) => {
      try {
        const res = await getApiData(service, module, name);
        return { serviceName: service, res };
      } catch (err: unknown) {
        if (err) throw err;
      }
    });
  }
}
