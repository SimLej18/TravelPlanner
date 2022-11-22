/*
Here we code everything that is not managed elsewhere.
*/

async function initApp() {
    // Flush localStorage
    localStorage.clear();

    // Add mock data to db
    await Controller.createMockDB();
}

//TODO: Date selector
//TODO: map routing
//  ->TODO: update OpenLayers
//TODO: generation spinner
//TODO: generation labels
//TODO: no scrolls on maps / body
//TODO: test other navigators / screen size
