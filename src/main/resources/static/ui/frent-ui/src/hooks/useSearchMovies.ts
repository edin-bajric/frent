import { useEffect, useState } from "react";
import { MovieService } from "../services";

const useSearchMovies = (keyword: string) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await MovieService.searchMovies(keyword);
        setData(result);
      } catch (err) {
        setError("Error searching movies");
      } finally {
        setIsLoading(false);
      }
    };

    if (keyword) {
      fetchData();
    }

    return () => {
      setData(null);
      setError(null);
      setIsLoading(true);
    };
  }, [keyword]);

  return { data, error, isLoading };
};

export default useSearchMovies;
