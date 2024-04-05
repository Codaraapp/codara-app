"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Stack, Typography } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import { BoxList } from "@/app/core/components/boxlist/boxlist";
import styles from "../member.module.css";

export default function Page() {
  const [currentStep, setCurrentStep] = useState(1);
  const items = [
    { title: "Company", value: "1", img: "/images/company-icon.svg" },
    {
      title: "Open Source Community",
      value: "2",
      img: "/images/github-icon.svg",
    },
    { title: "Community", value: "3", img: "/images/community-icon.svg" },
  ];

  const handleItemSelected = (value: String) => {
    console.log("Seçilen Öğe:", value);
  };

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Box className={styles.stepper}>
          <Box
            sx={{
              backgroundColor: (theme) =>
                currentStep === 1 ? theme.palette.primary.main : "#d0d0d0",
            }}
          ></Box>
          <Box
            sx={{
              backgroundColor: (theme) =>
                currentStep === 2 ? theme.palette.primary.main : "#d0d0d0",
            }}
          ></Box>
          <Box
            sx={{
              backgroundColor: (theme) =>
                currentStep === 3 ? theme.palette.primary.main : "#d0d0d0",
            }}
          ></Box>
        </Box>
      </Box>
      <Box>
        <Stack spacing={3}>
          <Typography variant="h1" gutterBottom>
            Create a organization
          </Typography>
          <TextField
            fullWidth
            label="Organization Name"
            variant="outlined"
            margin="normal"
          />

          <div>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Organization Type:
            </Typography>
            <BoxList items={items} onItemSelected={handleItemSelected} />
          </div>

          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => setCurrentStep(2)}
            endIcon={<NavigateNext />}
          >
            Save
          </Button>
        </Stack>
      </Box>
    </>
  );
}
