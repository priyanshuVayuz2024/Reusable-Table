import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ReusableTable from "./ReusableTable";
import { header } from "./utils";
import { useSearchParams } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const currpage = searchParams.get("page") || 0;
  const rowsPerPage = searchParams.get("pageSize") || 10;
  const [loading, setLoading] = useState(false);

  console.log(data, "data");

  const fetchProducts = async (limit = 10, skip = 0) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );
      const data = await response.json();
      // You get: products, total, limit, skip
      setLoading(false);
      return data;
    } catch (error) {
      console.error("Failed to fetch products:", error);
      return null;
    }
  };

  useEffect(() => {
    async function f() {
      const skip = currpage * rowsPerPage;
      const prod = await fetchProducts(rowsPerPage, skip);
      setData(prod);
    }
    f();
  }, [searchParams]);
  // console.log(data, "data");

  const dummyTableData = data?.products?.map((prod) => ({
    title: {
      text: prod.title,
    },
    brand: {
      text: prod.brand,
    },
    category: {
      text: prod.category,
    },
    price: {
      text: prod.price,
    },
    rating: {
      text: prod.rating,
    },
  }));
  console.log(dummyTableData, "dummytabledata");
  return (
    <>
      <ReusableTable
        headers={header}
        tableData={dummyTableData}
        totalLength={data?.total}
        loading={loading}
      />
    </>
  );
}

export default App;
