const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: "{발급받은 API 키}",
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: 'gpt-3.5-turbo',
  });

  console.log(completion.choices);
}

main();