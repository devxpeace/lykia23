module.exports = function (title, description, Imageurl){
    const embed = {
        "title": title,
        "description": description,
        "color": 16751104,
        "image": {
            "url":Imageurl
        }
    };
    return embed;
}
