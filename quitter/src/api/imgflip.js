
export const getIMGFlipTemplates = async () => {
    const response = await fetch('https://api.imgflip.com/get_memes');
    if (response.ok) {
        return response.json();
    }
};

export const postIMGFlipCaption = async (texts, templateId) => {
    let params = `template_id=${templateId}&username=${process.env.REACT_APP_IMGFLIP_USERNAME}&password=${process.env.REACT_APP_IMGFLIP_PASSWORD}`;
    
    Object.entries(texts).forEach(entry => {
        const [key, value] = entry;
        params += `&boxes[${key}][text]=${value}`;
    });

    const response = await fetch(`https://api.imgflip.com/caption_image?${params}`, {
        method: 'POST'
    });
    if (response.ok) {
        return response.json();
    }
}