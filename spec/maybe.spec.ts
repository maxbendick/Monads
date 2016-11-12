import { Maybe } from '../src/maybe';

describe("Smoke", function () {
   it("should pass", function () {
      expect(true).toBe(true);
   });
});

describe("Construction", function () {
   describe("Static construction", function () {
      it("can construct Just", function () {
         Maybe.Just(1);
      });
      it("can construct Nothing", function () {
         Maybe.Nothing();
      });
   });
   describe("From nil", function () {
      it("turns null to Nothing", function () {
         expect(Maybe.fromNil(null).isJust()).toBe(false);
      });
      it("turns undefined to Nothing", function () {
         expect(Maybe.fromNil(undefined).isJust()).toBe(false);
      });
      it("turns 0 to Just 0", function () {
         const m: Maybe<number> = Maybe.fromNil(0);
         expect(m.isJust()).toBe(true);
         expect(m.of()).toEqual(0);
      });
   });
});

describe("Monad methods", function () {
   describe("Map", function () {
      it("should be able to chain maps ending with Just", function () {
         const plus1 = (a: number) => a + 1;
         const mInput: Maybe<number> = Maybe.fromNil(0);
         const mResult: Maybe<number> = mInput.map(plus1).map(plus1).map(plus1);
         expect(mResult.isJust()).toBe(true);
         expect(mResult.of()).toEqual(3);
      });
      it("should be able to chain maps ending with Nothing", function () {
         const plus1 = (a: number) => a + 1;
         const mInput: Maybe<number> = Maybe.fromNil(0);
         const mResult: Maybe<number> = mInput.map(plus1).map((x: number) => null).map(plus1);
         expect(mResult.isJust()).toBe(false);
      });
   });
   describe("Flat Map/Bind", function () {
      it("should be able to chain flat maps ending with Just", function () {
         const plus1 = (a: number) => Maybe.Just(a + 1);
         const mInput: Maybe<number> = Maybe.fromNil(0);
         const mResult: Maybe<number> = mInput.flatMap(plus1).flatMap(plus1).flatMap(plus1);
         expect(mResult.isJust()).toBe(true);
         expect(mResult.of()).toEqual(3);
      });
      it("should be able to chain flat maps ending with Nothing", function () {
         const plus1 = (a: number) => Maybe.Just(a + 1);
         const mInput: Maybe<number> = Maybe.fromNil(0);
         const mResult: Maybe<number> = mInput.flatMap(plus1).flatMap((x: number) => Maybe.Nothing()).flatMap(plus1);
         expect(mResult.isJust()).toBe(false);
      });
   });
   describe("Apply", function () {

   });
});