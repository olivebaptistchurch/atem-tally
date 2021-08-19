const IP_REGEX = /^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$/;

const getAddress = args => (
  args.find(arg => arg.match(IP_REGEX))
)

const handleError = error => {
  console.log(error);
  process.exit(0);
};

module.exports = {
  getAddress,
  handleError,
  IP_REGEX
};