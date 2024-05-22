import { useGetNewsScroll } from "@/api/hooks/news";
import Box from "@mui/material/Box";
import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";
import { NewsAddButton } from "./components";

function NewsPage() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetNewsScroll();

  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Title",
      filterable: true,
    },
  ];
  return (
    <div>
      <h4>Newspage</h4>
      <NewsAddButton />
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGridPro
          columns={columns}
          rows={data?.pages.flatMap((itm) => itm.news) || []}
          getRowId={(row) => row.uuid}
          hideFooter
        />
      </Box>
    </div>
  );
}

export default NewsPage;
