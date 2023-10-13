fetch("/state-of-the-developer-ecosystem/2023/data/answers.json").then(res => res.json()).then(data => {
  const repository = "https://github.com/cardano-foundation/state-of-the-developer-ecosystem/blob/main"
  const node = document.createElement("div");
  document.querySelector('body').appendChild(node);
  Elm.Main.init({
    node,
    flags: {
      title: "State of the Cardano Developer Ecosystem - 2023",
      introduction: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      questions: {
        question1: question(
          "How many years of experience do you have writing/deploying software?",
          { options:
            []
          , sortDesc: true
          },
          "",
        ),
        question2: question(
          "How many years of experience do you have writing software using a functional programming stack?",
          { options:
            []
          },
          "",
        ),
        question3: question(
          "How would you rate your sentiment towards functional programming?",
          { minimum: "Dreaded", maximum: "Loved" },
          "",
        ),
        question4: question(
          "Do you work on Cardano as a hobby or professionally?",
          { options:
            []
          },
          "",
        ),
        question5: question(
          "Which language(s) are you fluent in?",
          { options:
            []
          , sortDesc: true
          },
          "",
        ),
        question6: question(
          "Which best describes your current profession?",
          { options:
            []
          , sortDesc: true
          },
          "",
        ),
        question7: question(
          "What is your main development environment?",
          { options:
            []
          , sortDesc: true
          },
          "",
        ),
        question8: question(
          "Which programming language(s) are you proficient in?",
          { options:
            []
          , sortDesc: true
          },
          "",
        ),
        question9: question(
          "How would you rate your technical understanding of Cardano?",
          { minimum: "Rookie", maximum: "Expert" },
          "",
        ),
        question10: question(
          "Are you a certified Plutus Pioneer?",
          {},
          "",
        ),
        question11: question(
          "What do you use (or plan to use) for writing Plutus script validators / smart contracts?",
          { options:
            []
          , sortDesc: true
          },
          "",
        ),
        question12: question(
          "What language(s) do you use (or plan to use) for writing off-chain code?",
          { options:
            []
          , sortDesc: true
          },
          "",
        ),
        question13: question(
          "How satisfied are you with the current state of the smart contract ecosystem?",
          { minimum: "Unsatisfied", maximum: "Pleased" },
          "",
        ),
        question14: question(
          "What is your most awaited feature when it comes to Cardano’s smart contracts?",
          { options: []
          , link: `${repository}/2023/data/open-questions/what-is-your-most-awaited-feature-when-it-comes-to-cardano-s-smart-contracts.md`
          },
          "",
        ),
        question15: question(
          "Which libraries do you use in your projects?",
          { options:
            []
          , sortDesc: true
          },
          "",
        ),
        question16: question(
          "How satisfied are you with the current state of the Cardano libraries listed in the previous question?",
          { minimum: "Unsatisfied", maximum: "Pleased" },
          "",
        ),
        question17: question(
          "Which services do you use in your projects?",
          { options:
            []
          , sortDesc: true
          },
          "",
        ),
        question18: question(
          "How satisfied are you with the current state of the Cardano services listed in the previous question?",
          { minimum: "Unsatisfied", maximum: "Pleased" },
          "",
        ),
        question19: question(
          "Which hosted service(s)/platform(s) do you use in your projects?",
          { options:
            []
          , sortDesc: true
          },
          "",
        ),
        question20: question(
          "How satisfied are you with the current state of the Cardano hosted services/platforms listed in the previous question?",
          { minimum: "Unsatisfied", maximum: "Pleased" },
          "",
        ),
        question21: question(
          "Which command-line tool(s) do you use in your projects?",
          { options:
            []
          , sortDesc: true
          },
          "",
        ),
        question22: question(
          "How satisfied are you with the current state of the Cardano command-line tools listed in the previous question?",
          { minimum: "Unsatisfied", maximum: "Pleased" },
          "",
        ),
        question23: question(
          "How do you manage deployment to your infrastructure",
          { options:
            []
          , sortDesc: true
          },
          "",
        ),
        question24: question(
          "How would you rather consume software?",
          { options:
            []
          , sortDesc: true
          },
          "",
        ),
        question25: question(
          "What do you think is the greatest asset of Cardano’s developer ecosystem?",
          { options: []
          , link: `${repository}/2023/data/open-questions/what-do-you-think-is-the-greatest-asset-of-cardano-s-developer-ecosystem.md`,
          },
          "",
        ),
        question26: question(
          "What do you think is the most painful point of Cardano's developer ecosystem?",
          { options: []
          , link: `${repository}/2023/data/open-questions/what-do-you-think-is-the-most-painful-point-of-cardano-s-developer-ecosystem.md`
          },
          "",
        ),
        question27: question(
          "Select any statement that applies to you․",
          { options:
            []
          },
          "",
        ),
        question28: question(
          "Where do you usually seek help on technical issues?",
          { options:
            []
          , sortDesc: true
          },
          "",
        ),
        question29: question(
          "Where/how do you look for technical details on Cardano?",
          { options:
            []
          , sortDesc: true
          },
          "",
        ),
        question30: question(
          "On average, how satisfied are you with the technical answers/details you find in documentation and within the community?",
          { minimum: "Unsatisfied", maximum: "Pleased" },
          "",
        ),
      }
    }
  });

  /* Some questions have only one answer, some have more. So to make the data easier to process
   * down the line, this function normalizes answers to the most generic format (array) unless
   * they already are.
   */
  function toArray (x) {
    if (Array.isArray(x)) {
      return x.filter(e => e != null);
    }

    return x == null ? [] : [x];
  }

  /* Normalize answers to either a single type or null, which is our strawman option type in JavaScript.
   */
  function homogenize (options = []) {
    return (x, ix) => {
      if (x == null) {
        return x;
      }

      if (["boolean", "number"].includes(typeof x)) {
        return Array.isArray(options) ? x : options[x] || x;
      }

      if (typeof x === "string") {
        if (x === "Not Answered" || x === "Not applicable") {
          return null;
        }

        return Array.isArray(options) ? x : (options[x] || x);
      }

      return x.map(homogenize(options));
    }
  }

  /* Create a question object, and remove non applicable answers from the data.
   * The raw dataset contains mainly two types of 'non applicable' answers which
   * corresponds to either someone who did not answer the question because they
   * closed the questionnaire early (a.k.a 'Not Answered') and those who weren't
   * asked the question because the question wasn't relevant to them (a.k.a 'Not
   * Applicable'). Somehow, there are also few answers that are simply 'null'.
   */
  function question (title, args = {}, comment = "", titleAlt = title) {
    return {
      ...args,
      options: Object.values(args.options || {}),
      title: titleAlt,
      comment: comment,
      selectedFilter: 0,
      answers: data[title].map(homogenize(args.options)).map(toArray),
    };
  };

  // Quick-n-dirty hack to get anchors working without the hassle of handling
  // the Browser.Navigation in-app ¯\_(ツ)_/¯.
  //
  // Please don't judge me too harshly.
  const anchor = location.hash;
  if (anchor != undefined && anchor !== '') {
    requestAnimationFrame(function step () {
      const el = document.querySelector(anchor);
      if (el == null) { return requestAnimationFrame(step); }
      el.scrollIntoView();
    });
  }

  // Synchronize the menu scroll with the content scroll on compatible browsers.
  const html = document.querySelector('html');
  if (html.scrollTopMax) {
    requestAnimationFrame(function step() {
      const nav = document.querySelector('nav');
      if (nav == null) { return requestAnimationFrame(step); }
      nav.addEventListener('scroll', e => {
        html.scrollTop = Math.floor(nav.scrollTop * html.scrollTopMax / nav.scrollTopMax);
      });
    });
  }
});
