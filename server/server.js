import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const port = 5000;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

const fetchEntityNames = async () => {
  try {
    // Replace 'YOUR_DOTNET_API_ENDPOINT' with the actual endpoint of your .NET Core API
    const response = await axios.get(
      "http://localhost:5062/api/Entity/GetAllEntities"
    );

    const entityNames = response.data.map((entity) => entity.entityName);

    return entityNames;

    // Assuming the API response contains an array of entity names
    //return response.data;
  } catch (error) {
    throw error;
  }
};

app.get("/", async (req, res) => {
  res.status(200).send({
    bot : "Hello! The API server is up and running.",
  });
});

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt.toLowerCase();

    if (prompt.includes("hello") || prompt.includes("hi")) {
      res.status(200).send({
        bot: "Hello! How can I help you?",
      });
    } else if (
      (prompt.includes("add") && prompt.includes("entity")) ||
      (prompt.includes("add") && prompt.includes("feature")) ||
      (prompt.includes("add")  && prompt.includes("entity"))||
      (prompt.includes("add")  && prompt.includes("features"))
    ) {
      // Fetch entity names from the .NET Core API

      res.status(200).send({
        bot: "From the Home page click the add button(to add individual entities) or upload button(as CSV file) to upload your features. Enter the entity name you want to add features to if it exists the features will be added to the existing entity with the same name or enter a unique name to create a new entity to add you features in it.",
      });
    } else if (
      prompt.includes("entity") ||
      prompt.includes("available entities") ||
      prompt.includes("entities")
    ) {
      // Fetch entity names from the .NET Core API
      const entityNames = await fetchEntityNames();      
      res.status(200).send({
        bot: "Here are the available entity names: " + entityNames.join(", "),
      });
    } else {
      // Handle other types of queries or prompts
      // Add more conditional statements as needed
      const response = await openai.createCompletion({
        model: "gpt-3.5-turbo-instruct-0914", //"text-davinci-003",
        prompt: `${prompt}`,
        temperature: 1,
        max_tokens: 1024,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      });

      res.status(200).send({
        bot: response.data.choices[0].text,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
