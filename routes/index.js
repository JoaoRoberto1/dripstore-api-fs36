import swaggerJSDoc from "swagger-jsdoc";
import { categoriaController } from "../controllers/categoria/categoria.controller";
import { produtoController } from "../controllers/produto/produto.controller";
import { usuarioController } from "../controllers/usuario/usuario.controller";
import { swaggerOptions } from "../config/swagger/swagger.config";
import { loginController } from "../controllers/login/login.controller";
import swaggerUi from "swagger-ui-express";

const swaggerSpec = swaggerJSDoc(swaggerOptions)

const routes = (app) => {
    app.get("/", (req, res) => {
        res.send("Servidor rodando!");
    });

    produtoController(app);
    categoriaController(app);
    loginController(app);
    usuarioController(app);


    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default routes;