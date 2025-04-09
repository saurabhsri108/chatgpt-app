"use client";

import { getCompletion } from "@/actions/get-completion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { TMessage } from "@/types/chat";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";

export default function Chat() {
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    setIsLoading(true);
    const completions = await getCompletion([
      ...messages,
      { role: "user", content: message },
    ]);
    setMessage("");
    setMessages(completions.messages);
    setIsLoading(false);
  };

  return (
    <section className="w-full py-4">
      {messages.map((message) => (
        <div
          key={message.content}
          className={cn("mb-5 flex flex-col items-start", {
            "items-end": message.role === "user",
          })}
        >
          <p
            className={cn(
              "bg-gray-700 text-sm text-white py-2 px-8 rounded-md",
              {
                "bg-blue-700": message.role === "user",
              }
            )}
          >
            {message.content}
          </p>
        </div>
      ))}
      <div className="flex border-t-2 border-t-gray-500 pt-3 mt-3">
        <Input
          className="flex-grow text-xl"
          placeholder="Ask anything"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter" && !isLoading) {
              handleSendMessage();
            }
          }}
        />
        <Button
          disabled={isLoading}
          onClick={handleSendMessage}
          className="ml-3 text-xl cursor-pointer disabled:cursor-not-allowed"
        >
          Send {isLoading && <Loader2Icon className="animate-spin" />}
        </Button>
      </div>
    </section>
  );
}
