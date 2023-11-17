
const generateUserProfilePic = async (userName) => {
    const randomPic = 'https://api.dicebear.com/7.x/notionists-neutral/svg?seed=' + userName + "&radius=10&size=96";
    
    return randomPic;
};

  export default generateUserProfilePic;