import { prisma } from "@/app/core/db/prisma";
import { Box, Stack, Typography } from "@mui/material";
import styles from "./projectdetail.module.css";

export default async function ProjectDetail({
  params,
}: {
  params: { projectid: string };
}) {
  const projectDetail = await prisma.projects.findFirst({
    where: {
      id: params.projectid,
    },
  });
  return (
    <Box>
      <Box className={styles.projectheader}>
        <Typography variant="h2">{projectDetail?.name}</Typography>
      </Box>
    </Box>
  );
}
