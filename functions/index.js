const functions = require('firebase-functions');
const fetch = require('node-fetch');
const http = require('http');
const request = require('request')

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // include, *same-origin, omit
    headers: {
      // 'Content-Type': 'application/json'
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    // body: JSON.stringify(data) // body data type must match "Content-Type" header
    body: data // body data type must match "Content-Type" header
  });
  return await response; // parses JSON response into native JavaScript objects
}


exports.helloWorld4 = functions.https.onRequest((req, res) => {
  console.log('req', req)
  console.log('req.data', req.data)


  // postData('https://tmclassanalysis-staging.herokuapp.com/register/signup-api/',
  //   {
  //     "email": "user4@mailinator.com",
  //     "password": "12345678",
  //     "first_name": "ABC",
  //     "last_name": "EFG"
  //   }).then((data) => {
  //   console.log(data); // JSON data parsed by `response.json()` call
  //   res.send(data)
  //   return data;
  // }).catch(error => {
  //   console.log(error)
  //   res.send(error)
  // });

  // var values = {
  //   'email': "user4@mailinator.com",
  //   'password': "12345678",
  //   'first_name': "ABC",
  //   'last_name': "EFG"
  // }
  request.post('https://tmclassanalysis-staging.herokuapp.com/register/signup-api/', {
    'email': "user4@mailinator.com",
    'password': "12345678",
    'first_name': "ABC",
    'last_name': "EFG"
  }, (error, response, body) => {
    if (error) {
      console.error(error)
      res.send(error)
    } else {
      console.log(`statusCode: ${response.statusCode}`)
      console.log(body)
      res.send(body)
    }
  })

  // var options = {
  //   hostname: 'https://tmclassanalysis-staging.herokuapp.com',
  //   port: '80',
  //   path: '/register/signup-api/',
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   }
  // };
  // var request2 = http.request(options, function (response) {
  //   response.setEncoding('utf8');
  //   var data_obj = "";
  //   response.on('data', function (data) {
  //     data_obj += data;
  //   });
  //   response.on('end', function () {
  //     console.log(data_obj)
  //     res.send(data_obj)
  //   });
  // });
  // request2.write(values);
  // request2.end();
});

