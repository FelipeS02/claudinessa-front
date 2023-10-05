import useSwr from 'swr';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const useProduct = (id) => {
  const { data, error, isLoading } = useSwr(
    `https://localhost:7209/api/Products/GetProduct/${id}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    product: data,
    isError: error,
    isLoading,
  };
};
