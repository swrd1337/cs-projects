const LT_BASE_URL = process.env.REACT_APP_LANG_TOOL_BASE_URL;

export const getLanguages = async () => {
    const response = await fetch(`${LT_BASE_URL}languages`);

    if (response.ok) {
        return response.json();
    }

    throw new Error(`Can't connect to LanguageTool instance.`);
}

export const checkText = async (lang, value) => {
    const text = value.replaceAll(' ', '+');
    const response = await fetch(`${LT_BASE_URL}check?language=${lang}&text=${text}`, {
        method: 'POST'
    });

    if (response.ok) {
        return response.json();
    }

    throw new Error(`Can't connect to LanguageTool instance.`);
}