"use server";

import { env } from "@/lib/env";
import { TMessage } from "@/types/chat";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export async function getCompletion(messageHistory: TMessage[]) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messageHistory,
    });

    const messages = [
      ...messageHistory,
      response.choices[0].message as unknown as TMessage,
    ];

    return {
      messages,
    };
  } catch (error) {
    return {
      messages: [
        ...messageHistory,
        {
          role: "assistant",
          content: (error as unknown as Error).message,
        } as unknown as TMessage,
      ],
    };
  }
}
