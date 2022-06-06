class Form {
  #queries;
  constructor(queries) {
    this.#queries = queries;
  }

  receiveResponse(query, answer) {
    const currentQuery = this.#queries.find(
      (currentQuery) => currentQuery.query === query
    );

    currentQuery.answer = currentQuery.parser(answer.slice(0, -1));
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

  allQueries() {
    return this.#queries;
  }
}

exports.Form = Form;
