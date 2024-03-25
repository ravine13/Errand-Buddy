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
    return parseJwt(decryptObject).sub;
    
  }
  return null;
}

function retrieveErrandBoy() {
  const user = retrieve();
  return user ? user.errandBoy : null;
}

function remove() {
  if (localStorage.getItem("jwt")) {
    localStorage.removeItem("jwt");
  }
}

export { store, retrieve, retrieveErrandBoy, remove };
