const IP_REGEX = /^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$/;
const ME_FLAG_REGEX = /^-me=([0-9]+)$/;

const getAddress = (args) => args.find((arg) => arg.match(IP_REGEX));

const getMixEffect = (args) => {
  let mixEffect;
  args.find((arg) => {
    let results = arg.match(ME_FLAG_REGEX);
    mixEffect = results && results[1];
  });
  return parseInt(mixEffect);
};

const handleError = (error) => {
  console.log(error);
  process.exit(0);
};

module.exports = {
  getAddress,
  getMixEffect,
  handleError,
  IP_REGEX,
};
