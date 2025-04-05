export const handleClickQuestionOptions = (
  option,
  setQuiz,
  index,
  codeInput,
  setCodeInput
) => {
  if (option === "toggleTextArea") {
    return setCodeInput(!codeInput);
  }

  setQuiz((prevState) => {
    const newQuiz = structuredClone(prevState);

    const newQuizQuestions = newQuiz.questions.toSpliced(index, 1);

    if (option === "toUp") {
      newQuizQuestions.splice(index - 1, 0, prevState.questions[index]);
    }

    if (option === "toDown") {
      newQuizQuestions.splice(index + 1, 0, prevState.questions[index]);
    }
    newQuiz.questions = newQuizQuestions;

    if (option === "delete") {
      return newQuiz;
    }

    return newQuiz;
  });
};
