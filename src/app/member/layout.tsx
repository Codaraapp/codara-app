import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Image from "next/image";
import styles from "./member.module.css";

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container maxWidth="sm">
      <Stack spacing={{ xs: 1, sm: 1, md: 2 }}>
        <Box sx={{ display: "flex", py: 4, justifyContent: "center" }}>
          <Image
            src="/codaraicon.svg"
            width={40}
            height={40}
            alt="Codara"
          ></Image>
        </Box>
        <Box className={styles.memberpanel}>{children}</Box>
      </Stack>
    </Container>
  );
}
