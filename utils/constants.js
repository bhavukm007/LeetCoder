// SCRAPERs XPATH
export const SCRAPER_SUBMITTED_CODE_NAME_XPATH = "/html/body/div[2]/div/div[1]/div/div[1]/h4/a";
export const SCRAPER_SUBMITTED_CODE_LANGUAGE_XPATH =
  "/html/body/div[2]/div/div[1]/div/div[2]/div[7]/div/div[1]/div/div[1]/span";
export const SCRAPER_SUBMITTED_CODE_DIV_XPATH =
  "/html/body/div[2]/div/div[1]/div/div[2]/div[7]/div/div[3]/div/div/div[3]/div/div[3]";

// Questions Solver XPath (UPDATED 2026)
export const QUESTIONS_CODE_DIV_XPATH =
  "(//div[contains(@class,'monaco-editor')])[1]";

export const QUESTIONS_SUBMIT_DIV_XPATH =
  "(//button[.//span[text()='Submit'] or text()='Submit'])[1]";

export const QUESTIONS_SUBMIT_ACCEPTED_XPATH =
  "//div[contains(text(),'Solved')]";

export const QUESTIONS_LANGUAGE_BTN_XPATH = "";
export const QUESTIONS_LANGUAGE_DIV_XPATH = "";

export const IS_SOLUTION_ACCEPTED_DIV_XPATH =
  "//span[contains(text(),'Accepted') or contains(text(),'Wrong Answer') or contains(text(),'Runtime Error') or contains(text(),'Compile Error')]";


export const LEETCODER_ASCII_ART = `
     _                    _    _____          _      
    | |                  | |  / ____|        | |     
    | |     ___  ___  ___| |_| |     ___   __| | ___ 
    | |    / _ \\/ _ \\/ _ \\ __| |    / _ \\ / _\` |/ _ \\
    | |___|  __/  __/  __/ |_| |___| (_) | (_| |  __/
    |______\\___|\\___|\\___|\\__|\\_____\\___/ \\__,_|\\___|
    
        Developed by : Bhavuk Mahajan
        Github Link : https://github.com/bhavukm007/LeetCoder
    `;

export const LEETCODER_MODE_QUESTION = `
     Select a mode
     [1] Start LeetCode Bot.
     [2] Scrape Solved LeetCode Problems.
     [other] Exit.
    `;

export const EXITING_LEETCODER = `Thanks for using LeetCode Bot.`;