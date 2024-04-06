import type { Session } from "next-auth";
import { redirect } from "next/navigation";
import { auth, signOut } from "./core/auth/auth";

export default async function Admin() {
  const session: Session | null = await auth();
  if (!session || !session?.user) {
    redirect("/member/signin");
  }
  return (
    <div>
      Session:
      <p>{JSON.stringify(session)}</p>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
        className="w-full"
      >
        <button>Sign Out</button>
      </form>
    </div>
  );
}
