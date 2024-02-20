import { test, expect } from "@playwright/test";
import { dataDummy } from "../../components/randomPost";

const baseURL = `https://fakerestapi.azurewebsites.net/api`;

// GET - List all activities
test("GET Activities ", async ({ request }) => {
  const response = await request.get(`${baseURL}/v1/Activities`);
  const responseBody = await response.json();
  console.log(responseBody);

  // verify response :: must have props : id / title / dueDate / completed
  expect(response.status()).toBe(200);
  expect(responseBody[0]).toHaveProperty("id");
  expect(responseBody[0]).toHaveProperty("title");
  expect(responseBody[0]).toHaveProperty("dueDate");
  expect(responseBody[0]).toHaveProperty("completed");
});

test("Created / GET / DELETE {ID} ", async ({ request }) => {
  let getID: number;

  // Create new acitivities
  const response = await request.post(`${baseURL}/v1/Activities`, {
    data: dataDummy,
  });

  const postResponseBody = await response.json();
  getID = postResponseBody.id;

  if (response.statusText() === "OK" && response.status() === 200) {
    console.log(`created ID success with ID : ${getID}`);
    console.log(postResponseBody);
    expect(postResponseBody.id).not.toBe("null");
    expect(typeof postResponseBody.id).toBe("number");
    expect(typeof postResponseBody.title).toBe("string");
    expect(typeof postResponseBody.dueDate).toBe("string");
    expect(typeof postResponseBody.completed).toBe("boolean");

    // Check ID after creation
    const responseID = await request.get(`${baseURL}/v1/Activities/${getID}`);
    const responseBodyID = await responseID.json();
    console.log(`view get ID created : ${getID}`);
    console.log(responseBodyID);
    expect(postResponseBody.id).not.toBe("null");
    expect(typeof postResponseBody.id).toBe("number");
    expect(typeof postResponseBody.title).toBe("string");
    expect(typeof postResponseBody.dueDate).toBe("string");
    expect(typeof postResponseBody.completed).toBe("boolean");

    // Delete created ID
    const deleteID = await request.delete(`${baseURL}/v1/Activities/${getID}`);
    expect(deleteID.status()).toBe(200);
  } else {
    expect(response.status()).toBeFalsy();
    console.log("Failed to Create ID or no ID returned");
  }
});
