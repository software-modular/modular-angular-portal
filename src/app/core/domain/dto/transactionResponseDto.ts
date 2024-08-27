import { ProjectDto } from "./projectDto";
import { ResponseClientDto } from "./responseClientDto";

export interface TransactionResponseDto {
  amount_in_cents?: Number,
  code_transaction?: Number,
  end_transaction_date?: string,
  last_update_date?: string,
  money?: Number,
  payment_method?: string,
  payment_type?: string,
  payment_url?: string,
  payment_url_id?: string,
  product_amount?: Number,
  reference?: string,
  start_transacction_date?: string,
  transactions_id?: string,
  client: ResponseClientDto,
  project: ProjectDto
}
