import { IResponse } from 'infrastructure/helpers/Responses';
import Transfers from './transfer.model';
import { ITransfers } from './transfer.interface';
import { Repo } from "../../infrastructure/helpers/Repo";

export interface ITransferRepo extends Repo<ITransfers> {
  getTransferById(transferId: string, userId: string): Promise<IResponse<ITransfers>>;
  getAllTransfers(userId: string): Promise<IResponse<ITransfers[]>>;
  update(transfer: ITransfers): Promise<IResponse<ITransfers>>;
};

export class TransferRepo implements ITransferRepo {
  constructor() {
  }

  public getAllTransfers(userId: string) {
    return new Promise<IResponse<ITransfers[]>>((resolve) => {
      try {
        Transfers
          .find({
            userId
          })
          .sort({
            dateTransfer: -1,
          })
          .exec((err, res: ITransfers[]) => {
            if (err) throw err;
            return resolve({ success: true, payload: res });
          });
      } catch (error) {
        return resolve({ error, payload: null });
      }
    });
  }

  public delete(idTransfer: string) {
    return new Promise<IResponse<ITransfers>>(async (resolve) => {
      try {
        const res = await Transfers.deleteOne({ _id: idTransfer });
        console.log('res', res);
        return resolve({ success: true, payload: null });
      } catch (error) {
        return resolve({ error, payload: null });
      }
    });
  }

  public exists(transfer: ITransfers) {
    return new Promise<IResponse<boolean>>((resolve) => {
      try {
        Transfers
          .findById(transfer)
          .exec((err, res: ITransfers[]) => {
            if (err) throw err;
            return resolve({ success: true, payload: !!res });
          });
        return resolve({ success: true, payload: true });
      } catch (error) {
        return resolve({ error, payload: null });
      }
    });
  }

  public save(transfer: ITransfers) {
    return new Promise<IResponse<ITransfers>>((resolve) => {
      try {
        if (!transfer.userId) throw new Error('El usuario es necesario');
        const newTransferObj = new Transfers({
          userId       : transfer.userId,
          description  : transfer.description,
          details      : transfer.details,
          amount       : transfer.amount,
          dateTransfer : transfer.dateTransfer,
          cashFlow     : transfer.cashFlow,
        });
        newTransferObj.save({}, (err, newTransfer: ITransfers) => {
          if (err) throw err;
          console.log('transfer)', newTransfer);
          return resolve({ success: true, payload: newTransfer });
          // return resolve({ success: true, enrollment });
        });
      } catch (error) {
        return resolve({ error, payload: null });
      }
    });
  }

  public update(transfer: ITransfers) {
    return new Promise<IResponse<ITransfers>>(async (resolve) => {
      try {
        console.log('transfer', transfer);
        if (!transfer.userId) throw new Error('El usuario es necesario');
        if (!transfer._id) throw new Error('Es obligatorio el id');
        const result = await Transfers.updateOne({
          _id: transfer._id,
        }, { $set: {
            description  : transfer.description,
            details      : transfer.details,
            amount       : transfer.amount,
            dateTransfer : transfer.dateTransfer,
            cashFlow     : transfer.cashFlow,
        } });
        // const newTransferObj = new Transfers({
        //   userId       : transfer.userId,
        // });
        // newTransferObj.save({}, (err, newTransfer: ITransfers) => {
        //   if (err) throw err;
        //   console.log('transfer)', newTransfer);
        //   return resolve({ success: true, payload: newTransfer });
        // });
        console.log('result', result);
        return resolve({ success: true, payload: transfer });
      } catch (error) {
        return resolve({ error, payload: null });
      }
    });
  }


  public getTransferById(transferId: string) {
    return new Promise<IResponse<ITransfers>>((resolve) => {
      try {
        Transfers
          .findById(transferId)
          .exec((err, res: ITransfers) => {
            if (err) throw err;
            return resolve({ success: true, payload: res });
          });
      } catch (error) {
        return resolve({ error, payload: null });
      }
    });
  }
}
