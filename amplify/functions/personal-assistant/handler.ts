import {
  BedrockRuntimeClient,
  ConverseCommandInput,
  ConverseCommand,
} from "@aws-sdk/client-bedrock-runtime";
import type { Handler } from "aws-lambda";

// Constants
const AWS_REGION = process.env.AWS_REGION;
const MODEL_ID = process.env.MODEL_ID;

// Configuration
const INFERENCE_CONFIG = {
  maxTokens: 1000,
  temperature: 0.5,
};

// Initialize Bedrock Runtime Client
const client = new BedrockRuntimeClient({ region: AWS_REGION });

export const handler: Handler = async (event) => {
  const { conversation } = event.arguments;

  const SYSTEM_PROMPT = `
  To create a personalized travel planning experience, greet users warmly and inquire about their travel preferences 
  such as destination, dates, budget, and interests. Based on their input, suggest tailored itineraries that include 
  popular attractions, local experiences, and hidden gems, along with accommodation options across various price 
  ranges and styles. Provide transportation recommendations, including flights and car rentals, along with estimated 
  costs and travel times. Recommend dining experiences that align with dietary needs, and share insights on local 
  customs, necessary travel documents, and packing essentials. Highlight the importance of travel insurance, offer 
  real-time updates on weather and events, and allow users to save and modify their itineraries. Additionally, 
  provide a budget tracking feature and the option to book flights and accommodations directly or through trusted 
  platforms, all while maintaining a warm and approachable tone to enhance the excitement of trip planning.
`;

  const input = {
    modelId: MODEL_ID,
    system: [{ text: SYSTEM_PROMPT }],
    messages: conversation,
    inferenceConfig: INFERENCE_CONFIG,
  } as ConverseCommandInput;

  try {
    const command = new ConverseCommand(input);
    const response = await client.send(command);

    if (!response.output?.message) {
      throw new Error("No message in the response output");
    }

    return JSON.stringify(response.output.message);
  } catch (error) {
    console.error("Error in chat handler:", error);
    throw error; // Re-throw to be handled by AWS Lambda
  }
};
