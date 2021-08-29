const gameModel = require('../models/games');

class GameControlelr {
    /**[GET] /api/games
     * response all game imgs
     * public
     */
    async index(req, res) {
        try {
            const response = await gameModel.find({}).sort({ createdAt: 'desc' });
            console.log('vo r');
            return res.json({ success: true, message: 'successfully', response });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'internal server' });
        }
    }
    /** [GET] /api/games/adminGet
     *  Admin get trash and list game
     *  private
     */
    async adminGet(req, res, next) {
        try {
            const [listResponse, trashResponse] = await Promise.all([
                gameModel.find({}),
                gameModel.findDeleted()
            ]);
            return res.json({ success: true, message: 'successfully', listResponse, trashResponse });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'internal server' });
        }
    }
    /**[POST] /api/games/ 
     * Store new game img
     * private
    */
    async addMany(req, res) {
        const { data } = req.body;

        if (!data.length)
            return res.json({ success: false, message: 'bad request' });

        try {
            const newImgs = data.map(value => { return { img: value } });
            const newGame = await gameModel.create(newImgs);
            return res.json({ success: true, message: 'successfully', response: newGame });

        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'internal server' })
        }
    }
    /** [DELETE] /api/games/delete
     *  Force Delete games
     *  private 
     */
    async delete(req, res) {
        const data = req.body ? req.body : [];
        if (!data.length)
            return res.status(400).json({ success: false, message: 'bad request' });

        try {
            await gameModel.deleteMany({ _id: { $in: data } });
            return res.json({ success: true, message: 'successfully', response: data });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'internal server' });
        }
    }
}

module.exports = new GameControlelr;