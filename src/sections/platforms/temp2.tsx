import React from "react";
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
import * as Yup from "yup";
import dayjs from "dayjs";

const validationSchema = Yup.object({
  username: Yup.string().required("User Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  start_date: Yup.date()
    .nullable()
    .required("Start date is required")
    .typeError("Invalid date"),
  end_date: Yup.date()
    .nullable()
    .required("End date is required")
    .typeError("Invalid date"),
  course: Yup.string().required("Course is required"),
  password: Yup.string().required("Password is required"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  description: Yup.string(),
});

function PlatformPage() {
  const courses = [
    { name: "Course A", value: "coursea" },
    { name: "Course B", value: "courseb" },
    { name: "Course C", value: "coursec" },
  ];

  const formiks = useFormik({
    initialValues: {
      username: "",
      email: "",
      start_date: null,
      end_date: null,
      course: "",
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
      <Typography>User Form</Typography>
      <Box component="form" onSubmit={formiks.handleSubmit}>
        <TextField
          variant="outlined"
          label="User Name"
          fullWidth
          name="username"
          value={formiks.values.username}
          onChange={formiks.handleChange}
          error={formiks.touched.username && Boolean(formiks.errors.username)}
          helperText={formiks.touched.username && formiks.errors.username}
        />
        <div className="mt-4">
          <FormControl
            variant="outlined"
            fullWidth
            error={formiks.touched.email && Boolean(formiks.errors.email)}
          >
            <InputLabel htmlFor="my-input-email">Email address</InputLabel>
            <Input
              id="my-input-email"
              aria-describedby="my-helper-text"
              name="email"
              value={formiks.values.email}
              onChange={formiks.handleChange}
            />
            <FormHelperText id="my-helper-text">
              {formiks.touched.email && formiks.errors.email
                ? formiks.errors.email
                : "We'll never share your email."}
            </FormHelperText>
          </FormControl>
        </div>
        <div className="pt-3">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={formiks.values.start_date}
              onChange={(newValue) =>
                formiks.setFieldValue("start_date", newValue)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  name="start_date"
                  error={
                    formiks.touched.start_date &&
                    Boolean(formiks.errors.start_date)
                  }
                  helperText={
                    formiks.touched.start_date && formiks.errors.start_date
                  }
                />
              )}
            />
          </LocalizationProvider>
        </div>
        <div className="pt-3">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date"
              value={formiks.values.end_date}
              onChange={(newValue) =>
                formiks.setFieldValue("end_date", newValue)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  name="end_date"
                  error={
                    formiks.touched.end_date && Boolean(formiks.errors.end_date)
                  }
                  helperText={
                    formiks.touched.end_date && formiks.errors.end_date
                  }
                />
              )}
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
          <FormControl
            fullWidth
            error={formiks.touched.password && Boolean(formiks.errors.password)}
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              label="Password"
              name="password"
              type="password"
              value={formiks.values.password}
              onChange={formiks.handleChange}
            />
            <FormHelperText>
              {formiks.touched.password && formiks.errors.password}
            </FormHelperText>
          </FormControl>
        </div>
        <div className="mt-4 mb-4">
          <FormControl
            fullWidth
            error={
              formiks.touched.confirmpassword &&
              Boolean(formiks.errors.confirmpassword)
            }
          >
            <InputLabel htmlFor="confirmpassword">Confirm Password</InputLabel>
            <OutlinedInput
              id="confirmpassword"
              label="Confirm Password"
              name="confirmpassword"
              type="password"
              value={formiks.values.confirmpassword}
              onChange={formiks.handleChange}
            />
            <FormHelperText>
              {formiks.touched.confirmpassword &&
                formiks.errors.confirmpassword}
            </FormHelperText>
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
