import * as React from "react";
import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MaterialTimer from "./MaterialTimer";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function SelectionModal({
  qusnumbervalue,
  setQusnumbervalue,
  timevalue,
  setTimevalue,
  data,
}) {
  // const [timeValue, setTimeValue] = React.useState();
  const [value, setValue] = React.useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function qusvalueslider(qusvalue) {
    setQusnumbervalue(qusvalue);
    // console.log(qusvalue);
    return `${qusvalue}`;
  }
  /*   function timevalueslider(timevalue) {
    setTimevalue(timevalue);
    // console.log(qusvalue);

    return `${timevalue}`;
  } */
  const handleSubmit = (event) => {
    event.preventDefault();
    setTimevalue(value);
  };
/*   const handleChange = (event) => {
    setValue(event.target.value);
  }; */
  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{ m: 10 }}
        style={{ border: "2px solid red" }}
      >
        Start The Test
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 2000,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="">
              <Typography sx={{ mb: 5 }}>
                1. Please select the questions number you want to answer
              </Typography>{" "}
              <Box sx={{ width: 300 }}>
                <Slider
                  aria-label="Question Numbers"
                  defaultValue={10}
                  getAriaValueText={qusvalueslider}
                  // valueLabelDisplay="auto"
                  valueLabelDisplay="on"
                  step={5}
                  marks
                  min={10}
                  max={data.length}
                />
              </Box>
            </div>
            <Typography sx={{ mb: 2, mt: 5 }}>
              2. Please select the time you want to need to answer
            </Typography>
            <form onSubmit={handleSubmit} sx={{ mb: 5 }}>
              {/*     <FormControl required sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-required-label">
                  Time
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={timevalue}
                  label="times *"
                  sx={{ m: 1, minWidth: 120 }}
                  onChange={handleChange}
                >
                  <MenuItem value={5}>Five Minute</MenuItem>
                  <MenuItem value={10}>Ten Minute</MenuItem>
                  <MenuItem value={15}>Fifteen Minute</MenuItem>
                  <MenuItem value={20}>Twenty Minute</MenuItem>
                  <MenuItem value={25}>Twenty Five Minute</MenuItem>
                  <MenuItem value={30}>Thirty Minute</MenuItem>
                  <MenuItem value={35}>Thirty Five Minute</MenuItem>
                  <MenuItem value={40}>Forty Minute</MenuItem>
                  <MenuItem value={45}>Forty Five Minute</MenuItem>
                  <MenuItem value={50}>Fifty Minute</MenuItem>
                  <MenuItem value={55}>Fifty Five Minute</MenuItem>
                  <MenuItem value={60}>Sixty Minute </MenuItem>
                </Select>
                <FormHelperText>Required</FormHelperText>
               
              </FormControl> */}
              <MaterialTimer value={value} setValue={setValue}></MaterialTimer>
              {value && (
                <Button
                  sx={{ mt: 3, ml: 40 }}
                  type="submit"
                  variant="outlined"
                  onClick={() => handleSubmit()}
                >
                  Start
                </Button>
              )}
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
