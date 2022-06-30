import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { red, lightGreen } from "@mui/material/colors";
import { Grid } from "@mui/material";

export default function Question({
  handleRadioChange,
  mcqs,
  handleAnswerOptionClick,
  value,
  setCheckValue,
}) {
  const [radioDisabled, setRadioDisabled] = React.useState(false);

  return (
    <Grid container spacing={2}>
      <FormControl sx={{ m: 3 }} variant="standard" onBlur={() => {}}>
        <FormLabel style={{ textAlign: "left" }}>
          <div>{mcqs.question}</div>
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-error-radios"
          name="quiz"
          value={value}
          onChange={handleRadioChange}
        >
          {mcqs.answers.map((answerOption) => (
            <>
              <FormControlLabel
                key={mcqs.id}
                onClick={() => {
                  setCheckValue(answerOption.correct);
                }}
                value={answerOption.text}
                disabled={radioDisabled}
                control={
                  <Radio
                    onClick={() => {
                      setRadioDisabled(true);
                      handleAnswerOptionClick();
                    }}
                    sx={
                      answerOption.correct === true
                        ? {
                            "&.Mui-checked": {
                              color: lightGreen[800],
                            },
                          }
                        : {
                            "&.Mui-checked": {
                              color: red[800],
                            },
                          }
                    }
                  />
                }
                label={answerOption.text}
              />
            </>
          ))}
        </RadioGroup>
      </FormControl>
    </Grid>
  );
}
