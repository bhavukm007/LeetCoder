import {getElementByXPath, pasteHelper, selectAllHelper, sleep} from "../utils/utils.js";
import {
  IS_SOLUTION_ACCEPTED_DIV_XPATH,
  QUESTIONS_CODE_DIV_XPATH,
  QUESTIONS_SUBMIT_ACCEPTED_XPATH,
  QUESTIONS_SUBMIT_DIV_XPATH,
} from "../utils/constants.js";
import clipboardy from "clipboardy";
import Logger from "../utils/Logger.js";
import FileManager from "../managers/FileManager.js";
import {getBrowserDetails} from "../managers/BrowserManager.js";

class LeetcoderSolver {
  static async #checkIfSolvedEarlier(problemName) {
    const solvedProblemSet = await FileManager.getSolvedProblemSet();
    return solvedProblemSet.has(problemName);
  }

  static async #solveProblemWithName(problemName) {
    const { page } = await getBrowserDetails();

    await page.goto(`https://leetcode.com/problems/${problemName}`, {
      waitUntil: "domcontentloaded",
      timeout: 0
    });

    const pageText = await page.evaluate(() => document.body.innerText);

    if (pageText.includes("Subscribe to unlock.") || pageText.includes("Unlock premium")) {
      Logger.error(`[PREMIUM_SKIP]\t\t:${problemName}`);
      return;
    }

    try {
      try {
        const acceptedDiv = await getElementByXPath(page, QUESTIONS_SUBMIT_ACCEPTED_XPATH, 4);
        const acceptedText = await acceptedDiv[0].evaluate((ele) => ele.textContent);
        if (acceptedText.includes("Solved")) {
          Logger.error(`[ALREADY_SOLVED]\t\t:${problemName}`);
          await FileManager.setSolvedProblemSet(problemName);
          return;
        }
      } catch (_) {}

      Logger.success(`[SOLVING]\t\t\t:${problemName}`);

      const { code, language } = await FileManager.getProblemDetails(problemName);

      if (language !== "cpp") {
        Logger.error(`[NON_CPP_SKIP]\t\t:${problemName} (${language})`);
        return;
      }

      clipboardy.writeSync(code);

      await sleep(1);

      const code_editor = await getElementByXPath(page, QUESTIONS_CODE_DIV_XPATH, 8, 1);
      await code_editor[0].click();

      await selectAllHelper(page);
      await page.keyboard.press("Backspace");

      await pasteHelper(page);

      await sleep(2);

      const submit_btn = await getElementByXPath(page, QUESTIONS_SUBMIT_DIV_XPATH, 15, 1);
      await page.evaluate(el => el.click(), submit_btn[0]);

      const isSolutionAccepted = await getElementByXPath(page, IS_SOLUTION_ACCEPTED_DIV_XPATH, 20, 1);
      const solutionAcceptedText = await isSolutionAccepted[0].evaluate((ele) => ele.textContent);

      if (solutionAcceptedText === "Accepted") {
        Logger.success(`[ACCEPTED]\t\t\t:${problemName}`);
        await FileManager.setSolvedProblemSet(problemName);
      } else {
        throw new Error(`${problemName} ${solutionAcceptedText}. Solution may be outdated.`);
      }

      await sleep(1);

    } catch (err) {
      Logger.error(`[FAILED]\t\t\t:${problemName}`, err);
    }
  }

  static async #solveProblems(problemNames) {
    for (const problemName of problemNames) {
      const checkIfSolved = await this.#checkIfSolvedEarlier(problemName);
      if (!checkIfSolved) {
        await this.#solveProblemWithName(problemName);
      } else {
        Logger.success(`[SOLVED_EARLIER]\t\t:${problemName}`);
      }
    }
  }

  static async solve() {
    Logger.error("<<<< Starting LeetCode Solver >>>>");
    const allProblemsName = await FileManager.getAllProblemsNames();
    await this.#solveProblems(allProblemsName);
    Logger.error("<<<< Exiting LeetCode Solver >>>>");
  }
}

export default LeetcoderSolver;