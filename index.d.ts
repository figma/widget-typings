// Figma Widget API version 1, update 1
/// <reference path="./widget-api.d.ts"/>
declare global {
  // Extend the global widget api
  interface PluginAPI {
    widget: WidgetAPI
  }

  ///////////////////////////////////////////////////////////////////////////////
  // JSX
  namespace JSX {
    /**
     * You shouldn't need to use this type since you never see these attributes
     * inside your component or have to validate them.
     */
    interface IntrinsicAttributes {
      key?: string | number | undefined
    }

    interface ElementChildrenAttribute {
      children: {}
    }
  }
} // declare global

export {}
