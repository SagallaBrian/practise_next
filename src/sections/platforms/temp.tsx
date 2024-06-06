import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  Checkbox,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormik, Field } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import FormikDatePicker from "./FormikDatePicker";

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
    .typeError("Invalid date")
    .test(
      "end_date-after-start_date",
      "End date must be later than start date",
      function (value) {
        const { start_date } = this.parent;
        return !start_date || !value || value > start_date;
      }
    ),
  course: Yup.string().required("Course is required"),
  password: Yup.string().required("Password is required"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
  description: Yup.string(),
  agree_terms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});

function PlatformPage() {
  const courses = [
    { name: "Course A", value: "coursea" },
    { name: "Course B", value: "courseb" },
    { name: "Course C", value: "coursec" },
  ];

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      start_date: null,
      end_date: null,
      course: "",
      password: "",
      confirmpassword: "",
      description: "",
      agree_terms: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <Typography>User Form</Typography>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <TextField
          variant="outlined"
          label="User Name"
          fullWidth
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <div className="mt-4">
          <FormControl
            variant="outlined"
            fullWidth
            error={formik.touched.email && Boolean(formik.errors.email)}
          >
            <InputLabel htmlFor="my-input-email">Email address</InputLabel>
            <Input
              id="my-input-email"
              aria-describedby="my-helper-text"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <FormHelperText id="my-helper-text">
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : "We'll never share your email."}
            </FormHelperText>
          </FormControl>
        </div>
        <div className="pt-3">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Field
              name="start_date"
              component={FormikDatePicker}
              label="Start Date"
              textFieldProps={{
                fullWidth: true,
              }}
            />
          </LocalizationProvider>
        </div>
        <div className="pt-3">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Field
              name="end_date"
              component={FormikDatePicker}
              label="End Date"
              textFieldProps={{
                fullWidth: true,
              }}
            />
          </LocalizationProvider>
        </div>
        <div className="mt-4">
          <FormControl
            fullWidth
            error={formik.touched.course && Boolean(formik.errors.course)}
          >
            <InputLabel id="demo-simple-select-label">Courses</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="course"
              value={formik.values.course}
              label="Select Course"
              onChange={formik.handleChange}
            >
              {courses.map((itm) => (
                <MenuItem key={itm.value} value={itm.value}>
                  {itm.name}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.course && formik.errors.course && (
              <FormHelperText>{formik.errors.course}</FormHelperText>
            )}
          </FormControl>
        </div>
        <div className="mt-4">
          <FormControl
            fullWidth
            error={formik.touched.password && Boolean(formik.errors.password)}
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              label="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <FormHelperText>
              {formik.touched.password && formik.errors.password}
            </FormHelperText>
          </FormControl>
        </div>
        <div className="mt-4 mb-4">
          <FormControl
            fullWidth
            error={
              formik.touched.confirmpassword &&
              Boolean(formik.errors.confirmpassword)
            }
          >
            <InputLabel htmlFor="confirmpassword">Confirm Password</InputLabel>
            <OutlinedInput
              id="confirmpassword"
              label="Confirm Password"
              name="confirmpassword"
              type="password"
              value={formik.values.confirmpassword}
              onChange={formik.handleChange}
            />
            <FormHelperText>
              {formik.touched.confirmpassword && formik.errors.confirmpassword}
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
          value={formik.values.description}
          onChange={formik.handleChange}
        />
        <div className="mt-4">
          <FormControlLabel
            control={
              <Checkbox
                name="agree_terms"
                color="primary"
                checked={formik.values.agree_terms}
                onChange={formik.handleChange}
              />
            }
            label="I agree to the terms and conditions"
          />
          {formik.touched.agree_terms && formik.errors.agree_terms && (
            <FormHelperText error>{formik.errors.agree_terms}</FormHelperText>
          )}
        </div>
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
