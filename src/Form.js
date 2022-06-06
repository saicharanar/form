class Form {
  #queries;
  constructor(queries) {
    this.#queries = queries;
  }

  receiveResponse(query, answer) {
    const currentQuery = this.#queries.find(
      (currentQuery) => currentQuery.query === query
    );

    currentQuery.answer = answer;
  }

  currentQuery() {
    return this.#queries.find((query) => {
      return !query.answer;
    }).query;
  }

  isAllResponsesReceived() {
    return this.#queries.every((query) => {
      return query.answer;
    });
  }

  toString() {
    return JSON.stringify(this.#queries);
  }
}

exports.Form = Form;
