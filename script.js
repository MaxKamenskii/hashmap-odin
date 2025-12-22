class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.listOfBuckets = [];
    for (let i = 0; i < this.capacity; i++) {
      let obj = [];
      this.listOfBuckets.push(obj);
    }
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    let numb = hashCode % 16;
    return numb;
  }

  set(theKey, theValue) {
    let theHashCode = this.hash(theKey);
    let newObj = { key: theKey, value: theValue };
    let theBuckets = this.listOfBuckets[theHashCode];
    if (theBuckets.length > 0) {
      for (let bucket of theBuckets) {
        if (bucket.key == newObj.key) {
          bucket.value = newObj.value;
        } else {
          theBuckets.push(newObj);
        }
      }
    } else {
      theBuckets.push(newObj);
    }
  }

  get(theKey) {
    let theBuckets = this.listOfBuckets;

    for (let bucket of theBuckets) {
      for (let obj of bucket) {
        if (obj) {
          if (obj.key == theKey) {
            return obj.value;
          }
        }
      }
    }
    return null;
  }
}

const test = new HashMap();
test.set("Rama", 23);
test.set("Sita", 33);
test.set("hello", 100);
test.set("apple", 200);
test.set("apple", 300);
// console.log(test);

console.log(test.get("Sita"));
