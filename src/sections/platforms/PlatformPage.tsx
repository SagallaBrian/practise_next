import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik } from "formik";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { DateValidationError } from "@mui/x-date-pickers/models";
import * as Yup from "yup";

function PlatformPage() {
  const [error, setError] = useState<DateValidationError | null>(null);

  const errorMessage = useMemo(() => {
    switch (error) {
      case "maxDate":
      case "minDate": {
        return "Please select a date in the first quarter of 2022";
      }

      case "invalidDate": {
        return "Your date is not valid";
      }

      default: {
        return "";
      }
    }
  }, [error]);
  const courses = [
    {
      name: "Course A",
      value: "coursea",
    },
    {
      name: "Course B",
      value: "courseb",
    },
    {
      name: "Course C",
      value: "coursec",
    },
  ];

  const validationSchema = Yup.object({
    username: Yup.string().required("User Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    // start_date: Yup.date()
    //   .nullable()
    //   .required("Start date is required")
    //   .typeError("Invalid date"),
    // end_date: Yup.date()
    //   .nullable()
    //   .required("End date is required")
    //   .typeError("Invalid date")
    //   .test(
    //     "end_date-after-start_date",
    //     "End date must be later than start date",
    //     function (value) {
    //       const { start_date } = this.parent;
    //       return !start_date || !value || value > start_date;
    //     }
    //   ),
    course: Yup.string().required("Course is required"),
    // password: Yup.string().required("Password is required"),
    // confirmpassword: Yup.string()
    //   .oneOf([Yup.ref("password"), ""], "Passwords must match")
    //   .required("Confirm Password is required"),
    // description: Yup.string(),
    // agree_terms: Yup.boolean()
    //   .oneOf([true], "You must accept the terms and conditions")
    //   .required("You must accept the terms and conditions"),
  });

  const formiks = useFormik({
    initialValues: {
      username: "",
      email: "",
      start_date: "",
      end_date: "",
      course: "",
      graduated: false,
      password: "",
      confirmpassword: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div>
      <div className="py-4">
        <Typography>User Form</Typography>
      </div>

      <Box component="form" onSubmit={formiks.handleSubmit}>
        <TextField
          variant="outlined"
          label="User Name"
          fullWidth
          name="username"
          value={formiks.values.username}
          onChange={formiks.handleChange}
          onBlur={formiks.handleBlur}
          error={formiks.touched.username && Boolean(formiks.errors.username)}
          helperText={formiks.touched.username && formiks.errors.username}
        />
        <FormControl
          variant="outlined"
          fullWidth
          sx={{ mt: 4 }}
          error={formiks.touched.email && Boolean(formiks.errors.email)}
        >
          <InputLabel htmlFor="my-input-email">Email address</InputLabel>
          <Input
            id="my-input-email"
            name="email"
            value={formiks.values.email}
            onChange={formiks.handleChange}
            onBlur={formiks.handleBlur}
          />
          <FormHelperText>
            {formiks.touched.email && formiks.errors.email
              ? formiks.errors.email
              : " Well never share your email."}
          </FormHelperText>
        </FormControl>

        <div className="pt-3">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              name="start_date"
              // value={formiks.values.start_date}
              defaultValue={dayjs()}
              onChange={(newValue) => {
                console.log(newValue);
                formiks.setFieldValue(
                  "start_date",
                  dayjs(newValue).format("YYYY-MM-DD")
                );
              }}
              onError={(newError) => setError(newError)}
              slotProps={{
                textField: {
                  helperText: errorMessage,
                },
              }}
            />
          </LocalizationProvider>
        </div>

        <div className="mt-4">
          <FormControl
            fullWidth
            error={formiks.touched.course && Boolean(formiks.errors.course)}
          >
            <InputLabel id="demo-simple-select-label">Courses</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="course"
              value={formiks.values.course}
              label="Select Course"
              onChange={formiks.handleChange}
              onBlur={formiks.handleBlur}
            >
              {courses.map((itm) => (
                <MenuItem key={itm.value} value={itm.value}>
                  {itm.name}
                </MenuItem>
              ))}
            </Select>
            {formiks.touched.course && formiks.errors.course && (
              <FormHelperText>{formiks.errors.course}</FormHelperText>
            )}
          </FormControl>
        </div>

        <div className="mt-4">
          <FormControl fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              label="Password"
              name="password"
              value={formiks.values.password}
              onChange={formiks.handleChange}
            />
          </FormControl>
        </div>

        <div className="mt-4 mb-4">
          <FormControl fullWidth>
            <InputLabel htmlFor="confirmpassword">Confirm Password</InputLabel>
            <OutlinedInput
              id="confirmpassword"
              label="Confirm Password"
              name="confirmpassword"
              value={formiks.values.confirmpassword}
              onChange={formiks.handleChange}
            />
          </FormControl>
        </div>
        <TextField
          variant="outlined"
          label="Description"
          fullWidth
          multiline
          color="primary"
          rows={4}
          name="description"
          value={formiks.values.description}
          onChange={formiks.handleChange}
        />
        <div className="my-4">
          <Button variant="outlined" type="submit">
            Submit
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default PlatformPage;
