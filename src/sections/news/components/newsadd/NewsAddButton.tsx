import { useState } from "react";
import TextField from "@mui/material/TextField";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";

import CloseIcon from "@mui/icons-material/Close";
import Add from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import { useFormik } from "formik";
import * as Yup from "yup";

function NewsAddButton() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="p-3">
      <Button
        variant="outlined"
        startIcon={<Add />}
        onClick={() => setOpen(true)}
      >
        News Add
      </Button>

      <Dialog open={open} onClose={handleClose}>
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
          <DialogContentText id="alert-dialog-description">
            <TextField
              variant="outlined"
              label="Title"
              fullWidth
              size="small"
            />
            <TextField
              variant="outlined"
              label="URL"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Multiline"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
            />
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Disagree
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            disableElevation
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NewsAddButton;
