import { Router } from "express";
import { createNotification, deleteNotification, getNotification, getNotifications, updateNotification } from "../controllers/notificaciones.controllers.js";

const router = Router()

router.get('/noti', getNotifications)
router.get('/noti/:id', getNotification)
router.post('/noti', createNotification)
router.put('/noti/:id', updateNotification)
router.delete('/noti/:id', deleteNotification)

export default router