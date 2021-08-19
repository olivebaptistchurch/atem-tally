const programInput = (state, mixEffect) => (
  state
    .video
    .mixEffects[mixEffect]
    .programInput
);

const previewInput = (state, mixEffect) => (
  state
    .video
    .mixEffects[mixEffect]
    .previewInput
);

const checkState = (pathToChange, mixEffect, inputType) => (
  pathToChange
    .includes(`video.mixEffects.${mixEffect}.${inputType}Input`)
);

const handleProgram = (pathToChange, mixEffect, state, socket) => (
  checkState(pathToChange, mixEffect, "program") 
    && socket.write(`Program: ${programInput(state, mixEffect)}\n`)
);

const handlePreview = (pathToChange, mixEffect, state, socket) => (
  checkState(pathToChange, mixEffect, "preview") 
    && socket.write(`Preview: ${previewInput(state, mixEffect)}\n`)
);


module.exports = {
  handleProgram,
  handlePreview
}