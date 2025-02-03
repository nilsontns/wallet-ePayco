export const generateToken = (): string => {
    const token = Math.floor(100000 + Math.random() * 900000).toString(); // Generar un código de 6 dígitos
    return token;
};