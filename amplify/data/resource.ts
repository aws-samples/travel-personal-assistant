import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { personalAssistantFunction } from "../functions/personal-assistant/resource";

const schema = a.schema({
  chat: a
    .query()
    .arguments({
      conversation: a.json().required(),
    })
    .returns(a.string())
    .authorization((allow) => [allow.authenticated()])
    .handler(a.handler.function(personalAssistantFunction)),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
