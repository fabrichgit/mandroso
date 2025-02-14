import { useLocation } from 'react-router-dom';

function useQuery<T = string | null>(query: string) {
  const _ = new URLSearchParams(useLocation().search);
  return _.get(query) as T
}

export default useQuery;