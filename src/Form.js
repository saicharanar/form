const findValue = (queries, query) => {
  return queries.find((currentQuery) => currentQuery.query === query).answer;
};

const createObject = (queries) => {
  const name = findValue(queries, 'name');
  const dob = findValue(queries, 'dob').join('-');
  const hobbies = findValue(queries, 'hobbies');
  const ph_no = findValue(queries, 'ph_no');
  const addressLine1 = findValue(queries, 'addressLine1');
  const addressLine2 = findValue(queries, 'addressLine2');

  const address = [addressLine1, addressLine2].join('\n');
  return { name, dob, hobbies, ph_no, address };
};

class Form {
  #queries;
  constructor(queries) {
    this.#queries = queries;
  }

  receiveResponse(query, answer) {
    const currentQuery = this.currentQuery();
    currentQuery.answer = currentQuery.parser(answer.slice(0, -1));
  }

  currentQuery() {
    return this.#queries.find((query) => {
      return !query.answer;
    });
  }

  isAllResponsesReceived() {
    return this.#queries.every((query) => {
      return query.answer;
    });
  }

  toString() {
    const queryObj = createObject(this.#queries);
    return JSON.stringify(queryObj);
  }
}

exports.Form = Form;
