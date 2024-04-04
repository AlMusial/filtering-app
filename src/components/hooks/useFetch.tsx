import axios from 'axios';
import React, { useState } from 'react';
export type rowDataHook = {
  data: any;
  error: any;
  loading: boolean;
};

let timeout: ReturnType<typeof setTimeout>;

export const useFetch = (url: string): rowDataHook => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await axios.get(url);
        setData(response.data);
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

  return { data, error, loading };
};
