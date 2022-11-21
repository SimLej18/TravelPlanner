/*
Here we manage all the input from the user and call the various other scripts
to treat them correctly
*/

class Controller {
  static async createMockDB() {
    let mockDatabase = { excursions: [] };

    mockDatabase.excursions.push({
      stages: await generateExcursion(new Date(2022, 10, 21)),
      likes: 23
    });
    mockDatabase.excursions.push({
      stages: await generateExcursion(new Date(2022, 10, 21)),
      likes: 12
    });

    save("mockDB", mockDatabase);
  }
  static start() {
    window.location.href = "../docs/generation.html";
  }

  static async createSuggestions() {
    if (get("comingBack") == null) {
      let existingExcursion = getRandomPreviousExcursion(get("mockDB"));
      save("existingExcursion", existingExcursion);
      save("suggestions", [existingExcursion.stages, await generateExcursion(Date()), await generateExcursion(Date())]);
    }
    View.loadSuggestions(get("suggestions"), get("existingExcursion").likes);
  }

  static choseSuggestion(nb) {
    save("excursion", get("suggestions")[nb-1]);
    window.location.href = "../docs/validate.html";
  }

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
}

function save(key, object) {
  localStorage.setItem(key, JSON.stringify(object));
}

function get(key) {
  return JSON.parse(localStorage.getItem(key));
}
