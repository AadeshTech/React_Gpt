const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
const corsOption = {
    origin: '*',
};
app.use(cors(corsOption));
app.use(cors());

const { Configuration, OpenAIApi } = require("openai");
// const readlineSync = require("readline-sync");
require("dotenv").config();

app.post("/chat", async (req, res) =>{
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const history = [];

  while (true) {
    const user_input = req.body.message;

    const messages = [];

    messages.push({ role: "user", content: user_input });

    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
      });
   
      const completion_text = completion.data.choices[0].message.content;
      history.push([user_input, completion_text]);
      for (const [input_text, completion_text] of history) {
        messages.push({ role: "user", content: input_text });
        messages.push({ role: "assistant", content: completion_text });
      }
      res.send(completion_text);
      if(completion_text){
        return;
      }

    //   const user_input_again = readlineSync.question(
    //     "\nWould you like to continue the conversation? (Y/N)"
    //   );
    //   if (user_input_again.toUpperCase() === "N") {
    //     return;
    //   } else if (user_input_again.toUpperCase() !== "Y") {
    //     console.log("Invalid input. Please enter 'Y' or 'N'.");
    //     return;
    //   }
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
        res.send(error.response.status,error.response.data);
          return;
      } else {
        console.log(error.message);
        res.send(error.message);
        return;
      }
    }
  }
})

const port = 8080

app.listen(port, () =>{
    console.log(`AadeshTech-chatgpt backend is listening at port ${port}`);
})
