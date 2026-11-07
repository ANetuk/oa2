abstract class BaseDocument {
  private _date: Date;

  constructor() {
    this._date = new Date();
  }

  protected abstract getDocumentNumber(): string;

  private getDocumentDate(): string {
    const day = this._date.getDate().toString().padStart(2, '0');
    const month = (this._date.getMonth() + 1).toString().padStart(2, '0');
    const year = this._date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  public getDocumentTitle() {
    return `Документ №${this.getDocumentNumber()} от ${this.getDocumentDate()}`;
  }
}

// PlainNumberDocument наследуется от класса BaseDocument
class PlainNumberDocument extends BaseDocument {
  private _documentNumber: string;

  constructor(documentNumber: string) {
    super();
    this._documentNumber = documentNumber;
  }

  protected getDocumentNumber(): string {
    return this._documentNumber;
  }
}

class DocumentNumberFormatter {
  private _documentNumber: string;
  private _documentNumberLength: number;

  constructor(documentNumber: string, documentNumberLength: number) {
    this._documentNumber = documentNumber;
    this._documentNumberLength = documentNumberLength;
  }

  public getFormattedDocumentNumber(): string {
    return this._documentNumber.padStart(this._documentNumberLength, '0');
  }
}

// FormattedNumberDocument наследуется от класса BaseDocument
class FormattedNumberDocument extends BaseDocument {
  private _documentNumber: string;
  private _documentNumberLength: number;
  // FormattedNumberDocument содержит DocumentNumberFormatter, при вызове getDocumentNumber работа делегируется DocumentNumberFormatter
  private _documentNumberFormatter: DocumentNumberFormatter;

  constructor(documentNumber: string, documentNumberLength: number) {
    super();
    this._documentNumber = documentNumber;
    this._documentNumberLength = documentNumberLength;
    this._documentNumberFormatter = new DocumentNumberFormatter(
      this._documentNumber,
      this._documentNumberLength
    );
  }

  protected getDocumentNumber(): string {
    return this._documentNumberFormatter.getFormattedDocumentNumber();
  }
}

class DocumentWriter {
  // Метод writeDocuments работает с базовым типом. Типы-наследники по разному определяют логику формирования номера документа.
  // writeDocuments ничего не знает об этом, единообразно работая с массивом документов, закладываясь на контракт, определенный базовым типом.
  public writeDocuments(documents: BaseDocument[]) {
    documents.forEach((document) => {
      console.log(document.getDocumentTitle());
    });
  }
}

const plainNumberDocument = new PlainNumberDocument('1');
const formattedNumberDocument = new FormattedNumberDocument('2', 3);
const documents = [plainNumberDocument, formattedNumberDocument];
const documentWriter = new DocumentWriter();
documentWriter.writeDocuments(documents);
