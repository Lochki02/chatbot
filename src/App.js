import { useRef } from "react";

function App() {
  const inputRef = useRef(null)
  const resultRef = useRef(null)

  const executeLlm = async () => {
    resultRef.current.innerHTML = "Working on it..."
    const question = inputRef.current.value
    const question_template = `Question: ${question}. Is this a question regarding legal matter or legal advices or informations about the law? Answer specificaly with "Yes" or "No" only`

    /*const req = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer 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`
        },
        body: JSON.stringify({
          "model": "gpt-4",
          "messages": [
            { "role": "system", "content": "" },
            { "role": "assistant", "content": "" },
            { "role": "user", "content": question_template }
          ],
          "temperature": 0.05,
          "max_tokens": 256,
          "top_p": 1,
          "frequency_penalty": 0,
          "presence_penalty": 0
        })
      }
    )

    const res = await req.json()
    let result = res.choices[0].message.content

    console.log("First result: ", result)*/

    const review_question = `
      LegalOne is not a team of experts but an app that puts people in contact with lawyers

      ${question}

      point out nicely to consult a lawyer from LegalOne app to answer the question more precisely. 
    `
  
    const req2 = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer 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`
        },
        body: JSON.stringify(
          /*{
            "model": "gpt-4",
            "messages": [
              { "role": "system", "content": `Don't say anything about yourself like "I'm an AI developed by OpenAI and I don't have a gender", just answer like specified below. Don't answer to anything that is not a legal matter or legal advice or informations about the law. If the question above is not a legal matter or legal advice or informations about the law then precisely type down "I cannot answer this question" and point out nicely that you can answer only legal matters without specifying that the question is not a legal matter or legal advice or informations about the law
              Also invite the user to ask legal matters questions only` },
              { "role": "assistant", "content": "" },
              { "role": "user", "content": review_question }
            ],
            "temperature": 0.05,
            "max_tokens": 256,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 0
          }*/
          {
            "model": "gpt-4",
            "messages": [
              { "role": "system", "content": `Comportati come Jarvis, l'intelligenza artificiale di Tony Stark` },
              { "role": "assistant", "content": "" },
              { "role": "user", "content": question }
            ],
            "temperature": 0.05,
            "max_tokens": 256,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 0
          }
        )
      }
    )

    const res2 = await req2.json()
    console.log("Final result: ", res2.choices[0].message.content)
    resultRef.current.innerHTML = res2.choices[0].message.content
  }

  return (
    <div className="container">
      <input
        type="text"
        placeholder="prompt"
        ref={inputRef}
        className="input_text"
      />

      <p
        ref={resultRef}
        className="result"
      >

      </p>

      <button
        type="button"
        onClick={executeLlm}
        className="button_prompt"
      >
        Prompta
      </button>
    </div>
  );
}

export default App;
