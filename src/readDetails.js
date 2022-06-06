const { Form } = require('./Form');
const fs = require('fs');

const questions = {
  name: 'Please enter your name',
  dob: 'Please enter your dob YYYY-MM-DD',
  hobbies: 'Please enter your hobbies (separated by commas -,-)',
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

const parse = (query, data) => {
  const parsers = {
    name: nameParser,
    dob: dobParser,
    hobbies: hobbiesParser,
  };

  const parser = parsers[query];
  return parser(data.slice(0, -1));
};

const getUserResponse = (form) => {
  let currentQuery = form.currentQuery();
  console.log(questions[currentQuery]);
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', (chunk) => {
    form.receiveResponse(currentQuery, parse(currentQuery, chunk));
    if (form.isAllResponsesReceived()) {
      process.stdin.emit('closed');
    }
    currentQuery = form.currentQuery();
    console.log(questions[currentQuery]);
  });

  process.stdin.on('closed', () => {
    console.log('Thank You');
    fs.writeFileSync('./queryData', form.toString(), 'utf8');
    process.exit(0);
  });
};

const main = () => {
  const queries = [{ query: 'name' }, { query: 'dob' }, { query: 'hobbies' }];

  const form = new Form(queries);
  getUserResponse(form);
};

main();
