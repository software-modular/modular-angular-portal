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
      this.dynamicFormService.setValueField("money", "CO");
    }
  }

  disableFieldsForm() {
    this.dynamicFormService.disableFieldByFormControlName("payment_type", true);
    this.dynamicFormService.disableFieldByFormControlName("money", true);
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
    let nameAmount = this.data.paymentType === "INV" ? 'Monto inversión' : 'Monto';

    let fields: InputForm<any>[] = [
      new ListOptionFieldForm("Tipo de inversión", "Seleccione", "payment_type", "",
        TypeInputForm.LIST_OPTION, typeInvestment, [Validators.required]),
      new ListOptionFieldForm("Moneda", "Seleccione", "money", "",
        TypeInputForm.LIST_OPTION, divisas, [Validators.required]),
    ];
    if (this.data.paymentType === "INV") {
      fields.push(
        new TextFieldForm("Valor inversión (COP)", "Ingresa el monto", "amount_in_cents", "", TypeInputForm.NUMBER, '', [Validators.required]));

    } else {
      fields.push(
        new TextFieldForm("Cantidad inversión", "Ingresa el monto", "product_amount", "", TypeInputForm.NUMBER, '', [Validators.required]));
    }
    return fields;
  }


}
