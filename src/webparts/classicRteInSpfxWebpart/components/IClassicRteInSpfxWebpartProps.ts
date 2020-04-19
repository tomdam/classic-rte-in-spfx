export interface IClassicRteInSpfxWebpartProps {
  context: any;  
  htmlValue: string;
  listName: string;
  fieldName: string;
  updateValue?: (text: string) => void;
}
