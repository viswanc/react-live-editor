/* Dev Helpers */
const log = console.log;

const PerfMetrics = function() {
  
  let startTime = this.startTime = new Date();

  this.report = function() {

    let endTime = this.endTime = new Date();
    
    log(`Started at: ${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}`);
    log(`Time taken: ${endTime - startTime}`);
  }
}

const comparePerformance = (Candidates, ...args) => { // Compares the performances of the given functions.
  // #ToDo: Make the tests wait between tries. It isn't done as the way to export async functions isn't known.

  Object.keys(Candidates).forEach(key => {

    let pm = new PerfMetrics();
    log(`Trying: ${key}`);
    Candidates[key](...args);
  
    pm.report();
  });
}

module.exports = {
  PerfMetrics,
  comparePerformance,
  log,
}