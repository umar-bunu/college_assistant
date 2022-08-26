import React, { useState } from "react";

function ViewQuestion({ data }) {
  const [answerResult, setanswerResult] = useState("");
  const [isShowingAnswer, setisShowingAnswer] = useState(false);
  const [userAnswer, setuserAnswer] = useState("");
  const [questionData, setquestionData] = useState(
    JSON.parse(data.questionData)
  );

  return (
    <div>
      <h3>View Question</h3>
      <div>{questionData.data.question}</div>
      {questionData.data.type == "obj" ? (
        <ol>
          {questionData.data.options.map((eachOption) => (
            <li key={eachOption}>{eachOption}</li>
          ))}
        </ol>
      ) : (
        <></>
      )}
      <div>
        <div>{answerResult}</div>
        <input
          placeholder="Your answer"
          type="text"
          onChange={(e) => setuserAnswer(e.target.value)}
        />
        <button
          onClick={() =>
            setanswerResult(
              userAnswer.toLocaleLowerCase() ==
                questionData.data.answer.toLocaleLowerCase()
                ? "Correct"
                : "Wrong"
            )
          }
        >
          Attemp Question
        </button>
      </div>
      <div>
        <button onClick={() => setisShowingAnswer(!isShowingAnswer)}>
          {isShowingAnswer == false ? "Show" : "Hide"} Answer
        </button>
        {isShowingAnswer == true && <span>{questionData.data.answer}</span>}
      </div>
    </div>
  );
}

export default ViewQuestion;
export async function getServerSideProps(context) {
  return {
    props: {
      data: context.query,
    }, // will be passed to the page component as props
  };
}
