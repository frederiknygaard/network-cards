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

    let response = await fetch(OPTIONS.API.ROOTURL, requestOptions);
    
    if (response.status !== 200) {
        return response.errors;
    }
    
    return await response.json();
}

export {
    loginUser
}