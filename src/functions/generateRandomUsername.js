
const generateRandomUsername = async () => {
    const randomNumbers = Math.floor(100000 + Math.random() * 900000); // Genera 6 números aleatorios

    return `user${randomNumbers}`;
};

  export default generateRandomUsername;