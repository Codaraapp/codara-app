"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { signIn, useSession } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Stack, Typography } from "@mui/material";

export default function Page() {
  const { data: session } = useSession();
  return (
    <Box>
      <Stack spacing={3}>
        <div>{JSON.stringify(session)}</div>
        <Box>
          <Typography variant="h1">Create Organization</Typography>
          <Typography variant="subtitle1" sx={{ lineHeight: 1.3 }}>
            Lets start.
            <br />
            First choose a login method
          </Typography>
        </Box>
        <Button
          onClick={() => signIn("github")}
          variant="outlined"
          color="primary"
          size="large"
          startIcon={<GitHubIcon />}
        >
          Sign in with Github
        </Button>

        <Button
          onClick={() => signIn("google")}
          variant="outlined"
          color="primary"
          size="large"
          startIcon={<GoogleIcon />}
        >
          Sign In with Google
        </Button>
      </Stack>
    </Box>
  );
}
