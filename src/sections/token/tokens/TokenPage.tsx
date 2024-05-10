import Box from "@mui/material/Box";
import {
  DataGridPro,
  GridColDef,
  GridRowSelectionModel,
  gridClasses,
  GridToolbar,
  GridFilterModel,
} from "@mui/x-data-grid-pro";

import { useGetTokensScroll } from "@/api/hooks/tokens";
import { Avatar, Button, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { jsonToExcel } from "@/common/utils/excelutil";
import { AddToken } from "./AddToken";

function TokenPage() {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const [rowSelectionModel, setRowSelectionModel] =
    useState<GridRowSelectionModel>([]);

  const [queryOptions, setQueryOptions] = useState({});

  const onFilterChange = useCallback((filterModel: GridFilterModel) => {
    console.log(filterModel);
    setQueryOptions({ filterModel: { ...filterModel } });
  }, []);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetTokensScroll();

  const handleScrollEnd = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 250,
      filterable: true,
      renderCell: ({ row }) => {
        return (
          <span className="flex items-center gap-2">
            <Avatar src={row.logo} />
            <Typography noWrap variant="body2" component={"span"}>
              {row.name}
            </Typography>
          </span>
        );
      },
    },
    {
      field: "address",
      headerName: "Address",
      width: 150,
      renderCell: ({ row }) => {
        return (
          <Typography noWrap variant="body2" component={"span"}>
            {row.address}
          </Typography>
        );
      },
    },
    {
      field: "total_tokens",
      headerName: "Total Token",
      width: 150,
      type: "number",
      valueGetter: (value) => value && parseInt(value),

      renderCell({ row }) {
        return (
          <div>
            {row.total_tokens.toLocaleString(navigator.language, {
              minimumFractionDigits: 0,
            })}
          </div>
        );
      },
    },
    {
      field: "onChain",
      headerName: "Is Onchain",
      type: "boolean",
      width: 150,
      renderCell: ({ row }) => <div>{row.onChain ? "Yes" : "No"} </div>,
    },
    {
      field: "swappable",
      headerName: "Is Swappable",
      type: "boolean",
      width: 150,
      renderCell: ({ row, value }) => (
        <div>
          {row.swappable ? "Yes" : "No"} {value}{" "}
        </div>
      ),
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      type: "date",
      valueGetter: (value) => value && new Date(value),
      width: 150,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      type: "date",
      valueGetter: (value) => value && new Date(value),
      width: 150,
    },
    {
      field: "isApproved",
      headerName: "is Approved",
      type: "boolean",
      width: 100,
      renderCell({ row }) {
        if (row.isApproved) {
          return (
            <div className="bg-green-200 text-green-600 py-1.5 px-3.5 rounded-md font-medium">
              Approved
            </div>
          );
        } else {
          return (
            <div className="bg-red-200 text-red-600 py-1.5 px-3.5 rounded-md font-medium">
              Not Approved
            </div>
          );
        }
      },
    },
  ];

  return (
    <div className=" p-2 overflow-scroll">
      <h4>Tokens user</h4>
      <div className="py-3">
        {/* <Button
          variant="contained"
          onClick={() =>
            jsonToExcel(
              data
                ? data.pages
                    .flatMap((page) => page.allTokensData)
                    .map(
                      ({
                        name,
                        address,
                        total_tokens,
                        onChain,
                        swappable,
                        updatedAt,
                        createdAt,
                      }) => ({
                        name,
                        address,
                        total_tokens,
                        onChain,
                        swappable,
                        updatedAt,
                        createdAt,
                      })
                    )
                : [],
              [
                "Name",
                "Address",
                "Total Tokens",
                "Is Onchain",
                "Is Swappable",
                "Updated At",
                "Created Ats",
              ],
              "Tokens Page"
            )
          }
        >
          Download
        </Button> */}

        <AddToken />
      </div>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGridPro
          loading={isLoading || isFetchingNextPage}
          columns={columns}
          rows={data ? data.pages.flatMap((page) => page.allTokensData) : []}
          getRowId={(row) => row?.name}
          style={{ width: "100%" }}
          pageSizeOptions={[5, 10, 25]}
          // paginationModel={paginationModel}
          // onPaginationModelChange={(paginationModel) => {
          //   setPaginationModel(paginationModel);
          // }}
          // pagination
          // paginationMode="server"
          hideFooter
          checkboxSelection
          onRowsScrollEnd={handleScrollEnd}
          rowCount={
            data && data.pages?.length > 0 ? data.pages[0].nbTotalElements : 0
          }
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          slots={{ toolbar: GridToolbar }}
          // slotProps={{
          //   toolbar: {
          //     showQuickFilter: true,
          //   },
          // }}
          // filterMode="server"
          onFilterModelChange={onFilterChange}
          sx={{
            [`& .${gridClasses.menuIcon}`]: {},

            "& .MuiButtonBase-root": {
              fontSize: "0.7rem",
              fontWeight: "550",
            },

            "& .MuiDataGrid-row:hover": {
              color: "primary.main",
            },
            "& .MuiDataGrid-row:nth-of-type(odd)": {
              backgroundColor: "#F9FAFB",
            },
            "& .MuiDataGrid-columnHeader": {
              color: "lightslategray",
              borderBottom: "1px solid lightgray",
            },
            "& .MuiDataGrid-columnHeader:focus": {
              color: "lightslategray",
              outline: "none",
            },
            "& .MuiDataGrid-cell": {
              display: "flex", // Set display to flex
              alignItems: "center", // Vertically align items to center
            },
          }}
        />
      </Box>
    </div>
  );
}

export default TokenPage;
