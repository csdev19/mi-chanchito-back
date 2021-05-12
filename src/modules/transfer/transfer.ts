import { ModelBase } from '../../infrastructure/helpers/model.base.interface';

interface TransferProps extends ModelBase {
  title : String;
  description : String;
  amount : Number;
  dateTransfer : Date;
  cashFlow : String;
}

// class Transfer implements TransferProps {
class Transfer {

}

export default Transfer;
