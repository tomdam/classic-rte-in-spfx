import * as React from 'react';
import styles from './ClassicRteInSpfxWebpart.module.scss';
import { IClassicRteInSpfxWebpartProps } from './IClassicRteInSpfxWebpartProps';
import EditHtmlFieldDialog from './EditHtmlField';

export default class ClassicRteInSpfxWebpart extends React.Component<IClassicRteInSpfxWebpartProps, {}> {
  constructor(props) {
    super(props);
    if (this.props.htmlValue)
    {
      this.htmlValue = this.props.htmlValue;
    }
  }
  public render(): React.ReactElement<IClassicRteInSpfxWebpartProps> {
    
    return (
      <div className={ styles.classicRteInSpfxWebpart }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>This webpart shows the usage of classic SharePoint Rich Text Editor in spfx.</p>
              <p>Please update the webpart properties first (<i>List name</i> and <i>Multiple lines of text field name</i>)</p> 
              <p>To change the html below, open the page in edit mode and click the "Edit html" button.</p>
              <hr/>
              <p dangerouslySetInnerHTML={{__html: this.htmlValue}}></p>
              <hr/>
              <a onClick={() => this.ShowHtmlEditor()} className={ styles.button }>
                <span className={ styles.label }>Edit html</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  //this is our default html code
  private htmlValue : string = "<h1>Sample html code</h1><br/><b>some bold text...</b>";
  
  private ShowHtmlEditor()
  {
    const dialog: EditHtmlFieldDialog = new EditHtmlFieldDialog();
      dialog.fieldName = this.props.fieldName;// "HtmlField";
      dialog.fieldTitle = this.props.fieldName;//"HtmlField";
      //the html that will be shown in editor
      dialog.fieldValue = this.htmlValue;
      dialog.context = this.props.context;      

      dialog.url = this.props.context.pageContext.web.absoluteUrl + `/Lists/${this.props.listName}/NewForm.aspx?OnlyIncludeOneField=${this.props.fieldName}&ClientFormOverwriteSave=1&isdlg=1`;
      dialog.show().then(() => {
        //console.log(this.props.context.fieldValue);
        if (this.props.context.fieldValue)
        {
          this.htmlValue = this.props.context.fieldValue;
          this.setState({
            htmlValue : this.htmlValue
          });        
          this.props.updateValue(this.htmlValue);        
        }
      });
  }
}
