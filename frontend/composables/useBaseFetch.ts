export const useBaseFetch: typeof useFetch = (request, opts?) => {
  const config = useRuntimeConfig();
  
  return useFetch(request, { baseURL: config.baseURL as string, ...opts });
};
