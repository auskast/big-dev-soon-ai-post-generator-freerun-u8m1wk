import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
import { z } from "zod";
import { zfd } from "zod-form-data";

const openai = new OpenAI();

const RequestData = zfd.formData({
  platform: z.enum(["facebook", "twitter", "reddit", "linkedin"]),
  message: z.string(),
  tone: z.enum([
    "polite",
    "funny",
    "friendly",
    "informational",
    "serious",
    "optimistic",
    "motivational",
  ]),
  style: z.enum(["work", "opinion", "case study", "story", "tutorial"]),
});

type RequestData = z.infer<typeof RequestData>;

export async function POST(req: Request) {
  const validation = RequestData.safeParse(await req.formData());

  if (!validation.success) {
    return new Response(validation.error.toString(), {
      status: 400,
    });
  }

  const { platform, message, tone, style } = validation.data;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "user",
        content: `Generate a ${platform} post with a ${tone} tone in a ${style} style with the following message: "${message}"`,
      },
    ],
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
