const assert = require('assert');
const { Field } = require('../src/Form');

describe('Field', () => {
  it('Should validate the given object is an Field', () => {
    const f1 = new Field('name', 'Enter name');
    const f2 = new Field('name', 'Enter name');

    assert.ok(f1.equals(f2));
  });

  it('Should fill the response', () => {
    const nameField = new Field('name', 'Enter name');
    nameField.fill('sai');

    assert.ok(nameField.isFilled());
  });
});
