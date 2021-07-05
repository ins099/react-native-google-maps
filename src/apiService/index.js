import {database} from '../firebase/config';

const submitUser = (Id, name, email) => {
  return new Promise(function (resolve, reject) {
    let key;
    if (Id != null) {
      key = Id;
    } else {
      key = database().ref().push().key;
    }

    data = {
      Id: key,
      Name: name,
      Email: email,
    };
    database()
      .ref('users/' + key)
      .update(data)
      .then(snapshot => {
        resolve(snapshot);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default submitUser;
