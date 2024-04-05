import axios from 'axios';
import React, { useState } from 'react';
export type rowDataHook = {
  data: any;
  error: any;
  loading: boolean;
  unfiltered: boolean;
  pagesCount: number;
  fetchData(url: string): void;
};

let timeout: ReturnType<typeof setTimeout>;

export const useFetch = (initUrl: string): rowDataHook => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [unfiltered, setUnfiltered] = useState(true);
  const [pagesCount, setPagesCount] = useState(1);

  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState<string>(initUrl);

  React.useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const isUnfiltered = !url.includes('?id=');
        const response = await axios.get(url);
        setData(response.data);
        setUnfiltered(isUnfiltered);
        setPagesCount(response.data.total_pages);
      } catch (err: any) {
        console.log('ERR:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  React.useEffect(() => {
    if (!!error) {
      timeout = setTimeout(() => {
        setError(null);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [error]);

  const fetchData = (a: string) => setUrl(a);

  return { data, error, loading, unfiltered, pagesCount, fetchData };
};
