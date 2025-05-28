import axios from 'axios';

export async function getImagesByQuery(query, page) {
    const params = {
        key: "50422817-e50accda15a7155d4d1bff625",
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page,
        per_page: 15,
    };   
    try {
        const response = await axios.get("https://pixabay.com/api/", { params })
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
} 