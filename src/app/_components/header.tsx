"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const { data: session } = authClient.useSession();

  return (
    <header className="bg-secondary ">
      <div className="flex items-center justify-between container mx-auto px-4 h-14">
        <Link
          href="/"
          className="text-xl font-display tracking-wide font-medium"
        >
          NextGPT
        </Link>
        <ul className="flex items-center justify-end gap-4">
          <li className="flex items-center">
            {!session ? (
              <button
                onClick={async () => {
                  await authClient.signIn.social({
                    provider: "github",
                  });
                }}
                className="font-bold text-xs hover:bg-black bg-primary text-primary-foreground inline-flex items-center justify-center p-3 rounded cursor-pointer"
              >
                Login with Github
              </button>
            ) : (
              <button onClick={() => authClient.signOut()}>
                <Image
                  src={session.user.image!}
                  alt={`${session.user.name}'s github profile picture`}
                  width={96}
                  height={96}
                  priority
                  sizes="96px"
                  className="w-12 h-12 object-contain rounded-full cursor-pointer border border-solid"
                />
              </button>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}
