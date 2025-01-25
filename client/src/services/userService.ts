const BASE_URL = "http://localhost:3000";

interface FormProps {
  email: string,
  firstname?: string,
  lastname?: string,
  password: string
}

async function loginUser(credentials: FormProps): Promise<{accessToken: string}> {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {"Content-Type": "application/json"}
    });

    if (!response.ok) {
      throw new Error("error logging in user");
    }
    return await response.json();
  } catch (e) {
    throw new Error(`API Error: ${e}`);
  }
}

async function registerUser(userData: FormProps): Promise<{accessToken: string}> {
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {"Content-Type": "application/json"}
      });

      if (!response.ok) {
        throw new Error("error registering user");
      }
      return await response.json();
    } catch (e) {
      throw new Error(`API Error: ${e}`);
    }
}

export {loginUser, registerUser}