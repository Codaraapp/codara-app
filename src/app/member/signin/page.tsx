"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { signIn } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Stack, Typography } from "@mui/material";
// import { auth } from "@/app/core/auth/auth";

export default function Page() {
  // const session = await auth();

  return (
    <Box>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h1">Create Organization</Typography>
          <Typography variant="subtitle1" sx={{ lineHeight: 1.3 }}>
            Almost done. <br />
            Now choose a method for quick login.
          </Typography>
        </Box>
        <Button
          onClick={() => signIn("github")}
          sx={{
            width: "100%",
            textTransform: "none",
            borderRadius: 10,
            backgroundColor: "#000000",
            color: "#f9f9f9",
            "&:hover": {
              borderColor: "#000000",
              backgroundColor: "#000000",
            },
          }}
          size="large"
          startIcon={<GitHubIcon />}
        >
          Sign in with Github
        </Button>

        <Button
          onClick={() => signIn("google")}
          variant="outlined"
          sx={{
            width: "100%",
            textTransform: "none",
            borderRadius: 10,
            backgroundColor: "#4285f4",
            color: "#f9f9f9",
            "&:hover": {
              borderColor: "#4285f4",
              backgroundColor: "#4285f4",
            },
          }}
          size="large"
          startIcon={<GoogleIcon />}
        >
          Sign In with Google
        </Button>
      </Stack>
    </Box>
  );
}
