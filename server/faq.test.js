
const test = require("node:test");
const assert = require("node:assert/strict");
const faq = require("./faq");

test("FAQ must contain at least one entry", () => {
  assert.ok(Array.isArray(faq));
  assert.ok(faq.length > 0);
});

test("Every FAQ entry must have a question and answer", () => {
  for (const item of faq) {
    assert.equal(typeof item.question, "string");
    assert.ok(item.question.trim().length > 0);

    assert.equal(typeof item.answer, "string");
    assert.ok(item.answer.trim().length > 0);
  }
});

test("FAQ questions must be unique", () => {
  const questions = faq.map((item) =>
    item.question.trim().toLowerCase()
  );

  assert.equal(new Set(questions).size, questions.length);
});
