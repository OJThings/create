import {
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons";
import React from "react";
import ActionButton from "./ActionButton";

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(5),
    position: "absolute",
    top: theme.spacing(0),
  },
  dialogTitle: {
    paddingRight: "0px",
  },
}));

const IncPop = (props) => {
  const { children, fifth, setFifth } = props;
  const classes = useStyles();
  return (
    <Dialog
      open={fifth}
      fullWidth={true}
      maxWidth="md"
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle className={classes.dialog}>
        <div style={{ display: "flex" }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            Subjects from lower year level not taken yet Form
          </Typography>
          <ActionButton
            color="primary"
            onClick={() => {
              setFifth(false);
            }}
          >
            {" "}
            <CloseIcon />
          </ActionButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
};

export default IncPop;
