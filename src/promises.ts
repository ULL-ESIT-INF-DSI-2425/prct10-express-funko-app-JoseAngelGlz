const myPromise = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    resolve("This is a successful result");
    reject("This is an error");
  }, 1000);
});

myPromise
  .then((result) => {
    console.log("Success:", result);
  })
  .catch((error) => {
    console.log("Error:", error);
  });

  
const concatenate = (firstString: string, secondString: string) => {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (firstString.length === 0 || secondString.length === 0) {
        reject("Any of both arguments can be an empty string");
      } else {
        resolve(firstString + secondString);
      }
    }, 1000);
  });
};

concatenate("Hello ", "World! ")
  .then((myString) => {
    return concatenate(myString, "I am Eduardo. ");
  })
  .then((myString2) => {
    return concatenate(myString2, "");
  })
  .then((myString3) => {
    console.log(myString3);
  })
  .catch((error) => {
    console.log(error);
  });