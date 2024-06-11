const Review = require("../models/Review");
const Place = require("../models/Place");

exports.createReview = async (req, res) => {
    try {
        const userData = req.user;
        const { place, text, rating, date } = req.body;

        const review = await Review.create({
            user: userData.id,
            place,
            text,
            rating,
            date,
        });

        const placeData = await Place.findById(place);
        const reviews = await Review.find({ place });
        const totalRatings = reviews.reduce((acc, review) => acc + review.rating, 0);
        const averageRating = totalRatings / reviews.length;

        placeData.averageRating = parseFloat(averageRating.toFixed(1));

        placeData.reviewCounter = reviews.length;
        await placeData.save();

        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

exports.getReviewsForPlace = async (req, res) => {
        try {
            const { placeId } = req.params;
            const reviews = await Review.find({ place: placeId }).populate("user");
            res.status(200).json(reviews);
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error });
        }
    };
