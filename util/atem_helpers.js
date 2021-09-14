const programInput = (state, mixEffect) =>
  state.video.mixEffects[mixEffect].programInput;

const previewInput = (state, mixEffect) =>
  state.video.mixEffects[mixEffect].previewInput;

const checkState = (pathToChange, mixEffect) =>
  pathToChange.includes(`video.mixEffects.${mixEffect}.programInput`) ||
  pathToChange.includes(`video.mixEffects.${mixEffect}.previewInput`);

const tallyOutput = (state, mixEffect) =>
  `${programInput(state, mixEffect)};${previewInput(state, mixEffect)}\n`;

const handleInput = (pathToChange, mixEffect, state, socket) =>
  checkState(pathToChange, mixEffect) &&
  socket.write(tallyOutput(state, mixEffect));

module.exports = {
  handleInput,
};
