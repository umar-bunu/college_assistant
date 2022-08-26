import React, { useEffect, useState } from "react";
import {
  getFirestore,
  getDocs,
  where,
  query,
  collection,
} from "firebase/firestore";
import SearchQuestions from "../../components/Questions/FilterQuestions";
import FilterQuestions from "../../components/Questions/FilterQuestions";
import EachQuestion from "../../components/Questions/EachQuestion";
import ShowModal from "../../components/ShowModal";
import styles from "../../styles/Questions.module.css";
import { useRouter } from "next/router";

function Questions({ course }) {
  const [questions, setquestions] = useState(null);
  const [showAddQuestion, setshowAddQuestion] = useState(false);
  const router = useRouter();
  const getQuestions = async () => {
    try {
      const q = query(
        collection(getFirestore(), "questions"),
        where("course", "==", course.id)
      );
      const docs = await getDocs(q);
      setquestions(
        docs.docs.map((eachQuestion) => ({
          id: eachQuestion.id,
          data: eachQuestion.data(),
        }))
      );
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div className={styles.main}>
      {showAddQuestion && <ShowModal />}
      <h2>Questions</h2>
      <div className={styles.searchFilter}>
        <SearchQuestions />
        <FilterQuestions />
      </div>
      <div>
        <h3>Questions</h3>
        {questions == null ? (
          <div>Loading Questions</div>
        ) : (
          <div>
            {questions.map((eachQuestion) => (
              <div
                key={eachQuestion.id}
                onClick={() =>
                  router.push({
                    pathname: "/courses/questions/" + eachQuestion.id,
                    query: {
                      questionData: JSON.stringify(eachQuestion),
                    },
                  })
                }
              >
                <EachQuestion questionData={eachQuestion} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Questions;

export async function getServerSideProps(context) {
  return {
    props: {
      course: context.query,
    }, // will be passed to the page component as props
  };
}
