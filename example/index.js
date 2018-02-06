const updatedRecorder = require('../');

updatedRecorder({
  url: "https://www.dreamstime.com/stock-video-footage?gclid=EAIaIQobChMI8urnvsGR2QIVxasYCh28pgOwEAAYAiAAEgI2IvD_BwE#ref490",
  output: './result/test.webm',
  fps: 60,
  recordingTime: 10
}).then(() => {
  console.log('FINISHED CONVERTING!');
});