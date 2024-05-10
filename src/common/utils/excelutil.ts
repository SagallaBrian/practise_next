import { WorkSheet, read, utils, writeFile } from "xlsx-js-style";

const jsonToExcel = (jsonData: any[], colHeaders: string[], title: string) => {
  // Convert Array of Objects into an array of array
  const dataAoa = jsonData.map((arrelem) => {
    return Object.values(arrelem);
  });
  dataAoa.unshift(colHeaders);

  const ws = utils.aoa_to_sheet(dataAoa);

  const headerStyle = {
    font: {
      bold: true,
    },
    border: {
      bottom: { style: "thin", color: "black" },
      right: { style: "thin", color: "black" },
      top: { style: "thin", color: "black" },
      left: { style: "thin", color: "black" },
    },
  };

  const borderStyles = {
    border: {
      bottom: { style: "thin", color: "black" },
      right: { style: "thin", color: "black" },
    },
  };

  ws["!cols"] = ws["!cols"] || [];
  const range = utils.decode_range(ws["!ref"]!);
  for (let C = range.s.c; C <= range.e.c; ++C) {
    let maxWidth = 0;
    for (let R = range.s.r; R <= range.e.r; ++R) {
      let cell_address = { c: C, r: R };
      let cell_ref = utils.encode_cell(cell_address);
      const cell = ws[cell_ref];

      if (cell && cell.v !== undefined && cell.v !== null) {
        const cellContentLength = String(cell.v).length + 4;
        if (cellContentLength > maxWidth) {
          maxWidth = cellContentLength;
        }
      }
      // if (R === 0) {
      //   ws[cell_ref].s = titleStyle;
      // }
      if (R === 0) {
        ws[cell_ref].s = headerStyle;
      } else {
        ws[cell_ref].s = borderStyles;
      }
    }
    ws["!cols"].push({ wch: maxWidth });
  }

  // Merge the first Row
  // ws["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: range.e.c } }];

  // create workbook
  const wb = utils.book_new();
  // append worksheet
  utils.book_append_sheet(wb, ws, "Sheet 1");
  /* export to XLSX */
  writeFile(wb, `${title}must.xlsx`);
};

const excelToJson = (jsData: any) => {
  const ws = utils.json_to_sheet(jsData);
  /* create workbook and append worksheet */
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, "Data");
  /* export to XLSX */
  writeFile(wb, "SheetJSReactAoO.xlsx");
};

export { jsonToExcel, excelToJson };
