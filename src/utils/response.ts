import { Response } from "express"

export const successResponse = (res: Response, statusCode: number, message: string, data?: any) => {
  res.status(statusCode).json({
    status: 'success',
    message,
    data,
  });
};

export const errorResponse = (res: Response, statusCode: number, message: string) => {
  res.status(statusCode).json({
    status: 'fail',
    message,
  });
};

export const handleError = (error: any, res: Response) => {
  console.error(error)  // Log error for debugging

  // ส่งข้อความจาก error ที่เกิดขึ้นจริง
  if (error instanceof Error) {
    return errorResponse(res, 500, error.message || 'Internal server error.')
  }

  // หาก error ไม่ได้เป็น instance ของ Error ให้ถือว่าเป็น Internal Server Error
  return errorResponse(res, 500, 'Internal server error.')
}