
// globals
const baseUrl = 'http://api.github.com';
let recursiveData = [];
let page = 1;

/**
 * Helper for calling the API endpoints
*/
export const API = {
    /**
     * Endpoint for getting general information about an organization
     * @param {String} user 
     * @param {Object} options 
     * @returns the general organization information for the user
     */
    getOrganization: async (user, options) => {
        const { setLoader } = options;
        const endpoint = `/users/${user}`;
        try {
            setLoader(true);
            // if simple call, use general dispatch call
            let orgResults = await _dispatch(endpoint);

            if(orgResults.organization) {
                orgResults = {...orgResults.organization};
            }

            // convert created date to clean display
            orgResults.created_at = new Date(orgResults.created_at).toDateString();

            return orgResults;

        } catch (err) {
            return err;
        } finally {
            cleanUp(setLoader);
        }
    },
    /**
     * Get all of the repositories based on organization/user
     * @param {String} org 
     * @param {Object} options 
     * @returns the repositories from the organization/user
     */
    getRepositories: async (orgUrl, options) => {
        const { setLoader } = options;
        const endpoint = orgUrl;
        try {
            setLoader(true);
            await recursivePageReturn(endpoint);
            const concat = recursiveData.reduce((prev, current) => prev.concat(current));
            const noForks = concat.filter(c => !c.fork);
            const sortedMostStars = noForks.sort((a,b) => {return b.stargazers_count - a.stargazers_count});
            const truncatedList = sortedMostStars.slice(0,6);

            // based off the top starred repos, now go get the languages they use
            for (let i = 0; i < truncatedList.length; i++) {
                const data = await fetch(`${truncatedList[i].languages_url}`);
                const jsonData = await data.json();
                truncatedList[i].languageList = jsonData;
            }

            return truncatedList;
        } catch (err) {
            return err;
        } finally {
            cleanUp(setLoader);
        }
    },
}

/**
 * Makes a call to the API based on the endpoint passed in
 * @param {String} endpoint 
 * @returns data corresponding the endpoint
 */
const _dispatch = async (endpoint, absolutePath = false) => {
    try {
        const data = await fetch(`${absolutePath ? endpoint : baseUrl + endpoint}`);
        const jsonData = await data.json();
        return jsonData;
    } catch (err) {
        return err;
    }
};

/**
 * Helps to cycle through the paginations and aggregating the data when receiving beyond 100 records
 * @param {String} endpoint 
 */
const recursivePageReturn = async (endpoint) => {
    const data = await fetch(`${endpoint}?per_page=100&page=${page}`);
    const jsonData = await data.json();
    recursiveData.push(jsonData);
    // if data coming back is still at 100, we assume there are more pages to cycle through
    if(jsonData.length === 100) {
        page++;
        await recursivePageReturn(endpoint);
    }
};

/**
 * Turns off the loading screen once the query is complete
 * and resets global variables for next search
 * @param {Function} setLoader 
 */
const cleanUp = (setLoader) => {
    setLoader(false);

    // reset global variables
    recursiveData = [];
    page = 1;
};

export default API;