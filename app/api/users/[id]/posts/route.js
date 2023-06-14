import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// params gets populated by dynamic variables (id)
export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator"); // find all posts and populate the creator for each of them
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
