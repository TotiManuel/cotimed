import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
    res.json({
        mensagem: "API CotiMed funcionando!"
    });
});

export default router;