import { useRef } from "react";
import Cookies from 'universal-cookie';
//import { Jwt } from "jsonwebtoken";

function App() {
  const inputRef = useRef(null)
  const resultRef = useRef(null)

  const executeLlm = async () => {
    const cookies = new Cookies();
    let messages = cookies.get("history")

    let history = ""

    if (messages) {
      history = "Tieni a mente questa conversazione prima di rispondere, considerala come un'interazione tra te e l'utente a cui stai rispondento. \n"
      let obj = messages

      let array = obj.messages

      for (let i = 0; i < array.length; i++) {
        let prefix = array[i].isAi ? "Tu: " : "Utente: "
        history += prefix + array[i].content + "\n"
      }
    }

    resultRef.current.innerHTML = "Ci sto lavorando..."
    const question = inputRef.current.value
    const review_question = `
      ${history}

      Ecco a te la nuova domanda dell'utente, Riassuntizza i concetti chiesti senza trascurare però i dettagli più importanti, esegui i collegamenti, se richiesti, contestualizzandoli ad eventi storici attuali e passati.

      Domanda: ${question}
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
          {
            "model": "gpt-4",
            "messages": [
              { "role": "system", "content": `Comportati come Jarvis, l'intelligenza artificiale di Tony Stark` },
              { "role": "assistant", "content": "" },
              { "role": "user", "content": review_question }
            ],
            "temperature": 0.05,
            "max_tokens": 5000,
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

    if (messages) {
      let obj = messages

      obj.messages.push([
        {
          isAi: false,
          content: question
        },
        {
          isAi: true,
          content: res2.choices[0].message.content
        }
      ])

      cookies.set("history", JSON.stringify(obj))
    }
    else {
      cookies.set("history", JSON.stringify({
        messages: [
          {
            isAi: false,
            content: question
          },
          {
            isAi: true,
            content: res2.choices[0].message.content
          }
        ]
      }))
    }
  }

  return (
    <div className="container">
      <input
        type="text"
        placeholder="prompt"
        ref={inputRef}
        className="input_text"
      />

      <p>
        Risposta
      </p>

      <p
        ref={resultRef}
        className="result"
        style={{
          marginTop: 20
        }}
      >
      </p>

      <button
        type="button"
        onClick={executeLlm}
        className="button_prompt"
      >
        Chiedi
      </button>

      <button
        type="button"
        onClick={() => {
          resultRef.current.innerHTML = ""
        }}
        className="button_prompt"
        style={{
          marginBottom: 20
        }}
      >
        Pulisci
      </button>
    </div>
  );
}

export default App;
