const { Form } = require('./Form');
const fs = require('fs');

const writeToJson = (form) => {
  fs.writeFileSync('./queryData.json', form.toString(), 'utf-8');
};

const identity = (data) => data;

const phNumberParser = (data) => {
  if (data.length < 10) {
    return;
  }
  return data;
};

const dobParser = (data) => {
  const currentData = data.split('-');
  const validState = currentData.every((number) => isFinite(number));

  if (validState) {
    return currentData;
  }
  return;
};

const hobbiesParser = (data) => {
  if (data.length < 1) {
    return;
  }
  return data.split('-');
};

const includesNumber = (data) => {
  /.*[0-9]+.*/.test(data);
};

const nameParser = (data) => {
  if (data.length <= 5) {
    return;
  }

  if (includesNumber(data)) {
    return;
  }

  return data;
};

const closeStream = (form) => {
  console.log('Thank You');
  writeToJson(form);
  process.stdin.destroy();
};

const registerResponses = (response, form) => {
  form.receiveResponse(response);

  if (form.isAllResponsesReceived()) {
    closeStream(form);
    return;
  }

  currentQuery = form.currentQuery();
  console.log(currentQuery.question);
};

const main = () => {
  const queries = [
    {
      query: 'name',
      parser: nameParser,
      question: 'Please enter your name',
    },
    {
      query: 'dob',
      parser: dobParser,
      question: 'Please enter your dob YYYY-MM-DD',
    },
    {
      query: 'hobbies',
      parser: hobbiesParser,
      question: 'Please enter your hobbies (separated by commas -,-)',
    },
    {
      query: 'ph_no',
      parser: phNumberParser,
      question: 'Please enter your ph_no',
    },
    {
      query: 'addressLine1',
      parser: identity,
      question: 'Enter address line 1',
    },
    {
      query: 'addressLine2',
      parser: identity,
      question: 'Enter address line 2',
    },
  ];

  const form = new Form(queries);

  let currentQuery = form.currentQuery();
  console.log(currentQuery.question);

  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (response) => {
    registerResponses(response, form);
  });
};

main();
