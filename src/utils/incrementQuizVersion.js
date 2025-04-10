/**
 * Incrémente le suffixe "v{n}" à la fin du titre d’un quiz.
 * Si aucun suffixe de version n’est détecté, le titre reste inchangé.
 *
 * Exemples :
 *   "Quiz React v1"   => "Quiz React v2"
 *   "Mon super quiz"  => "Mon super quiz" (inchangé)
 */

const incrementQuizVersion = (title) => {
  const trimmedTitle = title.trim();

  /**
   * Expression régulière utilisée :
   *
   * /(?:\s+|^)v(\d+)$/i
   *
   * - (?:\s+|^) : groupe non capturant qui matche soit :
   *      → un ou plusieurs espaces (`\s+`)
   *      → ou le début de la chaîne (`^`)
   * - v         : la lettre "v" (insensible à la casse grâce au flag `i`)
   * - (\d+)     : capture un ou plusieurs chiffres (la version actuelle)
   * - $         : ancre de fin de chaîne
   *
   * Cette regex va donc détecter un suffixe du type " v2" ou "v3" à la fin d’un titre.
   */
  const versionRegex = /(?:\s+|^)v(\d+)$/i;

  const match = trimmedTitle.match(versionRegex);

  if (!match) return trimmedTitle;

  const currentVersion = parseInt(match[1], 10);
  const newVersion = currentVersion + 1;

  // On remplace le suffixe par " v{newVersion }" en préservant la structure du titre
  return trimmedTitle.replace(versionRegex, ` v${newVersion}`);
};

export default incrementQuizVersion;
