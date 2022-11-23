/*
Here we manage all the input from the user and call the various other scripts
to treat them correctly
*/

class Controller {
  static currentStage = 1;


  /* --------- index.html functions --------- */

  static async createMockDB(date) {
    /*
    * Create a mock database for prototype use
    */
    let mockDatabase = { excursions: [] };

    mockDatabase.excursions.push({
      stages: await generateExcursion(date),
      likes: 23
    });
    mockDatabase.excursions.push({
      stages: await generateExcursion(date),
      likes: 12
    });

    save("date", date);
    save("mockDB", mockDatabase);
  }

  static async changeDate(dateStr) {
    /*
    * Change the date of the search for events
    */
    dateStr = dateStr.split("/");
    let date = new Date(parseInt(dateStr[2]), parseInt(dateStr[1])-1, parseInt(dateStr[0]));
    await Controller.createMockDB(date)
    View.readyToStart()
  }

  static start() {
    /*
    * Go to generation.html
    */
    window.location.href = "docs/generation.html";
  }


  /* --------- generation.html functions --------- */

  static async createSuggestions() {
    /*
    * Retrieve one existing excursion and generate two random ones
    */
    let existingExcursionID = -1;
    if (get("comingBack") == null) {
      existingExcursionID = getRandomExistingExcursionID(get("mockDB"));
      let existingExcursion = get("mockDB").excursions[existingExcursionID];
      save("existingExcursionID", existingExcursionID);
      save("suggestions", [
          existingExcursion.stages,
        await generateExcursion(new Date(get("date"))),
        await generateExcursion(new Date(get("date")))]);
    }
    else {
      existingExcursionID = get("existingExcursionID");
    }
    View.loadSuggestions(get("suggestions"), get("mockDB").excursions[existingExcursionID].likes);
  }

  static choseSuggestion(nb) {
    /*
    * User made a choice between the 3 propositions
    */
    if (nb === 1)
      save("choseExistingExcursion", true)
    save("excursion", get("suggestions")[nb-1]);
    window.location.href = "../docs/validate.html";
  }


  /* --------- validate.html functions --------- */

  static loadSummary() {
    View.loadSummary(get("excursion"));
  }

  static goBackSummary() {
    save("comingBack", "true");
    window.location.href = "../docs/generation.html";
  }

  static validateSummary() {
    window.location.href = "../docs/tour.html";
  }


  /* --------- tour.html functions --------- */

  static loadStage() {
    View.loadStage(get("excursion"), Controller.currentStage);
  }

  static nextStage() {
    if (Controller.currentStage < 5) {
      Controller.currentStage++;
      Controller.loadStage();
    }
    else
      window.location.href = "../docs/comment.html";
  }

  static changeStage(id) {
    Controller.currentStage = id;
    Controller.loadStage();
  }

  static previousStage() {
    Controller.currentStage--;
    Controller.loadStage();
  }


  /* --------- comment.html functions --------- */

  static giveAppreciation(appreciation) {
    View.disableAppreciation();

    let mockDB = get("mockDB");
    let excursionID = get("existingExcursionID");
    let choseExistingExcursion = get("choseExistingExcursion");

    if (appreciation === 0 && choseExistingExcursion) {
      // User did not like.
      mockDB.excursions[excursionID].likes--;
      if (mockDB.excursions[excursionID].likes < 0) {
        // Negative likes, delete excursion
        console.log("removing existing excursion");
        mockDB.excursions.splice(excursionID, 1);
      }
    }
    if (appreciation === 2) {
      // User did like
      if (choseExistingExcursion === null) {
        // Save new excursion
        mockDB.excursions.push({
          stages: get("excursion"),
          likes: 1
        })
      }
      else {
        // Increment excursion likes
        mockDB.excursions[excursionID].likes++;
      }
    }

    save("mockDB", mockDB);
    View.thank(appreciation);
  }
}


/* --------- util functions to get mock database elements --------- */

function save(key, object) {
  localStorage.setItem(key, JSON.stringify(object));
}

function get(key) {
  return JSON.parse(localStorage.getItem(key));
}
