import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const ReusableTable = ({ headers, tableData, totalLength, loading }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 0;
  const pageSize = searchParams.get("pageSize") || 10;
  const [currPage, setCurrPage] = useState(page);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);
  const [sorting, setSorting] = useState({
    sort_by: "",
    direction: "ASC",
  });

  const handleChangePage = (_, newPage) => {
    setCurrPage(newPage);
    console.log(newPage, "newpage");
    setSearchParams((prev) => {
      const updatedParams = new URLSearchParams(prev); // Clone existing search params

      updatedParams.set("page", newPage);
      updatedParams.set("pageSize", rowsPerPage);
      return updatedParams;
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrPage(0);
    setSearchParams((prev) => {
      const updatedParams = new URLSearchParams(prev); // Clone existing search params

      updatedParams.set("page", 0);
      updatedParams.set("pageSize", parseInt(event.target.value, 10));
      return updatedParams;
    });
  };

  const handleSort = (column) => {
    let newDirection = "ASC";

    if (sorting.sort_by === column.sortKey) {
      newDirection = sorting.direction === "ASC" ? "DESC" : "ASC";
    }
    setSorting({
      sort_by: column.sortKey,
      direction: newDirection,
    });

    const params = new URLSearchParams(window.location.search);
    params.set("sort_by", column.sortKey),
      params.set("direction", newDirection);
    setSearchParams(params.toString());
  };

  const defaultSearch = headers.reduce((acc, h) => {
    console.log(acc, "acc from default search");
    console.log(h, "h from default searchs");
    acc[h.sortKey] = searchParams.get(h.sortKey) || "";
    return acc;
  }, {});

  const [searchTerms, setSearchTerms] = useState(defaultSearch);
  console.log(searchTerms, "searchTerms");
  const handleSearchChange = (key) => (e) => {
    const value = e.target.value;
    console.log(key, "key");
    console.log(value, "value");
    const newSearch = {
      ...searchTerms,
      [key]: value,
    };
    setSearchTerms(newSearch);

    // Update URL
    const updatedParams = new URLSearchParams(searchParams);
    if (value) {
      updatedParams.set(key, value);
    } else {
      updatedParams.delete(key);
    }
    setSearchParams(updatedParams);
  };

  return (
    <>
      {loading ? (
        "Loading"
      ) : (
        <>
          {" "}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {headers?.map((header, index) => (
                    <TableCell key={index}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center justify-center">
                          <span>{header?.title}</span>
                          {header?.sortKey && (
                            <button onClick={() => handleSort(header)}>
                              <ArrowDropDownIcon
                                className={`${
                                  sorting.sort_by === header.sortKey &&
                                  sorting.direction === "ASC"
                                    ? "rotate-180"
                                    : ""
                                }`}
                              />
                            </button>
                          )}
                        </div>
                        {header?.action && <MoreVertIcon />}
                      </div>
                      {header?.isSearchAble && (
                        <TextField
                          placeholder={`Search ${header?.title}`}
                          value={searchTerms[header?.sortKey] || ""}
                          onChange={(e) =>
                            setSearchTerms({
                              ...searchTerms,
                              [header?.sortKey]: e.target.value,
                            })
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleSearchChange(header?.sortKey)(e);
                            }
                          }}
                          size="small"
                        />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData?.map((data, index) => (
                  <TableRow>
                    {Object.entries(data).map(([key, cell], index) => (
                      <>
                        {console.log(data, "data")}
                        {console.log(cell, "cell")}
                        <TableCell key={index}>{cell.text}</TableCell>
                      </>
                    ))}
                  </TableRow>
                ))}
                <TableRow></TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component={"div"}
            count={totalLength}
            page={currPage}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          ></TablePagination>
        </>
      )}
    </>
  );
};

export default ReusableTable;
