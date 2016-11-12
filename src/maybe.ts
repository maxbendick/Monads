export abstract class Maybe<T> {
   constructor() { }

   static Just<T>(a: T): Maybe<T> {
      return new Just(a);
   }
   static Nothing<T>(): Maybe<T> {
      return new Nothing<T>();
   }
   static fromNil<T>(a: T): Maybe<T> {
      return a === null || typeof a === 'undefined'
         ? new Nothing<T>()
         : new Just(a);
   }
   static fromNilError<T>(a: T): Maybe<T> {
      try {
         return a === null || typeof a === 'undefined'
            ? new Nothing<T>()
            : new Just(a);
      }
      catch (e) {
         return new Nothing<T>();
      }
   }

   isNothing() { return !this.isJust() };
   public flatMap = this.bind

   abstract of(): T;
   abstract isJust(): boolean;
   abstract orJust(b: T): T;
   abstract orElse(b: Maybe<T>): Maybe<T>;
   abstract toString(): string;

   //Monad functions
   abstract map<U>(f: (x: T) => U): Maybe<U>;
   abstract bind<U>(f: (x: T) => Maybe<U>): Maybe<U>;
   abstract apply<U>(mf: Maybe<(x: T) => U>): Maybe<U>;
}

export class Just<T> extends Maybe<T> {
   constructor(private a: T) { super(); }
   toString() {
      return "Just " + JSON.stringify(this.a);
   }
   of() {
      return this.a
   }
   isJust() {
      return true;
   }
   orJust(b: T) {
      return this.a;
   }
   orElse(b: Maybe<T>) {
      return this;
   }
   map<U>(f: (x: T) => U): Maybe<U> {
      return Maybe.fromNil<U>(f(this.a));
   }
   bind<U>(f: (x: T) => Maybe<U>): Maybe<U> {
      return f(this.a);
   }
   apply<U>(mf: Maybe<(x: T) => U>): Maybe<U> {
      return mf.isJust()
         ? new Just(mf.of()(this.a))
         : new Nothing<U>()
   }
}

export class Nothing<T> extends Maybe<T> {
   constructor() { super(); }
   toString() {
      return "Nothing";
   }
   of(): T {
      throw new Error("Tried of() of Nothing");
   }
   isJust() {
      return false;
   }
   orJust(b: T) {
      return b;
   }
   orElse(b: Maybe<T>) {
      return b;
   }
   map<U>(f: (x: T) => U): Maybe<U> {
      return new Nothing<U>();
   }
   bind<U>(f: (x: T) => Maybe<U>): Maybe<U> {
      return new Nothing<U>();
   }
   apply<U>(mf: Maybe<(x: T) => U>): Maybe<U> {
      return new Nothing<U>();
   }
}