import React from "react";
import type { Metadata } from "next";
import { auth } from "@/app/core/auth/auth";
import styles from "./layout.module.css";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import ProfileMenu from "./components/profile-menu/profile-menu";

export const metadata: Metadata = {
  title: "Codara",
  description: "",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <Box className={styles.dasboardpanel}>
      <Box className={styles.leftpanel}>
        <Box className={styles.menu}>
          <Stack gap={2}>
            <Image
              src="/images/codara_logo_bg_black.svg"
              width={157}
              height={30}
              alt="Codara"
            ></Image>

            <ul className={styles.leftmenu}>
              <li>
                <a className={styles.active} href="#">
                  Oweview
                </a>
              </li>
              <li>
                <a href="#">Projects</a>
              </li>
              <li>
                <a href="#">Hackathons</a>
              </li>
              <li>
                <a href="#">Events</a>
              </li>
              <li>
                <a href="#">Activities</a>
              </li>
              <li>
                <a href="#">Balance</a>
              </li>
              <li>
                <a href="#">Settings</a>
              </li>
            </ul>
          </Stack>
        </Box>
        <Box className={styles.profile}>
          <ProfileMenu params={{ userSession: session }} />
        </Box>
      </Box>
      <Box className={styles.contentpanel}>{children}</Box>
    </Box>
  );
}
