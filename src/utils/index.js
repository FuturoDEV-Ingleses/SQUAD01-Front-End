// utils.js

export const postData = async (path, data) => {
  try {
    const response = await fetch(`http://localhost:3333/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to post data");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
  }
};

export const getData = async (path) => {
  try {
    const response = await fetch(`http://localhost:3333/${path}`);

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
  }
};

export const updateData = async (path, id, data) => {
  try {
    const response = await fetch(`http://localhost:3333/${path}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update data");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
  }
};
