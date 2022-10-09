import express from "express";
import resizeImg from "../../utilities/resize";

var promises_1 = require("fs").promises;
const path = require("path");
const imgRoutes = express.Router();

//get the images input then handle the image

imgRoutes.get(
  "/",
  async (req: express.Request, res: express.Response): Promise<void> => {
    //get the inputs: name,width, hieght
    const name: string = req.query.name as string;
    const width: number = parseInt(req.query.width as string);
    const height: number = parseInt(req.query.height as string);

    //read all images from the thumbnails folder using fs.readdir
    //to check if the image is already exsits with the same width and height
    const thumbnails: string[] = await promises_1.readdir("images/thumbnails");

    // get orginalIMG path
    const orginalIMG: string = path.join(
      __dirname,
      "../",
      "../",
      "../",
      "images",
      "full",
      `${name}.jpg`
    );

    //get resizedIMG path
    const resizedIMG: string = path.join(
      __dirname,
      "../",
      "../",
      "../",
      "images",
      "thumbnails",
      `${name}-${width}-${height}.jpg`
    );

    //display the image
    //case 1 without any width and height
    try {
      if (!width && !height) {
        //display image as is
        res.status(200).sendFile(orginalIMG);
      }
      //there's a width and height, resize image then save it to thumbnails
      else {
        //if images exsits in thumbnail folder, just display it
        if (thumbnails.includes(`${name}-${width}-${height}.jpg`)) {
          console.log("image already exsits");
          res.status(200).sendFile(resizedIMG);
        }
        //else resize the image and save it to thumbnails
        else {
          //if images has invalid width and height
          if (Math.sign(width) == -1 || Math.sign(height) == -1) {
            res
              .status(404)
              .send(
                "The width and height you entered are invalid, please try again"
              );
          } else {
            await resizeImg(orginalIMG, resizedIMG, width, height);
            //wait for image to be resized first
            await res.status(200).sendFile(resizedIMG);
            console.log("after resizing image");
          }
        }
      }
    } catch (error) {
      res
        .status(404)
        .send("The width and height you entered are invalid, please try again");
    }
  }
);

export default imgRoutes;
