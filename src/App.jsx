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
  }, [currpage, rowsPerPage]);
  // console.log(data, "data");

  const dummyTableData = data?.products?.map((prod) => ({
    title: {
      text: prod.title,
      link: 'ok.ok/ok',
      outerStyle: "bg-red-200",
      innerStyle: "!text-blue-400 hover:!underline",
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


  const actionMenu = [
    {
      text: 'Edit',
      onClick: () => alert('edit')
    },
    {
      text: 'Delete',
      onClick: () => alert('Delete')
    }
  ]

  console.log(data, 'data');


  
  const genericCardData = data?.products?.map(pr => ({
    heading: pr?.title,
    subheading: pr?.brand,
    secondaryText: pr?.description,
    image: pr?.images?.[0],
    badge: pr?.availabilityStatus == "In Stock" ? { label: "In Stock", color: "error" } : { label: "Out Of Stock", color: "error" },
    attachments: pr?.attachments || [],
    fields: [
      {
        label: "Return Policy",
        value: pr?.returnPolicy,
        // valueClass: pr?.emailNotifications ? "text-green-600" : "text-red-600",
      },
      {
        label: "Shipping",
        value: pr?.shippingInformation,
        valueClass: "text-red-600",
      },
      {
        label: "Stock",
        value: pr?.stock,
      },
      {
        label: "Warranty",
        value: pr?.warrantyInformation,
      },
      {
        label: "Price",
        value: pr?.price,
      },
      {
        label: "Discount",
        value: Math.ceil(Number(pr?.discountPercentage)),
      },
    ],
  }));

  console.log(genericCardData, 'nhi', data);





  return (
    <>
      <ReusableTable
        headers={header}
        tableData={dummyTableData}
        totalLength={data?.total}
        loading={loading}
        enableGlobalSearch={true}
        actionMenu={actionMenu}
        columnHide={true}
        tileCardData={genericCardData}
        filterDropdown={{
          label: "Status Filter",
          paramKey: "status",
          options: [
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
          ],
        }}
      />
    </>
  );
}

export default App;
