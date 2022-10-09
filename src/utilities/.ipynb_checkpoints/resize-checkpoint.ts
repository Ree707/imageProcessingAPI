const sharp = require("sharp");
//use sharp to resize images

const resizeImg: Function = async (
  inputImg: string,
  outputImg: string,
  width: number = 500,
  height: number = 500
): Promise<void> => {
  // console.log(inputImg);
  //console.log(outputImg);
  await sharp(inputImg).resize(width, height).toFile(outputImg);
};

export default resizeImg;
