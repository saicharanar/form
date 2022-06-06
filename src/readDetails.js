const { Form } = require('./Form');

const questions = {
  name: 'Please enter your name',
  dob: 'Please enter your dob YYYY-MM-DD',
  hobbies: 'Please enter your hobbies',
};

const parse = (query, data) => {
  const parsers = {
    name: nameParser,
    dob: dobParser,
    hobbies: hobbiesParser,
  };

  const parser = parsers[query];
  return parser(data);
};

const getUserResponse = (form) => {
  const currentQuery = form.currentQuery();
  console.log(questions[currentQuery]);
  process.stdin('data', (chunk) => {
    form.receiveResponse(currentQuery, parse(currentQuery, chunk));
    if (form.isAllResponsesReceived()) {
      process.stdin.emit('closed');
    }
  });

  process.stdin.on('closed', () => {
    console.log('Thank You');
  });
};

const main = () => {
  const queries = [{ query: 'name' }, { query: 'dob' }, { query: 'hobbies' }];

  const form = new Form(queries);
  getUserResponse(form);
};

main();
