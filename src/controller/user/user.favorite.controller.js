const FavoriteServices = require('../../services/favorite.service');
const favoriteService = new FavoriteServices();

exports.addToFavorite = async (req, res) => {
    try {
        let Favorite = await favoriteService.getFavorite({ favoriteItem: req.body.favoriteItem ,user: req.user._id ,isDelete : false});
        console.log(Favorite);
        if (Favorite) {
            return res.json({ message: "Product already added to the Favorites" });
        };
        Favorite = await favoriteService.addToFavorite({
            ...req.body,user: req.user._id
        });
        return res.json({Favorite,message: "Product added to favorite succesfully"});
    } catch (error) {
        console.log(error);
        return res.json({ message: "somthing went wrong" });
    }
};

exports.getAllFavorite = async (req,res)=>{
    try {
        let Favorite = await favoriteService.getAllFavorites({user: req.user._id , isDelete: false});
        if (!Favorite) {
            return res.json({message: "Favorite Product is not found"});
        };
        return res.json({Favorites: Favorite});
    } catch (error) {
        console.log(error);
        return res.json({message: "somthing wrong"});
    }
};

exports.deleteFavorite = async(req,res)=>{
    try {
        let Favorite = await favoriteService.getFavorite({user: req.user._id ,isDelete : false});
        console.log(Favorite);
        if (!Favorite) {
            return res.json({message: "Favorite Item is not found.."});
        };
        Favorite = await favoriteService.updateFavorite(req.body.favoriteID,{isDelete: true});
        return res.json({message: "Favorite Item is deleted succesfully"});
    } catch (error) {
        console.log(error);
        return res.json({message: "somthing went wrong"});
    }
};