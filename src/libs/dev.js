/* Dev Helpers */
const PerfMetrics = function() {
  
  let startTime = this.startTime = new Date;

  this.report = function() {

    let endTime = this.endTime = new Date;
    
    console.log(`Started at: ${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}`);
    console.log('Time taken:', endTime - startTime);
  }
}

module.exports = {
  PerfMetrics,
}