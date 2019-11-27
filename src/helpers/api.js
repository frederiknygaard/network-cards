import OPTIONS from './options';

const loginUser = async ({email, password}) => {
    const requestBody = {
        query: `
          query {
            login(email: "${email}", password: "${password}") {
              userId
              token
              tokenExpiration
            }
          }
        `
    }

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return fetch(OPTIONS.API.ROOTURL, requestOptions)
      .then(response => response.json())
      .then(response => response)
      .catch(err => err);    
}

export {
    loginUser
}