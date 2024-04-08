import { auth } from "@/app/core/auth/auth";
import { prisma } from "@/app/core/db/prisma";
import type { Session } from "next-auth";
import { cookies } from "next/headers";
import { NextAuthRequest } from "node_modules/next-auth/lib";

export const POST = auth(async (req: NextAuthRequest) => {
  if (req.auth) {
    const session: Session | null = await auth();
    const { project_name, project_type, project_desc, amount } =
      await req.json();

    console.log(`-->user: ${JSON.stringify(req.auth.user.id)}`);
    const project = await prisma.projects.create({
      data: {
        name: project_name,
        desription: project_desc,
        prize_pool: amount,
        project_type_id: project_type,
        create_at: new Date(),
        project_status_id: "WAIT_DEPOSIT",
        is_connect_repo: false,
        is_connect_deposit: false,
        user_id: req.auth?.user.id || "",
      },
    });
    return Response.json({ data: { project_id: project.id } });
  }

  return Response.json({ message: "Not authenticated" }, { status: 401 });
}) as any;
