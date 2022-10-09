import express from "express";
import imgRoutes from "./api/images_router";
const routes = express.Router();

routes.get(
  "/",
  async (req: express.Request, res: express.Response): Promise<void> => {
    res.status(200).send("main images api route");
  }
);

routes.use("/images_router", imgRoutes);

export default routes;
