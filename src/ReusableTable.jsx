import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Menu,
  MenuItem,
  IconButton,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Checkbox,
  ListItemText,
  TablePagination,
} from "@mui/material";

import {
  PushPin as PushPinIcon,
  MoreVert as MoreVertIcon,
  Tune as TuneIcon,
  ArrowDropDown as ArrowDropDownIcon,
  Search as SearchIcon,
  ViewModule as ViewModuleIcon,
  ViewList as ViewListIcon,
} from "@mui/icons-material";

import { useEffect, useRef, useState } from "react";
import { GenericCard } from "./GenericCard";
import { useNavigate, useSearchParams } from "react-router-dom";

const ReusableTable = ({
  headers,
  tableData,
  totalLength,
  loading,
  enableGlobalSearch = false,
  actionMenu,
  columnHide,
  filterDropdown,
  tileCardData,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = searchParams.get("page") || 0;
  const pageSize = searchParams.get("pageSize") || 10;
  const [currPage, setCurrPage] = useState(page);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);

  const [menuAnchorEls, setMenuAnchorEls] = useState({});
  const menuRefs = useRef({});

  const [globalSearch, setGlobalSearch] = useState(
    searchParams.get("globalSearch") || ""
  );

  const hiddenColumns = (searchParams.get("hiddenColumns") || "")
    .split(",")
    .filter(Boolean);

  const handleChangePage = (_, newPage) => {
    setCurrPage(newPage);
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
      const updatedParams = new URLSearchParams(prev);

      updatedParams.set("page", 0);
      updatedParams.set("pageSize", parseInt(event.target.value, 10));
      return updatedParams;
    });
  };

  const handleSort = (column) => {
    const currentSortBy = searchParams.get("sort_by");
    const currentDirection = searchParams.get("direction");
    let newDirection = "ASC";

    if (currentSortBy === column.sortKey) {
      newDirection = currentDirection === "ASC" ? "DESC" : "ASC";
    }

    const params = new URLSearchParams(window.location.search);
    params.set("sort_by", column.sortKey);
    params.set("direction", newDirection);
    setSearchParams(params.toString());
  };
  const defaultSearch = {};
  headers?.forEach((h) => {
    defaultSearch[h.sortKey] = searchParams.get(h.sortKey) || "";
  });

  const [searchTerms, setSearchTerms] = useState(defaultSearch);
  const handleSearchChange = (key) => (e) => {
    const value = e.target.value;
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

  const handleGlobalSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      const updatedParams = new URLSearchParams(searchParams);
      if (globalSearch.trim()) {
        updatedParams.set("globalSearch", globalSearch.trim());
      } else {
        updatedParams.delete("globalSearch");
      }
      setSearchParams(updatedParams);
      setCurrPage(0); // Reset to first page on search
    }
  };

  const handleMenuOpen = (event, rowIndex) => {
    setMenuAnchorEls((prev) => ({ ...prev, [rowIndex]: event.currentTarget }));
  };

  const handleMenuClose = (rowIndex) => {
    setMenuAnchorEls((prev) => {
      const newState = { ...prev };
      delete newState[rowIndex];
      return newState;
    });
  };

  const pinIndex = searchParams.get("pinIndex");

  const handlePinClick = (index) => {
    const updatedParams = new URLSearchParams(searchParams);
    if (pinIndex == index) {
      updatedParams.delete("pinIndex");
    } else {
      updatedParams.set("pinIndex", index);
    }
    setSearchParams(updatedParams);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.entries(menuRefs.current).forEach(([rowIndex, ref]) => {
        if (ref && !ref.contains(event.target)) {
          handleMenuClose(rowIndex);
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  let headerComp = headers?.map(
    (header, index) =>
      !hiddenColumns.includes(header.columnHideKey) && (
        <TableCell
          padding="none"
          className="!px-4 !py-2"
          key={index}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center">
              <span>{header?.title}</span>
              {header?.sortKey && (
                <button onClick={() => handleSort(header)}>
                  <ArrowDropDownIcon
                    className={`${
                      searchParams.get("sort_by") == header.sortKey &&
                      searchParams.get("direction") === "ASC"
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>
              )}
              {header?.pin && (
                <>
                  <PushPinIcon
                    onClick={() => handlePinClick(index)}
                    style={{
                      width: "15px",
                      color:
                        searchParams.get("pinIndex") == index
                          ? "green"
                          : "gray", // replace `someFlag` with your actual condition
                    }}
                    className="hover:cursor-pointer hover:!text-slate-700"
                  />
                </>
              )}
            </div>
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
      )
  );

  function moveToTop(arr, index) {
    if (index < 0 || index >= arr.length) return arr; // invalid index
    const item = arr[index];
    const newArr = [...arr]; // clone to avoid mutation
    newArr.splice(index, 1); // remove the item from its original position
    newArr.unshift(item); // insert it at the start
    return newArr;
  }

  const dropdownValue = searchParams.get(filterDropdown?.paramKey) || "";

  const handleDropdownChange = (value) => {
    const updatedParams = new URLSearchParams(searchParams);
    // const value = e.target.value;

    if (value) {
      updatedParams.set(filterDropdown.paramKey, value);
    } else {
      updatedParams.delete(filterDropdown.paramKey);
    }

    setSearchParams(updatedParams);
  };

  const viewParam = searchParams.get("view") || "table";
  useEffect(() => {
    if (!searchParams.get("view")) {
      const updatedParams = new URLSearchParams(searchParams);
      updatedParams.set("view", "table");
      setSearchParams(updatedParams);
    }
  }, []);

  if (pinIndex) {
    headerComp = moveToTop(headerComp, parseInt(pinIndex));
  }

  let dataComp = (data) => {
    let temp = Object.entries(data).map(([key, cell], index) => {
      return (
        !(
          headers[index]?.columnHideKey &&
          hiddenColumns?.includes(headers[index]?.columnHideKey)
        ) && (
          <TableCell key={index} className={`${cell?.outerStyle} whitespace-nowrap`}>
            {cell?.text ? (
              cell?.link ? (
                <button
                  onClick={() => navigate(cell?.link)}
                  className={cell?.innerStyle}
                >
                  {cell?.text}
                </button>
              ) : (
                // <Link to={cell?.link} className={cell?.innerStyle}>
                //   {cell?.text}
                // </Link>
                cell?.text
              )
            ) : cell?.content ? (
              cell?.content
            ) : null}
          </TableCell>
        )
      );
    });
    if (pinIndex) {
      temp = moveToTop(temp, pinIndex);
    }
    return temp;
  };

  return (
    <div className="bg-[#FAFAFA]">
      <div className="py-4 border-t flex gap-4 flex-wrap">
        {filterDropdown?.options?.map((item) => (
          <div
            key={item.label}
            className="min-w-[200px] cursor-pointer flex flex-col gap-2 px-4 py-2 bg-white border border-[#E3E3E3] rounded-lg hover:shadow transition-all"
            onClick={() => handleDropdownChange(item.value)}
          >
            <div>
              <div className="text-sm text-gray-500">{item.label}</div>
            </div>
            {item.count && (
              <div className="text-2xl font-bold">
                {item?.count?.toString().padStart(2, "0")}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="py-4 border-t-2 rounded-t-lg border-[#8201BB] flex flex-wrap items-center justify-end gap-4">
        {enableGlobalSearch && (
          <TextField
            label="Search All"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            onKeyDown={handleGlobalSearchKeyDown}
            size="small"
          />
        )}

        {true && (
          <div>
            <Button
              onClick={() => {
                const updatedParams = new URLSearchParams(searchParams);
                updatedParams.set("view", "table");
                setSearchParams(updatedParams);
              }}
              // variant={searchParams.get("view") == "table" && "contained"}
            >
              <ViewListIcon />
              <Typography>List</Typography>
            </Button>
            <Button
              onClick={() => {
                const updatedParams = new URLSearchParams(searchParams);
                updatedParams.set("view", "tile");
                setSearchParams(updatedParams);
              }}
            >
              <ViewModuleIcon />
              <Typography>Grid</Typography>
            </Button>
          </div>
        )}
        <Button
          className="h-fit"
          variant="outlined"
          startIcon={<TuneIcon />}
          // onClick={handleClick}
        >
          Filters
        </Button>
        {columnHide && viewParam === "table" && (
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="column-visibility-label">Columns</InputLabel>
            <Select
              labelId="column-visibility-label"
              multiple
              value={headers
                .filter(
                  (hd) =>
                    hd.columnHideKey &&
                    !hiddenColumns.includes(hd.columnHideKey)
                )
                .map((hd) => hd.columnHideKey)}
              onChange={(event) => {
                const selected = event.target.value;
                const allKeys = headers
                  .filter((hd) => hd.columnHideKey)
                  .map((hd) => hd.columnHideKey);

                const newHidden = allKeys.filter(
                  (key) => !selected.includes(key)
                );

                const params = new URLSearchParams(searchParams);
                if (newHidden.length > 0) {
                  params.set("hiddenColumns", newHidden.join(","));
                } else {
                  params.delete("hiddenColumns");
                }
                setSearchParams(params);
              }}
              input={<OutlinedInput label="Columns" />}
              renderValue={(selected) =>
                headers
                  .filter((hd) => selected.includes(hd.columnHideKey))
                  .map((hd) => hd.title)
                  .join(", ")
              }
            >
              {headers
                .filter((hd) => hd.columnHideKey)
                .map((hd) => (
                  <MenuItem key={hd.columnHideKey} value={hd.columnHideKey}>
                    <Checkbox
                      checked={!hiddenColumns.includes(hd.columnHideKey)}
                    />
                    <ListItemText primary={hd.title} />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        )}
      </div>
      {viewParam === "table" ? (
        <TableContainer>
          <Table className="">
            <TableHead
              className="bg-[#D9D9D9] !text-[#121212]"
              sx={{ borderRadius: 10 }}
            >
              <TableRow>
                {headerComp}
                {actionMenu && (
                  <TableCell className="!px-4 !py-2 " padding="none">
                    Action
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody className="bg-white">
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={headers.length + (actionMenu ? 1 : 0)}
                    align="center"
                  >
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                tableData?.map((data, index) => (
                  <TableRow key={index}>
                    {dataComp(data)}
                    {actionMenu && (
                      <TableCell>
                        <MoreVertIcon
                          style={{ cursor: "pointer" }}
                          onClick={(e) => handleMenuOpen(e, index)}
                        />
                        <Menu
                          anchorEl={menuAnchorEls[index]}
                          open={Boolean(menuAnchorEls[index])}
                          onClose={() => handleMenuClose(index)}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          slotProps={{
                            list: { autoFocusItem: false },
                          }}
                        >
                          {actionMenu.map((ac, i) => (
                            <MenuItem key={i} onClick={ac?.onClick}>
                              {ac?.text}
                            </MenuItem>
                          ))}
                        </Menu>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tileCardData?.map((data) => (
            <GenericCard data={data} />
          ))}
        </div>
      )}
      <TablePagination
        component={"div"}
        count={totalLength || 0}
        page={currPage}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        labelRowsPerPage={
          viewParam === "tile" ? "Cards per page" : "Rows per page"
        }
      ></TablePagination>
    </div>
  );
};

export default ReusableTable;
