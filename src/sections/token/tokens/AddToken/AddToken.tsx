import { ChangeEvent, Fragment, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, IconButton, styled } from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAddTokens } from "@/api/hooks/tokens";

function AddToken() {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { mutateAsync: myAddTokens } = useAddTokens();

  const handleOnfileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);

      const fileReader = new FileReader();

      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  const formik = useFormik({
    initialValues: {
      token_name: "",
      rate: "",
    },

    validationSchema: Yup.object({
      token_name: Yup.string().required("Token name is required"),
      rate: Yup.number()
        .required("Rate is required")
        .min(0, "Must be greater than Zero"),
    }),

    onSubmit: (values) => {
      const formdata = new FormData();
      formdata.append("tokenName", values.token_name);
      formdata.append("price", values.rate);
      if (selectedFile) {
        formdata.append("file", selectedFile);
      }

      myAddTokens(formdata);
    },
  });
  return (
    <Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Token
      </Button>
      <Dialog open={open} maxWidth={"lg"}>
        <DialogTitle>Add Token</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <input
                type="file"
                name=""
                accept="image/*"
                id=""
                onChange={handleOnfileChange}
              />

              <div>
                {selectedFile && (
                  <p>
                    Selected File: {selectedFile.name}
                    <Image alt="" src={previewUrl} height={144} width={144} />
                  </p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="token_name">Token Name</label>

              <input
                id="token_name"
                name="token_name"
                className="block w-full rounded-md border border-gray-300 p-2"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.token_name}
              />
            </div>
            <div>
              <label htmlFor="rate">Rate</label>

              <input
                id="rate"
                name="rate"
                type="number"
                className="block w-full rounded-md border border-gray-300 p-2 min-w-[520px]"
                onChange={formik.handleChange}
                value={formik.values.rate}
              />
            </div>

            <button
              type="submit"
              className="block w-full p-2 bg-indigo-500 text-white shadow-sm hover:bg-indigo-500 rounded-md"
            >
              Submit
            </button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default AddToken;
