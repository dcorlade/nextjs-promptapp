import { ConnectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req) => {
  try {
    await ConnectToDatabase();

    const prompts = await Prompt.find({}).populate("creator"); // find all posts and populate the creator for each of them
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
