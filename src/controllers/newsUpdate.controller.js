const NewsUpdate = require('../models/NewsUpdate');
const multer = require('multer');



const getNewsUpdate = async (req, res) => {
  try {
    const news = await NewsUpdate.find().sort({ createdAt: -1 });
    if (news.length === 0) {
      return res.status(404).json({ message: 'No news updates found.' });
    } else {
      //  console.log(news)
      res.json(news);
    }
  } catch (error) {
    console.error('Error fetching news updates:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getANews = async (req, res) => {
  const { newsId } = req.query
  console.log(newsId, "newsId")
  try {
    const oneNews = await NewsUpdate.findById(newsId);
    if (oneNews === null) {
      return res.status(404).json({ message: 'No news updates found.' });
    }
    res.json(oneNews);

  } catch (error) {
    console.log(error)
  }
}

const createNews = async (req, res) => {
  const { title, content } = req.body;
  const image = req.file ? req.file.path : null; // Get the uploaded file path

  try {
    const createNewsUpdate = new NewsUpdate({
      title,
      content,
      image
    });
    const savedNewsUpdate = await createNewsUpdate.save();
    res.status(201).json(savedNewsUpdate);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}


const editNews = async (req, res) => {
  const { title, content, id } = req.body;
  const image = req.file ? req.file.path : null; 

  try {
    const updatedNews = await NewsUpdate.findByIdAndUpdate(
      id,
      {
        title,
        content,
        image
      },
      { new: true }
    );

    if (!updatedNews) {
      return res.status(404).json({ error: 'News not found' });
    }
    res.status(200).json(updatedNews);

  } catch (error) {
    console.log(error)
  }
}

const deleteNews = async(req, res) => {
  const {id} = req.query;
  console.log(id);
  
  try {
    const deleteNews = await NewsUpdate.findByIdAndDelete(id);
    if(!deleteNews){
      res.status(400).json({error: "News not found"})
    } 
    res.json({message: "News Deleted"})
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createNews,
  getNewsUpdate,
  getANews,
  editNews,
  deleteNews
}