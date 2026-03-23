
export const deleteMe = async (req, res, next) => {
    res.status(200).json({
      status: "success",
      data: "Successfully deleted account",
    });
};
