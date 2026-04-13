import { getLogsM } from "../modules/logModule.js";
import AppError from "../utils/appError.js";

export const getAllLogs = async (req, res, next) => {
  try {
    // Pasiimame filtrus iš URL query parametrų (?user=Jonas&action=login)
    const filters = {
      user: req.query.user,
      action: req.query.action,
      startDate: req.query.startDate,
      endDate: req.query.endDate
    };

    const logs = await getLogsM(filters);

    res.status(200).json({
      status: "success",
      results: logs.length,
      data: logs
    });
  } catch (err) {
    next(err);
  }
};