import { NextFunction, Response, Request, Router } from 'express';
import IController from '../../interfaces/controller.interface';
import { TransferRepo } from './transfer.repo';

class TransferController implements IController {
  public path = '/transfer';

  public router = Router();

  private transferRepo = new TransferRepo();
  // private user = userModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // this.router.get(`${this.path}/:id`, authMiddleware, this.getUserById);
    this.router.get(`${this.path}/all`, this.getAllTransfers);
    this.router.get(`${this.path}/:id`, this.getTransferById);
    this.router.post(`${this.path}/create`, this.createTransfer);
  }

  private getTransferById = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params;
      console.log('id', id);
      const transfer = await this.transferRepo.getTransferById(id);
      return response.send({
        status   : 200,
        message  : 'hey',
        response : transfer,
      });
    } catch (error) {
      return next(error);
    }
  }

  private getAllTransfers = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const transfers = await this.transferRepo.getAllTransfers();
      return response.send({
        status   : 200,
        message  : 'hey',
        response : transfers,
      });
    } catch (error) {
      return next(error);
    }
  }

  private createTransfer = async (request: Request, response: Response, next: NextFunction) => {
    try {
      console.log('request', request.body);
      const transfer = await this.transferRepo.save({ ...request.body });
      console.log('transfer', transfer);
      return response.send({
        status   : 200,
        message  : 'hey',
        response : transfer,
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default TransferController;
