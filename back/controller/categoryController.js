import { getAllCategoriesM } from "../modules/categoryModule.js"; // Įsitikink, kad kelias teisingas

export const getAllCategoriesC = async (req, res, next) => {
  try {
    const categories = await getAllCategoriesM();
    
    // Grąžiname duomenis tiesiogiai kaip masyvą, 
    // nes tavo Front-end tikisi res.data.filter(...)
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};