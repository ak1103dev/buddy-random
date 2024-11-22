import { describe, expect, it } from "bun:test";
import { reArrange } from "../index";

describe("Test Re-arrange", () => {
  it("should return empty array when input is empty", () => {
    const result = reArrange([])
    expect(result).toEqual([]);
  });

  it("should return swap when input is 2 people", () => {
    const input = [{
      name: 'A',
      email: 'a@yopmail.com'
    }, {
      name: 'B',
      email: 'b@yopmail.com'
    }]
    const result = reArrange(input)
    const expected = [{
      name: 'A',
      email: 'a@yopmail.com',
      buddy: 'B'
    }, {
      name: 'B',
      email: 'b@yopmail.com',
      buddy: 'A'
    }]
    expect(result).toEqual(expected);
  });

  it("should return name and buddy is not same when input is 3 people", () => {
    const input = [{
      name: 'A',
      email: 'a@yopmail.com'
    }, {
      name: 'B',
      email: 'b@yopmail.com'
    }, {
      name: 'C',
      email: 'c@yopmail.com'
    }]
    const result = reArrange(input)
    const expected1 = [{
      name: 'A',
      email: 'a@yopmail.com',
      buddy: 'B'
    }, {
      name: 'B',
      email: 'b@yopmail.com',
      buddy: 'C'
    }, {
      name: 'C',
      email: 'c@yopmail.com',
      buddy: 'A'
    }]
    const expected2 = [{
      name: 'A',
      email: 'a@yopmail.com',
      buddy: 'C'
    }, {
      name: 'B',
      email: 'b@yopmail.com',
      buddy: 'A'
    }, {
      name: 'C',
      email: 'c@yopmail.com',
      buddy: 'B'
    }]
    expect([expected1, expected2]).toContainEqual(result);
  })

  // it("should return name and buddy is not same when input is 10 people", () => {
  //   const input = [{
  //     name: 'A',
  //     email: 'a@yopmail.com'
  //   }, {
  //     name: 'B',
  //     email: 'b@yopmail.com'
  //   }, {
  //     name: 'C',
  //     email: 'c@yopmail.com'
  //   }, {
  //     name: 'D',
  //     email: 'd@yopmail.com'
  //   }, {
  //     name: 'E',
  //     email: 'e@yopmail.com'
  //   }, {
  //     name: 'F',
  //     email: 'f@yopmail.com'
  //   }, {
  //     name: 'G',
  //     email: 'g@yopmail.com'
  //   }, {
  //     name: 'H',
  //     email: 'h@yopmail.com'
  //   }, {
  //     name: 'I',
  //     email: 'i@yopmail.com'
  //   }, {
  //     name: 'J',
  //     email: 'j@yopmail.com'
  //   }]
  // })

});
