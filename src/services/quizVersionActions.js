import { createQuiz, deleteQuiz } from "../api/quiz";
import {
  createQuizVersion,
  updateQuizVersion,
  deleteQuizVersion,
  publishQuizVersion,
} from "../api/quizVersions";

import incrementQuizVersion from "../utils/incrementQuizVersion";

/**
 * Nettoie les questions avant envoi au backend (supprime les _id).
 */
const cleanQuestions = (questions) =>
  questions.map((q) => ({ ...q, _id: null }));

/**
 * Crée ou met à jour une version de quiz, selon l’état actuel.
 */
export const submitQuizVersion = async ({
  quizVersion,
  setQuizVersion,
  showToast,
}) => {
  const hasQuiz = Boolean(quizVersion.quizId);
  const hasSubmissions = Boolean(quizVersion.hasSubmissions);

  // Cas 1 : on modifie un quiz existant
  if (hasQuiz) {
    // Sous-cas : il existe des soumissions → nouvelle version
    if (hasSubmissions) {
      const newVersion = {
        ...structuredClone(quizVersion),
        title: incrementQuizVersion(quizVersion.title),
        questions: cleanQuestions(quizVersion.questions),
      };

      setQuizVersion(newVersion);
      await createQuizVersion(newVersion.quizId, newVersion);
      showToast(
        "Le quiz a bien été sauvegardé dans sa nouvelle version",
        "success"
      );
      return;
    }

    // Sous-cas : aucune soumission → on met à jour la version existante
    await updateQuizVersion(quizVersion._id, quizVersion);
    showToast("Le quiz a bien été modifié", "success");
    return;
  }

  // Cas 2 : on crée un tout nouveau quiz + sa première version
  const createdQuiz = await createQuiz({ title: quizVersion.title });
  const firstVersion = {
    ...structuredClone(quizVersion),
    title: `${createdQuiz.title} v1`,
  };

  setQuizVersion(firstVersion);
  await createQuizVersion(createdQuiz._id, firstVersion);
  showToast("Le quiz a bien été créé", "success");
};

/**
 * Supprime une version de quiz, puis redirige vers le back-office.
 */
export const destroyQuizVersionAndRedirect = async ({
  quizVersion,
  navigate,
  showToast,
}) => {
  await deleteQuizVersion(quizVersion._id);

  const isFirstVersion = /\bv1$/i.test(quizVersion.title.trim());
  if (isFirstVersion) {
    await deleteQuiz(quizVersion.quizId);
  }

  showToast("Le quiz a bien été supprimé", "success");
  navigate("/backoffice");
};

/**
 * Publie une version de quiz, avec feedback utilisateur.
 */
export const publishQuizVersionWithFeedback = async ({
  quizVersionId,
  showToast,
}) => {
  await publishQuizVersion(quizVersionId);
  showToast("Le quiz a bien été publié", "success");
};
