class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.numb = 0;
    this.listOfBuckets = [];
    for (let i = 0; i < this.capacity; i++) {
      let obj = [];
      this.listOfBuckets.push(obj);
    }
  }

  resize() {
    let oldListOfBuckets = this.listOfBuckets;
    this.capacity = this.capacity * 2;
    this.listOfBuckets = [];
    this.numb = 0;
    for (let i = 0; i < this.capacity; i++) {
      let bucket = [];
      this.listOfBuckets.push(bucket);
    }
    for (let buck of oldListOfBuckets) {
      for (let obj of buck) {
        if (obj) {
          this.set(obj.key, obj.value);
        }
      }
    }
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    let numb = hashCode % this.capacity;
    return numb;
  }

  set(theKey, theValue) {
    let load = this.capacity * this.loadFactor;
    if (this.numb >= load) {
      this.resize();
    }
    let theHashCode = this.hash(theKey);
    let newObj = { key: theKey, value: theValue };
    let theBuckets = this.listOfBuckets[theHashCode];
    let foundBucket;
    if (theBuckets.length > 0) {
      for (let bucket of theBuckets) {
        if (bucket.key == newObj.key) {
          foundBucket = bucket;
        }
      }
      if (!foundBucket) {
        theBuckets.push(newObj);
        this.numb++;
        return;
      } else if (foundBucket) {
        foundBucket.value = newObj.value;
      }
    } else {
      theBuckets.push(newObj);
      this.numb++;
    }
  }

  get(theKey) {
    let theBuckets = this.listOfBuckets;

    let index = this.hash(theKey);
    let bucket = theBuckets[index];
    for (let obj of bucket) {
      if (obj) {
        if (obj.key == theKey) {
          return obj.value;
        }
      }
    }
    return null;
  }

  has(theKey) {
    let theBuckets = this.listOfBuckets;

    let index = this.hash(theKey);
    let bucket = theBuckets[index];
    for (let obj of bucket) {
      if (obj) {
        if (obj.key == theKey) {
          return true;
        }
      }
    }
    return false;
  }

  remove(theKey) {
    let theBuckets = this.listOfBuckets;

    let ind = this.hash(theKey);
    let bucket = theBuckets[ind];
    for (let obj of bucket) {
      if (obj) {
        if (obj.key == theKey) {
          let index = bucket.indexOf(obj);
          bucket.splice(index, 1);
          this.numb--;
          return true;
        }
      }
    }
    return false;
  }

  length() {
    // let theBuckets = this.listOfBuckets;
    // let amount = 0;
    // for (let bucket of theBuckets) {
    //   for (let obj of bucket) {
    //     if (obj) {
    //       amount++;
    //     }
    //   }
    // }
    // return amount;
    return this.numb;
  }

  clear() {
    let theBuckets = this.listOfBuckets;

    for (let bucket of theBuckets) {
      for (let i = bucket.length - 1; i >= 0; i--) {
        if (bucket[i]) {
          let index = bucket.indexOf(bucket[i]);
          bucket.splice(index, 1);
        }
      }
    }
    this.numb = 0;
  }

  keys() {
    let theBuckets = this.listOfBuckets;
    let arr = [];
    for (let bucket of theBuckets) {
      for (let obj of bucket) {
        if (obj) {
          arr.push(obj.key);
        }
      }
    }
    return arr;
  }
  values() {
    let theBuckets = this.listOfBuckets;
    let arr = [];
    for (let bucket of theBuckets) {
      for (let obj of bucket) {
        if (obj) {
          arr.push(obj.value);
        }
      }
    }
    return arr;
  }

  entries() {
    let theBuckets = this.listOfBuckets;
    let arr = [];
    for (let bucket of theBuckets) {
      for (let obj of bucket) {
        if (obj) {
          let arrBucket = [];
          arrBucket.push(obj.key);
          arrBucket.push(obj.value);
          arr.push(arrBucket);
        }
      }
    }
    return arr;
  }
}

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test);
test.set("lion", "orange");
console.log(test.get("lion"));
test.set("moon", "silver");

console.log(test.length());
console.log(test);
