const router = require("express").Router();
const { Message } = require("../../db/models");

router.post('/', async(req, res, next) => {
	try {
		if (!req.user) {
		  return res.sendStatus(401);
		}
		const { recipientId, conversationId } = req.body;

		await Message.update(
			{ readed: true },
			{
				where: {
					conversationId: conversationId,
					senderId: recipientId,
					readed: false
				}
			}
		);
		res.json({ success: true });
	} catch (error) {
		next(error);
	}
})

module.exports = router;