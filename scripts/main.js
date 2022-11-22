/*
Here we code everything that is not managed elsewhere.
*/

async function initApp() {
    // Flush localStorage
    localStorage.clear();

    // Add mock data to db
    await Controller.createMockDB(Date());
}

//TODO: map routing
//  ->TODO: update OpenLayers
//TODO: map transitions
//TODO: map tooltips w/ mouseover
//TODO: test other navigators / screen size
