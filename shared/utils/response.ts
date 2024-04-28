import { HttpStatus } from "@nestjs/common"
import { HttpException } from "@nestjs/common/exceptions"


export const successResponse = ({ data, isPaginate = false, message = 'success', statusCode = 200 }): any => {
  return {
    success: true,
    message: message,
    statusCode: statusCode,
    data: isPaginate ? data.items : data,
    meta: isPaginate ? data.meta : undefined
  }
}

export const errorResponse = (message = 'Bad Request', statusCode = HttpStatus.BAD_REQUEST) => {
  throw new HttpException({
    success: false,
    statusCode: statusCode,
    message: message
  }, statusCode)
}

export const errorHandler = (error: any) => {
  if (error.code === 'P2002') {
    return errorResponse('User already exists');
  } else if (error.code === 'P2003') {
    return errorResponse(error.message);
  } else {
    return errorResponse(error);
  }
}