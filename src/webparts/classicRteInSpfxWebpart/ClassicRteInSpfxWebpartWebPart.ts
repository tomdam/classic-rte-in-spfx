import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ClassicRteInSpfxWebpartWebPartStrings';
import ClassicRteInSpfxWebpart from './components/ClassicRteInSpfxWebpart';
import { IClassicRteInSpfxWebpartProps } from './components/IClassicRteInSpfxWebpartProps';

export interface IClassicRteInSpfxWebpartWebPartProps {
  description: string;
  listName: string;
  fieldName: string;
  htmlValue: string;
}

export default class ClassicRteInSpfxWebpartWebPart extends BaseClientSideWebPart<IClassicRteInSpfxWebpartWebPartProps> {

  public render(): void {
    
    const element: React.ReactElement<IClassicRteInSpfxWebpartProps > = React.createElement(
      ClassicRteInSpfxWebpart,
      {        
        context: this.context,
        listName: this.properties.listName,
        fieldName: this.properties.fieldName,
        htmlValue: this.properties.htmlValue,
        updateValue: this.updateValue.bind(this)
      }
    );

    ReactDom.render(element, this.domElement);
  }

  private updatedValue: string;
  private updateValue(desc: string)
  {
    this.updatedValue = desc;
    //here you can also do anything you want with the html value...
    //in this example, we will store it to the webpart's properties 
    //(it is important to note that the property will be saved only if the page is in edit mode)
    this.properties.htmlValue = desc;
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('listName', {
                  label: "List name"
                })                ,
                PropertyPaneTextField('fieldName', {
                  label: "Multiple lines of text field name"
                }),
                PropertyPaneTextField('htmlValue', {
                  label: "Html value"
                })
                
              ]
            }
          ]
        }
      ]
    };
  }
}
