
const createBrowserHistory = require('history').createBrowserHistory;
const createMemoryHistory = require('history').createMemoryHistory;

export default
    typeof window != 'undefined' ?
        createBrowserHistory()
        :
        createMemoryHistory();