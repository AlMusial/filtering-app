import axios from 'axios';
import React, { useState } from 'react';
export type rowDataHook = {
  data: any;
  error: any;
  loading: boolean;
  unfiltered: boolean;
  totalCount: number;
  fetchData(url: string): void;
};

let timeout: ReturnType<typeof setTimeout>;

export const useFetch = (initUrl: string): rowDataHook => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [unfiltered, setUnfiltered] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState<string>(initUrl);

  React.useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const isUnfiltered = !url.includes('&id=');
        const response = await axios.get(url);
        setData(response.data);
        setUnfiltered(isUnfiltered);
        if (response.data.total != null) setTotalCount(response.data.total);
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
        setUrl(initUrl);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [error]);

  const fetchData = (a: string) => setUrl(a);

  return { data, error, loading, unfiltered, totalCount, fetchData };
};
