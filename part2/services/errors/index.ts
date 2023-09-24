import { Request, Response, NextFunction } from 'express';
/**
 * 
 * Handle generic errors
 * @param err 
 * @param _req Express Request Object
 * @param res Express Response Object
 * @param next Express Next Object
 */
 export const handleErrorsGeneric = (err, _req: Request,res: Response, next: NextFunction) => {
    const errName = err?.name;
    switch(errName){
        case('BadRequestError'):
            res.status(422).json({message: err?.message, trace: err?.stack});
            break;
        default:
            res.status(500).json({mesage: 'There was something wrong with the service', trace: 'SERVER_ERROR'})
    }
    next(err);
  }





/**
 * We can define our own error type for handling different exceptions.
 */
  export class BadRequestError extends Error {
    constructor(message,details) {
      super(message);
      this.name = 'BadRequestError';
      this.stack = details;
    }
  }