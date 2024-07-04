import dayjs from "dayjs";
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

function PopupsPage() {
  const [value, setValue] = useState({
    startDate: dayjs().subtract(30, "days").format("YYYY-MM-DD"),
    endDate: dayjs().endOf("month").format("YYYY-MM-DD"),
  });

  const handleValueChange = (newValue: any) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  return (
    <div>
      <Datepicker
        startFrom={new Date(dayjs().subtract(30, "days").format("YYYY-MM-DD"))}
        useRange={true}
        asSingle={false}
        placeholder={"Select Date"}
        value={value}
        separator={"~"}
        showShortcuts={true}
        showFooter={true}
        displayFormat={"DD/MM/YYYY"}
        // popoverDirection="up"
        // minDate={new Date("2023-01-05")}
        // maxDate={new Date("2023-01-30")}
        onChange={handleValueChange}
        configs={{
          shortcuts: {
            today: "TText",
            yesterday: "YText",
            past: (period) => `P-${period} Text`,
            currentMonth: "CMText",
            pastMonth: "PMText",
          },
          footer: { cancel: "CText", apply: "AText" },
        }}
      />
    </div>
  );
}

export default PopupsPage;
