import supertest from "supertest";
import app from "../index";
import resizeImg from "../utilities/resize";
const path = require("path");

//test for endpoints
const request = supertest(app);
describe("Test endpoint responses", () => {
  it("gets the api endpoint", async () => {
    const response = await request.get("/api");
    expect(response.status).toBe(200);
  });
});

//test if the image resized using sharp
it("excpect to resized the image with 100 height and 100 width", () => {
  // get orginalIMG path
  const orginalIMG: string = path.join(
    __dirname,
    "../",
    "../",
    "../",
    "images",
    "full",
    "fjord.jpg"
  );

  //get resizedIMG path
  const resizedIMG: string = path.join(
    __dirname,
    "../",
    "../",
    "../",
    "images",
    "thumbnails",
    "fjord-100-100.jpg"
  );
  resizeImg(orginalIMG, resizedIMG, 100, 100);
  expect(resizedIMG).toBeTruthy();
});
