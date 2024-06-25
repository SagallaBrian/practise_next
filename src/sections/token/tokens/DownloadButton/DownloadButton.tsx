import { GetAllTokensResp } from "@/api/hooks/tokens/types";
import { jsonToExcel } from "@/common/utils/excelutil";
import Button from "@mui/material/Button";
import { InfiniteData } from "@tanstack/react-query";
import React from "react";

function DownloadButton({ data }: { data: InfiniteData<GetAllTokensResp> }) {
  return (
    <Button
      variant="contained"
      onClick={() =>
        jsonToExcel(
          data
            ? data.pages
                .flatMap((page) => page.allTokensData)
                .map(({ name, address, updatedAt, createdAt }) => ({
                  name,
                  address,
                  updatedAt,
                  createdAt,
                }))
            : [],
          ["Name", "Address", "Updated At", "Created Ats"],
          "Tokens Page"
        )
      }
    >
      Download
    </Button>
  );
}

export default DownloadButton;
