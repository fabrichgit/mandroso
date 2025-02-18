import { useLocation } from 'react-router-dom';

function useSearch(query?: string) {
  const _ = new URLSearchParams(useLocation().search);
  if(query){
    return _.get(query)
  }
  return _
}

export default useSearch;