const { Model, DataTypes, Sequelize } = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize(process.env.DATABASE_URL,{logging :false});

class FAQ extends Model {
  // Method to get translated text dynamically
  getTranslatedText(field, lang = "en") {
    const translations = this.translations || {}; 
    // Fallback to an empty object if translations are undefined
    if(!translations[lang]){
        return null;
    }
    const translatedText = translations[lang][field]; 
    // Access the translation safely using optional chaining
    return translatedText || this[field]; // Return translated text or fallback to original
}

}

FAQ.init(
  {
    question: { type: DataTypes.TEXT, allowNull: false },
    answer: { type: DataTypes.TEXT, allowNull: false },
    translations: { type: DataTypes.JSONB, allowNull: true }, // Store translations as JSONB
  },
  { sequelize, modelName: "FAQ" }
);

sequelize
  .sync() // `force: true` will drop the table if it already exists
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

module.exports = FAQ;