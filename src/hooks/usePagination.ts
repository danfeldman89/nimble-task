import { useEffect, useState } from "react";

export function usePagination<T>(items: T[], itemsPerPage: number, defaultPage: number = 1):
  [currentPage: number, (page: number) => void] {
  const [innerPage, setInnerPage] = useState(defaultPage);

  useEffect(() => {
    const ceil = Math.max(Math.ceil(items.length / itemsPerPage), 1);
    if (ceil < innerPage) {
      setInnerPage(innerPage - 1);
    }
  }, [items]);

  const setPage = (requested: number) => {
    const ceil = Math.max(Math.ceil(items.length / itemsPerPage), 1);

    if (requested < 1) {
      setInnerPage(1);
      return;
    }

    if (requested > ceil) {
      setInnerPage(ceil);
      return;
    }

    setInnerPage(requested);
  };

  return [innerPage, setPage];
}
