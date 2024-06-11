import React, { useState } from 'react';
import { setReview } from "@/HTTP/Review.js";
import {useTranslation} from "react-i18next";

const CommentForm = ({ id }) => {
    const [newComment, setNewComment] = useState('');
    const [rating, setRating] = useState(0);
    const { t, i18n } = useTranslation();
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim() && rating >= 0 && rating <= 5) {
            setReview(id, newComment, rating).then(response => {
            }).catch((error) => {
            });
            setNewComment('');
            setRating(0);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">{t('leaveAComment')}</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <textarea
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    placeholder={t('addCommentPlaceholder')}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <select
                    className="w-full mt-4 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                >
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
                <button
                    type="submit"
                    className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                >
                    {t('addCommentButton')}
                </button>
            </form>
        </div>
    );
};

export default CommentForm;
