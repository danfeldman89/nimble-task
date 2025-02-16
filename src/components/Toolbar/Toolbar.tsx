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

  const [query, setQuery] = useState(new URLSearchParams(location.search).get("search") || "");
  const debouncedSearch = useDebounce(query, 200);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value;
    const params = new URLSearchParams(location.search);

    if (sort === "No sorting") {
      params.delete("sort");
    } else {
      params.set("sort", sort);
    }
    navigate(`?${params.toString()}`, { replace: true });

    const [by, order] = sort.split(" ");
    if ((by === "price" || by === "date") && order) {
      dispatch(sortProducts({ by: by === "date" ? "Created" : "Price", order: order === "ascending" ? "Ascending" : "Descending" }));
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
      const [by, order] = sortParam.split(" ");
      if ((by === "price" || by === "date") && order) {
        dispatch(sortProducts({ by: by === "date" ? "Created" : "Price", order: order === "ascending" ? "Ascending" : "Descending" }));
      }
    } else {
    }
  }, [location.search]);

  useEffect(() => {
    dispatch(filterProducts(debouncedSearch));
  }, [debouncedSearch]);

  return (
    <div className={styles.root}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <select className={styles.sortDropdown} onChange={handleSortChange} defaultValue="No Sorting">
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
