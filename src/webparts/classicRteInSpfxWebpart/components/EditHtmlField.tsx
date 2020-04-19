import * as React from 'react';
import * as $ from 'jquery';
import * as ReactDOM from 'react-dom';
import { BaseDialog, IDialogConfiguration } from '@microsoft/sp-dialog';
import {
 DialogContent
} from 'office-ui-fabric-react';


interface IEditHtmlFieldProps {
    fieldName: string;
    fieldValue: string;
    fieldTitle: string;
    context : any;
    url: string;
    iframeOnLoad?: (iframe: any) => void;
    close: () => void;
    submit: () => void;
   }

   class EditHtmlField extends React.Component<IEditHtmlFieldProps, {}> {

   public context: any;   
   private fieldName : string;
   private fieldValue : string;
   private fieldTitle : string;

    constructor(props) {
      super(props);
      this.context = props.context;
      
      this.fieldName = props.fieldName;
      this.fieldValue = props.fieldValue;
      this.fieldTitle = props.fieldTitle;
      
      this.state = {
        fieldValue : this.fieldValue
      };
    }
    private _iframe: any;
    public render(): JSX.Element {
      
      
      return <DialogContent
                title= {this.fieldTitle}
                className="dialog-content-modal"
                onDismiss={this.props.close}
                showCloseButton={true}
                
                >
        <iframe id="iframe_edit_rte" ref={(iframe) => { this._iframe = iframe; }} onLoad={this._iframeOnLoad.bind(this)}
        style={{ width: "900px", height: "768px" }} src={this.props.url} frameBorder={0} scrolling="true"></iframe>
      </DialogContent>;
    }
  
    private PreSaveAction()
    {
      return false;
    }

    private _saveButtonClicked(event : any)
    {
      event.preventDefault();
      event.stopPropagation();
      
      let rteDiv = $("iframe#iframe_edit_rte").contents().find('div[id^="'+this.fieldName+'"][id$="rte"]').html();
      this.updateField(rteDiv);
      //console.log("Save clicked");
      return false;
    }

    private _iframeOnLoad(): void {
      try { 
        //doing some cleanup and preparation

        (window as any).PreSaveAction = this.PreSaveAction();

        let rteDiv = $("iframe#iframe_edit_rte").contents().find('div[id^="'+this.fieldName+'"][id$="rte"]');
        rteDiv.closest("tr").find("td:nth-child(1)").hide();
        rteDiv.closest("tr").find("td:nth-child(2)").css("width", "100%");
        $("iframe#iframe_edit_rte").contents().find("html").css("overflow", "auto");
        $(".ms-Layer").css("z-index", "1");
        //---------

        let saveButton1Id = "a[id='Ribbon.ListForm.Edit.Commit.Publish-Large']";
        let iframe1 = document.querySelector('iframe#iframe_edit_rte') as HTMLIFrameElement;
        (iframe1.contentWindow as any).PreSaveAction = this.PreSaveAction();

        let part = iframe1.contentWindow.document.querySelector(saveButton1Id);
        if (part != null)
        {
          part.addEventListener('click', (event: any) => {
            $("iframe#iframe_edit_rte").contents().find("form").attr("action","#");
            this._saveButtonClicked(event);
            return false;
          });
        }
        //save button from the bottom
        $("iframe#iframe_edit_rte").contents().find('input[value="Save"]').removeAttr('onclick').on('click', (event: any) => {
          $("iframe#iframe_edit_rte").contents().find("form").attr("action","#");

          this._saveButtonClicked(event);
          return false;
        });
        
        rteDiv.html(this.fieldValue);
        this._iframe.contentWindow.frameElement.cancelPopUp = this.props.close;
      } catch (err) {
          if (err.name !== "SecurityError") {
              throw err;
          }
      }
      if (this.props.iframeOnLoad) {
          this.props.iframeOnLoad(this._iframe);
      }
  }

    private updateField(rteDiv : string): void {
      //console.log(rteDiv);
      this.props.context.fieldValue = rteDiv;
      this.props.submit();
  }
}

   export default class EditHtmlFieldDialog extends BaseDialog {
    public message: string;
    public context: any;
    public fieldName: string;
    public fieldValue: string;
    public fieldTitle: string;
    public url: string;
    public iframeOnLoad?: (iframe: any) => void;

    public render(): void {
      ReactDOM.render(<EditHtmlField
        close={ this.close }
        fieldName={ this.fieldName }
        fieldValue={ this.fieldValue }
        fieldTitle={ this.fieldTitle }
        context={ this.context }

        url = {this.url}
        iframeOnLoad = {this.iframeOnLoad}
        submit={ this._submit }
      />, this.domElement);
    }

    public getConfig(): IDialogConfiguration {
      return {
        isBlocking: true
      };
    }

    protected onAfterClose(): void {
      super.onAfterClose();
      try
      {
        ReactDOM.unmountComponentAtNode(this.domElement);
      }
      catch(e)
      {
        console.error(e);
      }
    }

    //@autobind
    private _submit(): void {
      this.close();
    }
   }/**/