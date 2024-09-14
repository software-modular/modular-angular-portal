import { AfterViewInit, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationService } from 'primeng/api';
import { InputInvestmentModal } from '../../../core/domain/beans/inputInvestmentModal';
import { DynamicFormInput } from '../../../core/domain/beans/dynamicFormInput';
import { TextFieldForm } from '../../../core/domain/beans/textFieldForm';
import { ListOptionFieldForm } from '../../../core/domain/beans/ListOptioFieldForm';
import { Validators } from '@angular/forms';
import { TypeInputForm } from '../../../core/domain/enum/TypeInputForm';
import { typeIdentifications } from '../../../core/domain/const/TypeIdentification';
import { HiddenFieldForm } from '../../../core/domain/beans/hiddenFieldForm';
import { InputForm } from '../../../core/domain/beans/InputForm';
import { OptionInput } from '../../../core/domain/beans/OptionInput';
import { DynamicFormService } from '../../../core/services/components/dynamic-form.service';
import { TransactionDto } from '../../../core/domain/dto/transactions';
import { TransactionService } from '../../../core/services/transaction/transaction.service';
import { TransactionResponseDto } from '../../../core/domain/dto/transactionResponseDto';
import { requiredValidator } from '../../../core/domain/beans/dynamicValidator';

@Component({
  selector: 'app-investment-modal',
  templateUrl: './investment-modal.component.html',
  styleUrl: './investment-modal.component.css'
})
export class InvestmentModalComponent implements AfterViewInit {

  modalTitle: string = " "
  dynamicFormInput!: DynamicFormInput;

  constructor(
    public dialogRef: MatDialogRef<InvestmentModalComponent>,
    private confirmationService: ConfirmationService,
    private dynamicFormService: DynamicFormService,
    private transactionService: TransactionService,
    @Inject(MAT_DIALOG_DATA) public data: InputInvestmentModal
  ) {
    if (data.paymentType == "INV") {
      this.modalTitle = "Invertir";
    } else {
      this.modalTitle = "Precompra";
    }
    this.loadForm();
  }

  ngAfterViewInit(): void {
    this.loadFormData();
    this.disableFieldsForm();
  }

  closeModal() {
    this.dialogRef.close()
  }

  loadForm() {
    this.dynamicFormInput = {
      title: this.modalTitle,
      titleAling: "center",
      fields: this.getFieldsForm(),
      showFooter: false,
      showBorder: false
    }
  }

  loadFormData() {
    if (this.data != undefined) {
      this.dynamicFormService.setValueField("payment_type", this.data.paymentType);
      this.dynamicFormService.setValueField("money", "COP");
    }
  }

  disableFieldsForm() {
    this.dynamicFormService.disableFieldByFormControlName("payment_type", true);
    this.dynamicFormService.disableFieldByFormControlName("money", true);
  }

  isValidForm(): Boolean {
    return this.dynamicFormService.isValidForm();
  }

  createTransacion() {
    let transaction: TransactionDto = this.getTransaction();
    this.transactionService.createTransaction(transaction).subscribe({
      next: (data: TransactionResponseDto) => {
        this.showMessageDialog("Transacción", `Transaccion creada con exito; Haga click en el siguiente enlace para realizar el pago <a href='${data.payment_url}' target='_blank'>${data.payment_url}</a>; <br> Una vez hecho el pago su estado se visualizara en el visor transacciones`);
      }, error: (_) => {
        this.showMessageDialog("Transacción", "Error: no es posible realizar la compra, intente mas tarde");
      }
    });

  }

  getTransaction(): TransactionDto {
    let transaction: TransactionDto = {
      client: this.data.clientId,
      payment_type: this.data.paymentType,
      project: this.data.projectId,
      money: "COP",
    }
    if (this.data.paymentType === "INV") {
      transaction.amount_in_cents = Number(this.dynamicFormService.getValueByFieldName("amount_in_cents"));
      transaction.product_amount = 0;
    } else {
      transaction.amount_in_cents = 0;
      transaction.product_amount = Number(this.dynamicFormService.getValueByFieldName("product_amount"));
    }
    return transaction;
  }

  private getFieldsForm(): InputForm<any>[] {
    let typeInvestment: OptionInput[] = [
      {
        label: "Precompra",
        value: "PRP"
      },
      {
        label: "Invertir",
        value: "INV"
      },
    ];
    let divisas: OptionInput[] = [
      {
        label: "COP",
        value: "COP"
      }
    ];
    let fields: InputForm<any>[] = [
      new ListOptionFieldForm("Tipo de inversión", "Seleccione", "payment_type", "",
        TypeInputForm.LIST_OPTION, typeInvestment, [requiredValidator()]),
      new ListOptionFieldForm("Moneda", "Seleccione", "money", "",
        TypeInputForm.LIST_OPTION, divisas, [requiredValidator()]),
    ];
    if (this.data.paymentType === "INV") {
      fields.push(
        new TextFieldForm("Valor inversión (COP)", "Ingresa el monto", "amount_in_cents", "", TypeInputForm.NUMBER, '', [requiredValidator()]));

    } else {
      fields.push(
        new TextFieldForm("Cantidad inversión", `Ingrese cantidad (${this.data.unit})`, "product_amount", "", TypeInputForm.NUMBER, '', [requiredValidator()]));
    }
    return fields;
  }

  private showMessageDialog(titleHeader: string, message: string) {
    this.confirmationService.confirm({
      message: message,
      header: titleHeader,
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      acceptLabel: "Continuar",
      rejectVisible: false,
      accept: () => {
        this.closeModal();
      }
    });
  }


}
