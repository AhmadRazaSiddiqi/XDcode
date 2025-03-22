import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = (url, method = "GET", body = null, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios({
          url,
          method,
          data: body, // For POST, PUT, DELETE requests
        });
        setData(response.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    fetchData();
  }, dependencies); // Re-run if dependencies change

  return { data, loading, error };
};

export default useAxios;
