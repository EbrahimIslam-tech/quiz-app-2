import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { red, lightGreen } from "@mui/material/colors";
import Timer from "./Timer";

import { saveQusAns } from "../../features/qusSlice";
import { Grid } from "@mui/material";

const ModelTest = ({
  qusnumbervalue,
  setQusnumbervalue,
  timevalue,
  setTimevalue,
  data,
}) => {
  const [value, setValue] = useState();
  console.log(value);
  const { data: qusAnsdata } = useSelector((store) => store.qusAns);
  const dispatch = useDispatch();
  const [checkvalue, setCheckValue] = useState("");
  const [error, setError] = React.useState(false);
  const [timeOut, setTimeOut] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  console.log(currentQuestion, "currentQuestion");
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const [radioDisabled, setRadioDisabled] = React.useState(false);
  console.log(radioDisabled, "radioDisabled");
  // const qusdata = data.slice(0, qusnumbervalue);

  useEffect(() => {}, []);

  const handleRadioChange = (event) => {
    setValue(event.target.value);

    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    /*  if (checkvalue === true) {
      setScore(score + 1);
      setError(false);
    } else {
      setError(true);
    } */
    setValue();
  };
  const handleRadioDisabled = (id) => {
    console.log(id, "id");
    if (currentQuestion === id) {
      setRadioDisabled(true);
    } else {
      setRadioDisabled(false);
    }
  };

  const handleAnswerOptionClick = (isCorrect) => {
    if (checkvalue === true) {
      setScore(score + 1);
      setError(false);
    } else {
      setError(true);
    }
    // setRadioDisabled(!radioDisabled);
    dispatch(saveQusAns({ qsn: data[currentQuestion], ans: value }));
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < data.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      setTimeOut(true);
    }
  };

  const cleardata = () => {
    localStorage.clear();
    refreshPage();
  };
  const refreshPage = () => {
    window.location.reload(false);
  };
  window.onbeforeunload = function (e) {
    localStorage.clear();
  };
  const questions = JSON.parse(localStorage.getItem("QusAns"));

  return (
    <Container style={{}}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          background: "#ffffff",
          margin: "10px",
        }}
      >
        <h4>BCS Preli Model Test </h4>
        <div className="question-count">
          <span>Question No: {currentQuestion + 1}</span>/{data.length}
        </div>
      </div>

      {!timeOut && timevalue && (
        <div>
          <Timer setTimeOut={setTimeOut} timevalue={timevalue} />
        </div>
      )}

      {showScore || timeOut ? (
        <div className="score-section">
          <br />
          <Button
            variant="outlined"
            style={{ float: "right" }}
            onClick={cleardata}
          >
            start again
          </Button>
          <h3>
            You scored {score} out of {data.length}
          </h3>

          <p>View The Right ansawers</p>

          {questions.map((mcqs) => (
            <div style={{ textAlign: "left" }} key={mcqs.qsn.id}>
              <h5> Question: {mcqs.qsn.question} </h5>
              <div>
                {mcqs.qsn.answers.map((ans) => (
                  <div key={mcqs.qsn.id}>
                    {ans.text === mcqs.selectAns ? (
                      <FormControl>
                        {ans.correct === true ? (
                          <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            checked={ans.text}
                          >
                            <FormControlLabel
                              control={
                                <Radio
                                  sx={{
                                    color: lightGreen[800],
                                    "&.Mui-checked": {
                                      color: lightGreen[800],
                                    },
                                  }}
                                />
                              }
                              label={ans.text}
                            />
                          </RadioGroup>
                        ) : (
                          <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            checked={ans.text}
                          >
                            <FormControlLabel
                              control={
                                <Radio
                                  sx={{
                                    color: red[800],
                                    "&.Mui-checked": {
                                      color: red[800],
                                    },
                                  }}
                                />
                              }
                              label={ans.text}
                            />
                          </RadioGroup>
                        )}
                      </FormControl>
                    ) : (
                      <FormControl>
                        <RadioGroup
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                          value={value}
                        >
                          <FormControlLabel
                            value={ans.text}
                            disabled
                            control={<Radio />}
                            label={ans.text}
                          />
                        </RadioGroup>
                      </FormControl>
                    )}
                  </div>
                ))}
              </div>

              {mcqs.qsn.answers.map((ans) => (
                <div key={mcqs.qsn.id}>
                  {ans.text !== mcqs.selectAns && (
                    <div>
                      {ans.correct === true && (
                        <h5 style={{ display: "flex ", flexDirection: "row" }}>
                          Answer:{" "}
                          <p style={{ color: "#43a047", marginLeft: "10px" }}>
                            {ans.text}
                          </p>{" "}
                        </h5>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div>
          {data.map((mcqs) => (
            <Grid container spacing={2}>
              <form onSubmit={handleSubmit} style={{ float: "left" }}>
                <FormControl
                  sx={{ m: 3 }}
                  variant="standard"
                  // disabled={radioDisabled}
                >
                  {" "}
                  <FormLabel style={{ textAlign: "left" }}>
                    <div> {mcqs.question}</div>
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
                            // console.log(mcqs.id);
                            setCheckValue(answerOption.correct);
                            handleAnswerOptionClick();
                            handleRadioDisabled(mcqs.id);
                          }}
                          value={answerOption.text}
                          // checked={value === answerOption.text}
                           disabled={radioDisabled}
                          control={
                            <Radio
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
              </form>
            </Grid>
          ))}
        </div>
      )}
    </Container>
  );
};
export default ModelTest;
/* {answerOption.correct === true ? (
  sx={{
 "&.Mui-checked": {
   color: lightGreen[800],
 },
}}) : (  sx={{
 "&.Mui-checked": {
   color: red[800],
 },
}})} */
