import { useState, useEffect } from "react";
import axios from "axios";
const useAxios = props => {
  const [url, dependencies] = props;
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({});
  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then(res => res.data)
      .then(data => {
        setLoading(false);
        setData(data);
      })
      .catch(err => {
        setData(err);
      });
  }, [...dependencies]);
  return [isLoading, data];
};
export default useAxios;
