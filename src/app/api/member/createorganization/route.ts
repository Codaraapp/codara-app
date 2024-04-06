import { auth } from "@/app/core/auth/auth";
import { cookies } from "next/headers";

export const POST = auth(async (req) => {
  // if (req.auth) {

  const { organization_name, organization_type } = await req.json();
  console.log(organization_name, organization_type);
  cookies().set("form_org_name", organization_name, { maxAge: 60 * 2 });
  cookies().set("form_org_type", organization_type, { maxAge: 60 * 2 });

  return Response.json({ data: "Protected data" });

  return Response.json({ message: "Not authenticated" }, { status: 401 });
}) as any;
