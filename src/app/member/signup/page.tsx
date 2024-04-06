"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Stack, Typography } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import { BoxList } from "@/app/core/components/boxlist/boxlist";
import styles from "../member.module.css";
import { redirect } from "next/dist/server/api-utils";

export default function Page() {
  const { data: session, status, update } = useSession();
  const [currentStep, setCurrentStep] = useState(1);
  const [organization_name, setOrgName] = useState("");
  const [organization_type, setOrgType] = useState("");
  const items = [
    { title: "Company", value: "company", img: "/images/company-icon.svg" },
    {
      title: "Open Source Community",
      value: "opensourcecommunity",
      img: "/images/github-icon.svg",
    },
    {
      title: "Community",
      value: "community",
      img: "/images/community-icon.svg",
    },
  ];

  const handleItemSelected = (value: string) => {
    setOrgType(value);
    console.log("Seçilen Öğe:", value);
  };

  const handleSubmit = async () => {
    const res = await fetch("/api/member/createorganization", {
      method: "POST",
      body: JSON.stringify({
        organization_name: organization_name,
        organization_type: organization_type,
      }),
    });
    console.log(res.ok);
    if (res.ok) {
      window.location.href = "/member/signin";
    }
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
            value={organization_name}
            onChange={(e) => {
              setOrgName(e.target.value);
            }}
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
            onClick={() => handleSubmit()}
            endIcon={<NavigateNext />}
          >
            Save
          </Button>
        </Stack>
      </Box>
    </>
  );
}
