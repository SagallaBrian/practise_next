import { Fragment, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

function AddToken() {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Token
      </Button>
      <Dialog open={open}>
        <DialogTitle>Add Token</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem
            dignissimos officia mollitia rerum placeat asperiores voluptatum
            omnis tempore et quos?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default AddToken;
