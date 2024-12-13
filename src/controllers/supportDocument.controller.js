const SupportCategory = require('../models/SupportCategory');
const SupportDocument = require('../models/SupportDocument');
const SupportSubCategory = require('../models/SupportSubCategory')


//--------------------------------------------------------------------------------------------------------categories-------------------------
//--------------------------------------------------------------------------------------------------------categories-------------------------
//--------------------------------------------------------------------------------------------------------categories-------------------------
//--------------------------------------------------------------------------------------------------------categories-------------------------

const addCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!description || description.trim() == "" || !name || name.trim() == "") {
            return res
                .status(500)
                .json("Name or description missing for support category")
        }

        const category = new SupportCategory({ name, description });
        await category.save();
        res
            .status(201)
            .json(category);

    } catch (err) {
        res
            .status(500)
            .json({ error: 'Failed to create category' });
    }
}
const getCategories = async (req, res) => {
    try {
        const categories = await SupportCategory.find().populate("subcategories");
        res
            .status(200)
            .json(categories)
    } catch (error) {
        res
            .status(500)
            .json({ error: "Can not get categories" })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await SupportCategory.findByIdAndDelete(id);
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ message: "Failed to delete category" });
    }
}

//--------------------------------------------------------------------------------------------------------sub-categories-------------------------
//--------------------------------------------------------------------------------------------------------sub-categories-------------------------
//--------------------------------------------------------------------------------------------------------sub-categories-------------------------
//--------------------------------------------------------------------------------------------------------sub-categories-------------------------
//--------------------------------------------------------------------------------------------------------sub-categories-------------------------

const addSubCategory = async (req, res) => {
    try {
        const { name, category } = req.body;

        if (!category || category.trim() === "") {
            return res
                .status(400)
                .json({ error: 'Category ID is missing' });
        }

        const categoryExists = await SupportCategory.findById(category)
        if (!categoryExists) {
            return res
                .status(404)
                .json({ error: 'Category not found' });
        }

        const subCategory = new SupportSubCategory({ name, category: category });


        await subCategory.save();
        const subCategoryWithCategory = await SupportSubCategory
            .findById(subCategory._id)
            .populate('category');
        const populated = await SupportCategory.findByIdAndUpdate(category, {
            $push: { subcategories: subCategory._id }, // Push the subcategory ID to the category's subcategories array
        });

        res
            .status(201)
            .json(subCategoryWithCategory);



    } catch (err) {
        res.
            status(500)
            .json({ error: 'Failed to create subcategory' });
    }
}


const getSubCategories = async (req, res) => {
    try {
        const { categoryId } = req.body
        const subCategoriesById = await SupportSubCategory.find({ category: categoryId }).populate('category')
        if (subCategoriesById) {
            res
                .status(200)
                .json(subCategoriesById)
        } else {
            res.json("nope, dont think so")
        }
    } catch (error) {
        res
            .status(500)
            .json({ error: 'Failed to get subcategories' });

    }
}

const deleteSubCategory = async (req, res) => {
    try {
        const { categoryId, subCategoryId } = req.params;
        await SupportSubCategory.findByIdAndDelete(subCategoryId);

        // Then update the category to reflect the change
        const updatedCategory = await SupportCategory.findByIdAndUpdate(
            categoryId,
            {
                $pull: { subcategories: { _id: subCategoryId } },
            },
            { new: true } // To get the updated category
        );

        res.status(200).json({ message: "Subcategory deleted successfully" });
    } catch (error) {
        console.error("Error deleting subcategory:", error);
        res.status(500).json({ message: "Failed to delete subcategory" });
    }
}

//-------------------------------------------------------------------------------------------------------support-doc-------------------------
//--------------------------------------------------------------------------------------------------------support-doc------------------------
//-------------------------------------------------------------------------------------------------------support-doc-------------------------
//--------------------------------------------------------------------------------------------------------support-doc------------------------
//-------------------------------------------------------------------------------------------------------support-doc-------------------------
//--------------------------------------------------------------------------------------------------------support-doc------------------------

const addSupportDocument = async (req, res) => {
    try {
        const { title, description, content, subCategory, category } = req.body;
        const document = await new SupportDocument({ title, description, content, subCategory, category })
        await document.save();

        const populatedDocument = await SupportDocument
            .findById(document._id)
            .populate('subCategory')
            .populate('category');
        res.status(200).json(populatedDocument);

    } catch (error) {
        console.error(error)
        res
            .status(500)
            .json({ error: 'Failed to create new support Document' })
    }
}

const getAllSupportDocuments = async (req, res) => {
    try {
        const documents = await SupportDocument.find().populate('subCategory').populate('category');

        if (!documents || documents.length === 0) {
            return res.status(404).json({ message: 'No documents found' });
        }

        res.status(200).json(documents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get documents' });
    }
};


const getSupportDocumentbySubCategory = async (req, res) => {
    try {
        const { subCategoryId } = req.body;

        if (!subCategoryId) return res.status(400).json({ error: 'Subcategory ID is required' });

        const documents = await SupportDocument.find({ subCategory: subCategoryId }).populate('subCategory').populate('category');

        if (!documents || documents.length === 0) return res.status(404).json({ error: 'No documents found for this subcategory' });

        res.status(200).json(documents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get documents' });
    }
};

const getOneSupportDocument = async (req, res) => {
    try {
        const { documentId } = req.body;
        console.log(documentId)
        if (!documentId) return res.status(400).json({ error: 'document ID is required' });
        const document = await SupportDocument.findById(documentId);

        res.status(200).json(document);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get document' });
    }
}


module.exports = {

    addCategory,
    getCategories,
    deleteCategory,

    addSubCategory,
    getSubCategories,
    deleteSubCategory,

    addSupportDocument,
    getAllSupportDocuments,
    getSupportDocumentbySubCategory,
    getOneSupportDocument
}
