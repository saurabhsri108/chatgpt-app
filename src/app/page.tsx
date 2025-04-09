import { auth } from "@/lib/auth";
import Chat from "./_components/chat";
import { headers } from "next/headers";

export default async function HomePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  return (
    <section className="container mx-auto flex flex-col items-start w-full h-[calc(100dvh_-_56px)] px-4">
      <h1 className="font-display text-4xl text-center py-4">
        What can I help with?
      </h1>
      {!session && <p>You need to login to use this chat app</p>}
      {session && <Chat />}
    </section>
  );
}
