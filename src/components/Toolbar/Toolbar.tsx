import styles from './Toolbar.module.css';
import { useDispatch } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce.tsx";
import { useEffect, useState } from "react";
import { filterProducts, sortProducts } from "../../store/productsSlice.ts";
import { useLocation, useNavigate } from "react-router-dom";

function Toolbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialQuery = new URLSearchParams(location.search).get("search") || "";
  const initialSort = new URLSearchParams(location.search).get("sort") || "No sorting";

  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState(initialSort);
  const debouncedSearch = useDebounce(query, 200);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = e.target.value;
    setSort(selectedSort);

    const params = new URLSearchParams(location.search);
    if (selectedSort === "No sorting") {
      params.delete("sort");
    } else {
      params.set("sort", selectedSort);
    }
    navigate(`?${params.toString()}`, { replace: true });

    const [by, order] = selectedSort.split(" ");
    if ((by === "price" || by === "date") && order) {
      dispatch(
        sortProducts({
                       by: by === "date" ? "Created" : "Price",
                       order: order === "ascending" ? "Ascending" : "Descending"
                     })
      );
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const searchParam = params.get("search");
    if (searchParam) {
      setQuery(searchParam);
      dispatch(filterProducts(searchParam));
    } else {
      setQuery("");
    }

    const sortParam = params.get("sort");
    if (sortParam) {
      setSort(sortParam); //
      const [by, order] = sortParam.split(" ");
      if ((by === "price" || by === "date") && order) {
        dispatch(
          sortProducts({
                         by: by === "date" ? "Created" : "Price",
                         order: order === "ascending" ? "Ascending" : "Descending"
                       })
        );
      }
    } else {
      setSort("No sorting");
    }
  }, [location.search]);

  useEffect(() => {
    dispatch(filterProducts(debouncedSearch));
    
    const params = new URLSearchParams(location.search);
    if (debouncedSearch !== "") {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }

    navigate(`?${params.toString()}`, { replace: true });
  }, [debouncedSearch]);

  return (
    <div className={styles.root}>
      <input value={query}
             onChange={(e) => setQuery(e.target.value)}
             placeholder="Search..."
      />
      <select className={styles.sortDropdown}
              onChange={handleSortChange}
              value={sort}>
        <option value="No sorting">No sorting</option>
        <option value="price ascending">Price Ascending</option>
        <option value="price descending">Price Descending</option>
        <option value="date ascending">Date Ascending</option>
        <option value="date descending">Date Descending</option>
      </select>
    </div>
  );
}

export default Toolbar;
