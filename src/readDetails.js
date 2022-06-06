const { Form } = require('./Form');

const questions = {
  name: 'Please enter your name',
  dob: 'Please enter your dob YYYY-MM-DD',
  hobbies: 'Please enter your hobbies',
};

const getUserResponses = (form, queries) => {
  let index = 0;

  process.stdin.on('data', (chunk) => {
    const currentQuery = queries[index];
    console.log(questions[currentQuery.query]);
    form.receiveResponse(currentQuery);
    currentQuery.answer = chunk;
    index++;

    if (index === 4) {
      process.stdin.emit('closed');
    }
  });

  process.stdin.on('closed', () => {
    console.log('Thank You');
    console.log(form + '');
    process.exit(0);
  });
};

const main = () => {
  const queries = [{ query: 'name' }, { query: 'dob' }, { query: 'hobbies' }];

  const form = new Form(queries);
  getUserResponses(form, queries);
};

main();
