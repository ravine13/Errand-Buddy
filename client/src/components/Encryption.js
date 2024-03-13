import crypto from "crypto-js";
const secretKey = "GsWjudV09e";
function store(userObject) {
  const encryptedObject = crypto.AES.encrypt(
    JSON.stringify(userObject),
    secretKey
  ).toString();
  localStorage.setItem("jwt", encryptedObject);
}

function retrieve() {
  const decryptObject = localStorage.getItem("jwt");

  if (decryptObject) {
    const parseJwt = (decryptObject) => {
      try {
        return JSON.parse(atob(decryptObject.split('.')[1]));
      } catch (e) {
        return null;
      }
    };
    return parseJwt(decryptObject);
    // const obj = crypto.AES.decrypt(decryptObject, secretKey).toString(
    //   crypto.enc.Utf8
      // var decrypted = CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
    // );
    // console.log(obj)
    // return JSON.parse(obj);
  }
  return null;
}

function remove() {
  if (localStorage.getItem("jwt")) {
    localStorage.removeItem("jwt");
  }
}

export { store, retrieve, remove };
