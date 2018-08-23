/* Dev Helpers */
const log = console.log;

const peek = (value) => { log(value); return value };

const PerfMetrics = function() {
  
  let startTime = this.startTime = new Date();

  this.report = function() {

    let endTime = this.endTime = new Date();
    let timeTaken = endTime - startTime;
    
    log(`Started at: ${ startTime.getHours() }:${ startTime.getMinutes() }:${ startTime.getSeconds() }`);
    log(`Time taken: ${ timeTaken }`);

    return timeTaken;
  }
}

const comparePerformance = (Candidates, ...args) => { // Compares the performances of the given functions.
  // #ToDo: Make the tests wait between tries. It isn't done as the way to export async functions isn't known.
  let Res = {};

  Object.keys(Candidates).forEach(key => {

    let pm = new PerfMetrics();
    log(`Trying: ${key}`);
    Candidates[key](...args);
  
    Res[key] = pm.report();
  });

  return Res;
}

module.exports = {
  PerfMetrics,
  comparePerformance,
  log,
  peek,
}
