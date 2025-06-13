import { Inngest } from "inngest";
import { contentCreationNetwork } from "../src";
import { serve } from "inngest/next";

const inngest = new Inngest({
  id: "content-creation-assistant",
  name: "Content Creation Assistant",
});

// Create the function that runs your network
const contentCreationFunction = inngest.createFunction(
  { id: "content-creation-assistant", name: "Content Creation Assistant" },
  { event: "content/creation.requested" },
  async ({ event, step }) => {
    const { input } = event.data;

    console.log(`🚀 Starting content creation for: ${input}`);

    // Run the network
    const result = await contentCreationNetwork.run(input);

    console.log("✅ Content creation completed");

    return {
      success: true,
      result: result.state.kv.get("summary") || "Content created successfully",
      title: result.state.kv.get("title"),
      word_count: result.state.kv.get("word_count"),
    };
  }
);

// Export the Vercel handler
export default serve({
  client: inngest,
  functions: [contentCreationFunction],
});
