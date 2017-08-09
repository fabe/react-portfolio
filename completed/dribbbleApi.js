import 'whatwg-fetch';

const dribbbleApi = {
  shots: (username, callback) => {
    fetch(`https://api.dribbble.com/v1/users/${username}/shots`, {
      headers: {
        Authorization: 'Bearer 4e1af5248a97070a3f2668e27478b070f57b7812b88b99d5a0662433608fd68e',
      },
    })
      .then(res => res.json())
      .then(shots => callback(shots));
  },
};

export default dribbbleApi;
