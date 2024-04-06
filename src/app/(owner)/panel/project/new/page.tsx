"use client";

import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ProjectType from "../../components/newproject/projecttype";
import ProjectInfo from "../../components/newproject/projectinfo";
import styles from "./new.module.css";

export default function NewProjectForm() {
  const [data, setData] = useState({
    project_type: "",
    project_name: "",
    project_desc: "",
    amount: 0,
  });

  const handleChange = (event: any) => {
    if (event.target) {
      const { name, value } = event.target;
      setData({
        ...data,
        [name]: value,
      });
    } else {
      const { name, value } = event;
      setData({
        ...data,
        [name]: value,
      });
    }
    console.log(data);
  };

  const [activeTab, setActiveTab] = useState(0);
  const [openStep1, setOpenErrStep1] = useState(false);
  const [openStep2, setOpenErrStep2] = useState(false);
  const [openFetch, setOpenFetch] = useState(false);

  const formElements = [
    <ProjectType data={data} handleChange={handleChange} />,
    <ProjectInfo data={data} handleChange={handleChange} />,
  ];

  const nextOrSave = () => {
    if (activeTab === 0 && data.project_type === "") {
      setOpenErrStep1(true);
      return;
    }
    if (
      activeTab === 1 &&
      (data.project_name === "" ||
        data.project_desc === "" ||
        data.amount === 0)
    ) {
      setOpenErrStep2(true);
      return;
    }

    if (activeTab === 1) {
      setOpenFetch(true);
      return;
    }

    setActiveTab((prev) => prev + 1);
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        onClick={() => setOpenFetch(false)}
        open={openFetch}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Snackbar
        open={openStep2}
        autoHideDuration={4000}
        onClose={() => setOpenStep2(false)}
      >
        <Alert
          onClose={() => setOpenStep2(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Project Name, Description, and Amount are required
        </Alert>
      </Snackbar>

      <Snackbar
        open={openStep1}
        autoHideDuration={4000}
        onClose={() => setOpenStep1(false)}
      >
        <Alert
          onClose={() => setOpenStep1(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Choose a project type, please
        </Alert>
      </Snackbar>
      <Stack direction="column" spacing={4}>
        <Typography variant="h1">Submit Project</Typography>
        <Box className={styles.formpanel}>
          <Box className={styles.step}>
            <Stepper activeStep={activeTab} orientation="vertical">
              <Step key="s1">
                <StepLabel></StepLabel>
              </Step>
              <Step key="s2">
                <StepLabel></StepLabel>
              </Step>
              <Step key="s3">
                <StepLabel></StepLabel>
              </Step>
            </Stepper>
          </Box>
          <Box className={styles.form}>
            <Box sx={{ minHeight: 400 }}>{formElements[activeTab]}</Box>
            <Stack
              direction="row"
              spacing={4}
              sx={{ borderTop: 1, pt: 2, borderColor: "#ccc" }}
            >
              <Button
                disabled={activeTab === 0}
                onClick={() => setActiveTab((prev) => prev - 1)}
                variant="outlined"
                size="large"
                sx={{ textTransform: "none" }}
              >
                Back
              </Button>

              <Button
                onClick={() => nextOrSave()}
                variant="contained"
                size="large"
                sx={{ textTransform: "none" }}
              >
                {formElements.length - 1 === activeTab ? "Save" : "Next"}
              </Button>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </>
  );
}
