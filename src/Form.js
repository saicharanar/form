class Form {
  #queries;
  constructor(queries) {
    this.#queries = queries;
  }

  receiveResponse(query, answer) {
    const answeredQuery = this.#queries.find(
      (currentQuery) => currentQuery.query === query
    );

    answeredQuery.answer = answer;
  }

  isAllResponsesReceived() {
    return this.#queries.some((query) => {
      return query.answer;
    });
  }

  toString() {
    return JSON.stringify(this.#queries);
  }
}

exports.Form = Form;
