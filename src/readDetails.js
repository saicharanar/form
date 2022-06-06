const { Form } = require('./Form');

const questions = {
  name: 'Please enter your name',
  dob: 'Please enter your dob YYYY-MM-DD',
  hobbies: 'Please enter your hobbies',
};

const getUserResponses = (queries) => {
  let index = 0;
  console.log(questions[currentQuery.query]);
  process.stdin.on('data', (chunk) => {
    const currentQuery = queries[index];
    console.log(chunk);
  });
};

const main = () => {
  const queries = [{ query: 'name' }, { query: 'dob' }, { query: 'hobbies' }];

  const form = new Form(queries);
  getUserResponses(queries);
};

main();
