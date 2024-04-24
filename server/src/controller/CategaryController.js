import { Category } from "../db/CategorySchema.js";

const handleResponse = (res, status, message, data = null) => {
    return res.status(status).json({
      message,
      success: status >= 200 && status < 300,
      data,
    });
  };

export const createCategaryData = async (req, res) => {
    try {
        const { id } = req.user;
        const { categoryName, Description, selectedOption } = req.body;
        await Category.create({
            id: Math.floor(Math.random() * 1000),
            name:categoryName,
            description:Description,
            status:selectedOption,
            userId: id,
        });
        return handleResponse(res, 200, "Category created successfully");
    } catch (error) {
        console.log(error);
        return handleResponse(res, 500, error.message);
    }
};

export const getCategaryData = async (req, res) => {
    try {
        const { id } = req.user;
        const categories = await Category.find({ userId: id });
        return handleResponse(res, 200, "Category list", categories);
    } catch (error) {
        console.log(error);
        return handleResponse(res, 500, error.message);
    }
}

// export const updateCategaryData = async (req, res) => {
//     try {
//         const { id } = req.user;
//         const { categoryId, categoryName, Description, selectedOption } = req.body;
//         const category = await Category.findOneAndUpdate(
//             { _id: categoryId, userId: id },
//             { name: categoryName, description: Description, status: selectedOption },
//             { new: true }
//         );
//         if (!category) {
//             return handleResponse(res, 404, "Category not found");
//         }
//         return handleResponse(res, 200, "Category updated successfully", category);
//     } catch (error) {
//         console.log(error);
//         return handleResponse(res, 500, error.message);
//     }
// };

export const deleteCategaryItem = async (req, res) => {
    try {
        const { id } = req.user;
        const { categaryId } = req.params;
        const category = await Category.findOneAndDelete({ _id: categaryId, userId: id });
        if (!category) {
            return handleResponse(res, 404, "Category not found");
        }
        return handleResponse(res, 200, "Category deleted successfully");
    } catch (error) {
        console.log(error);
        return handleResponse(res, 500, error.message);
    }
}

export const updateCategaryItem = async (req, res) => {
    try {
        const { id } = req.user;
        const { categaryId, categaryName, description, selectedOption } = req.body;
        const category = await Category.findByIdAndUpdate( categaryId,{
            ...(categaryName && { name: categaryName}),
            ...(description && { description }),
            ...(selectedOption && { status: selectedOption}),
    });
        if (!category) {
            return handleResponse(res, 404, "Category not found");
        }
        return handleResponse(res, 200, "Category updated successfully", category);
    } catch (error) {
        console.log(error);
        return handleResponse(res, 500, error.message);
    }
};

export const searchCategary = async (req, res) => {
    try {
        const {id} = req.user
      const {_search} = req.query
      const categary = await Category.find({userId: id, name: { $regex: _search, $options: 'i' }})
      return handleResponse(res, 200, "Product fetched successfully", categary);
    } catch (error) {
        return handleResponse(res, 500, error.message);
    }
}