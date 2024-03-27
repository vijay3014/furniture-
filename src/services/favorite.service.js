const Favorites = require('../model/favorite.model');

module.exports = class FavoriteServices {
    async addToFavorite(body) {
        try {
            return await Favorites.create(body);
        } catch (error) {
            console.log(error);
            return res.json({ message: "SServices error while adding in to favorite" });
        }
    };

    async getFavorite(body){
        try {
            return await Favorites.findOne(body);
        } catch (error) {
            console.log(error);
            return res.json({message: "Services error while getting in to favorite"});
        }
    };

    async getFavoriteById(id){
        try {
            return await Favorites.findById(id);
        } catch (error) {
            console.log(error);
            return res.json({message: "Services error while getting in to favorite by ID"});
        }
    };

    async getAllFavorites(body) {
        try {
            let results = await Favorites.find(body).populate('favoriteItem').populate({
                path: 'user',
                model: 'users',
                select: 'firstName lastName email'
            });
            return results;
        } catch (error) {
            console.log(error);
            return res.json({ message: "SServices error while getting all in to favorite" });
        }
    };

    async updateFavorite(id, body) {
        try {
            return await Favorites.findByIdAndUpdate(id, { $set: body }, { new: true });
        } catch (error) {
            console.log(error);
            return res.json({ message: "Services error while updating in to favorite" });
        }
    };
};