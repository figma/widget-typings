/* widget-typings are auto-generated. Do not update them directly. See plugin-docs/ for instructions. */
interface WidgetAPI {
  register(component: FunctionalWidget<any>): void
  h(...args: any[]): FigmaDeclarativeNode
  useWidgetId(): string
  useWidgetNodeId(): string
  useSyncedState<T>(
    name: string,
    defaultValue: T | (() => T),
  ): [T, (newValue: T | ((currValue: T) => T)) => void]
  useSyncedMap<T>(name: string): SyncedMap<T>
  usePropertyMenu(
    items: WidgetPropertyMenuItem[],
    onChange: (event: WidgetPropertyEvent) => void | Promise<void>,
  ): void
  useEffect(effect: () => (() => void) | void): void
  useStickable(onStuckStatusChanged?: (e: WidgetStuckEvent) => void | Promise<void>): void
  useStickableHost(
    onAttachmentsChanged?: (e: WidgetAttachedStickablesChangedEvent) => void | Promise<void>,
  ): void
  waitForTask(task: Promise<any>): void
  AutoLayout: AutoLayout
  Frame: Frame
  Image: ImageComponent
  Rectangle: Rectangle
  Ellipse: Ellipse
  Text: TextComponent
  Input: Input
  SVG: SVG
  Line: Line
  Fragment: Fragment
  Span: Span
}
interface WidgetClickEvent {
  canvasX: number
  canvasY: number
  offsetX: number
  offsetY: number
}
interface WidgetStuckEvent {
  newHostId: string | null
  oldHostId: string | null
}
interface WidgetAttachedStickablesChangedEvent {
  stuckNodeIds: string[]
  unstuckNodeIds: string[]
}
interface SyncedMap<T> {
  readonly length: number
  readonly size: number
  has(key: string): boolean
  get(key: string): T | undefined
  set(key: string, value: T): void
  delete(key: string): void
  keys(): string[]
  values(): T[]
  entries(): [string, T][]
}
declare type AutoLayout = FunctionalWidget<AutoLayoutProps>
declare type Frame = FunctionalWidget<FrameProps>
declare type Rectangle = FunctionalWidget<RectangleProps>
declare type ImageComponent = FunctionalWidget<ImageProps>
declare type Ellipse = FunctionalWidget<EllipseProps>
declare type Line = FunctionalWidget<LineProps>
declare type TextComponent = FunctionalWidget<TextProps>
declare type Input = FunctionalWidget<InputProps>
declare type SVG = FunctionalWidget<SVGProps>
declare type Fragment = FunctionalWidget<FragmentProps>
declare type Span = (props: SpanProps) => FigmaVirtualNode<'span'>
declare type FigmaVirtualNode<T> = {
  __type: T
}
declare type FigmaDeclarativeChildren<T> =
  | FigmaVirtualNode<T>
  | FigmaDeclarativeChildren<T>[]
  | string
  | null
  | undefined
  | false
declare type FigmaDeclarativeNode = FigmaDeclarativeChildren<any>
declare type FunctionalWidget<T> = (props: T) => FigmaDeclarativeNode
declare type PropertyMenuItemType =
  | 'action'
  | 'separator'
  | 'color-selector'
  | 'dropdown'
  | 'toggle'
  | 'link'
interface PropertyMenuItem {
  tooltip: string
  propertyName: string
  itemType: PropertyMenuItemType
}
interface WidgetPropertyMenuActionItem extends PropertyMenuItem {
  itemType: 'action'
  tooltip: string
  propertyName: string
  icon?: string
}
interface WidgetPropertyMenuSeparatorItem {
  itemType: 'separator'
}
interface WidgetPropertyMenuColorSelectorOption {
  tooltip: string
  option: HexCode
}
interface WidgetPropertyMenuColorItem extends PropertyMenuItem {
  itemType: 'color-selector'
  tooltip: string
  propertyName: string
  options: WidgetPropertyMenuColorSelectorOption[]
  selectedOption: string
}
interface WidgetPropertyMenuDropdownOption {
  option: string
  label: string
}
interface WidgetPropertyMenuDropdownItem extends PropertyMenuItem {
  itemType: 'dropdown'
  tooltip: string
  propertyName: string
  options: WidgetPropertyMenuDropdownOption[]
  selectedOption: string
}
interface WidgetPropertyMenuToggleItem extends PropertyMenuItem {
  itemType: 'toggle'
  tooltip: string
  propertyName: string
  isToggled: boolean
  icon?: string
}
interface WidgetPropertyMenuLinkItem extends PropertyMenuItem {
  itemType: 'link'
  tooltip: string
  propertyName: string
  href: string
  icon?: string | null
}
declare type WidgetPropertyMenuItem =
  | WidgetPropertyMenuActionItem
  | WidgetPropertyMenuSeparatorItem
  | WidgetPropertyMenuColorItem
  | WidgetPropertyMenuDropdownItem
  | WidgetPropertyMenuToggleItem
  | WidgetPropertyMenuLinkItem
declare type WidgetPropertyMenu = WidgetPropertyMenuItem[]
interface WidgetPropertyEvent {
  propertyName: string
  propertyValue?: string | undefined
}
interface TextChildren {
  children?:
    | FigmaVirtualNode<'span'>
    | string
    | number
    | (FigmaVirtualNode<'span'> | string | number)[]
}
interface TextProps extends BaseProps, WidgetJSXTextProps, TextChildren {
  font?: {
    family: string
    style: string
  }
}
interface TextEditEvent {
  characters: string
}
interface PlaceholderProps extends BlendProps, Omit<TextStyleProps, 'href'> {}
interface InputProps extends Omit<TextProps, 'children' | 'width'> {
  onTextEditEnd: (event: TextEditEvent) => void
  value: string | null
  placeholder?: string
  placeholderProps?: PlaceholderProps
  inputFrameProps?: Omit<AutoLayoutProps, 'width'>
  width?: Size
  inputBehavior?: 'wrap' | 'truncate' | 'multiline'
}
interface FragmentProps extends HasChildrenProps {
  key?: BaseProps['key']
}
interface FrameProps extends BaseProps, WidgetJSXFrameProps, HasChildrenProps {}
interface AutoLayoutProps extends BaseProps, WidgetJSXAutoLayoutProps, HasChildrenProps {}
interface EllipseProps extends BaseProps, WidgetJSXEllipseProps {}
interface RectangleProps extends BaseProps, WidgetJSXRectangleProps {}
interface ImageProps extends BaseProps, WidgetJSXImageProps {}
interface LineProps extends BaseProps, WidgetJSXLineProps {
  length?: Size
  strokeCap?: StrokeCap
}
interface SVGProps extends BaseProps, Partial<WidgetJSXFrameProps> {
  src: string
}
interface BaseProps extends WidgetJSXBaseProps {
  onClick?: (event: WidgetClickEvent) => Promise<any> | void
  key?: string | number
  hoverStyle?: HoverStyle
  tooltip?: string
  positioning?: 'auto' | 'absolute'
}
interface HasChildrenProps {
  children?: FigmaDeclarativeNode | FigmaDeclarativeNode[]
}
declare type HexCode = string
declare namespace WidgetJSX {
  export interface Vector {
    x: number
    y: number
  }
  export interface Color {
    r: number
    g: number
    b: number
    a: number
  }
  export type ArcData = {
    readonly startingAngle: number
    readonly endingAngle: number
    readonly innerRadius: number
  }
  export type AlignItems = 'center' | 'start' | 'end' | 'baseline'
  export type BlendMode =
    | 'normal'
    | 'multiply'
    | 'screen'
    | 'overlay'
    | 'darken'
    | 'lighten'
    | 'color-dodge'
    | 'color-burn'
    | 'hard-light'
    | 'soft-light'
    | 'difference'
    | 'exclusion'
    | 'hue'
    | 'saturation'
    | 'color'
    | 'luminosity'
  export type PaintType =
    | 'image'
    | 'solid'
    | 'gradient-linear'
    | 'gradient-radial'
    | 'gradient-angular'
    | 'gradient-diamond'
  export interface PaintProps {
    type: PaintType
    blendMode?: BlendMode
    visible?: boolean
    opacity?: number
  }
  export interface SolidPaint extends PaintProps {
    type: 'solid'
    color: Color | HexCode
  }
  export interface ColorStop {
    position: number
    color: Color
  }
  export interface GradientPaint extends PaintProps {
    type: 'gradient-linear' | 'gradient-radial' | 'gradient-angular' | 'gradient-diamond'
    gradientHandlePositions: [Vector, Vector, Vector]
    gradientStops: ColorStop[]
  }
  export type Transform = [[number, number, number], [number, number, number]]
  export interface ImagePaint extends PaintProps {
    type: 'image'
    src: string
    imageSize?: {
      width: number
      height: number
    }
    scaleMode?: ScaleMode
    imageTransform?: Transform
    scalingFactor?: number
    rotation?: number
    imageRef?: string
  }
  export type Paint = SolidPaint | GradientPaint | ImagePaint
  export type ShadowEffect = DropShadowEffect | InnerShadowEffect
  export interface DropShadowEffect {
    type: 'drop-shadow'
    color: HexCode | Color
    offset: Vector
    blur: number
    blendMode?: BlendMode
    spread?: number
    visible?: boolean
    showShadowBehindNode?: boolean
  }
  export interface InnerShadowEffect {
    type: 'inner-shadow'
    color: HexCode | Color
    offset: Vector
    blur: number
    blendMode?: BlendMode
    spread?: number
    visible?: boolean
  }
  export interface BlurEffect {
    type: 'layer-blur' | 'background-blur'
    blur: number
    visible?: boolean
  }
  export type Effect = DropShadowEffect | InnerShadowEffect | BlurEffect
  export type Size = number | 'fill-parent'
  export type AutolayoutSize = Size | 'hug-contents'
  export type StrokeAlign = 'inside' | 'outside' | 'center'
  export type StrokeCap = 'none' | 'round' | 'square' | 'arrow-lines' | 'arrow-equilateral'
  export type ScaleMode = 'fill' | 'fit' | 'tile' | 'crop'
  export type Overflow = 'visible' | 'hidden' | 'scroll'
  export interface TopConstraint {
    type: 'top'
    offset: number
  }
  export interface BottomConstraint {
    type: 'bottom'
    offset: number
  }
  export interface TopBottomConstraint {
    type: 'top-bottom'
    topOffset: number
    bottomOffset: number
  }
  export interface LeftConstraint {
    type: 'left'
    offset: number
  }
  export interface RightConstraint {
    type: 'right'
    offset: number
  }
  export interface LeftRightConstraint {
    type: 'left-right'
    leftOffset: number
    rightOffset: number
  }
  export interface CenterConstraint {
    type: 'center'
    offset: number
  }
  export interface HorizontalScaleConstraint {
    type: 'horizontal-scale'
    leftOffsetPercent: number
    rightOffsetPercent: number
  }
  export interface VerticalScaleConstraint {
    type: 'vertical-scale'
    topOffsetPercent: number
    bottomOffsetPercent: number
  }
  export type VerticalConstraint =
    | TopConstraint
    | BottomConstraint
    | TopBottomConstraint
    | CenterConstraint
    | VerticalScaleConstraint
  export type HorizontalConstraint =
    | LeftConstraint
    | RightConstraint
    | LeftRightConstraint
    | CenterConstraint
    | HorizontalScaleConstraint
  export type CornerRadius =
    | number
    | {
        topLeft?: number
        topRight?: number
        bottomLeft?: number
        bottomRight?: number
      }
  export type Path = {
    path: string
    windingRule: 'evenodd' | 'nonzero'
  }
  export type FullPadding = {
    top?: number
    left?: number
    bottom?: number
    right?: number
  }
  export type VerticalHorizontalPadding = {
    vertical?: number
    horizontal?: number
  }
  export type Padding = number | FullPadding | VerticalHorizontalPadding
  export type FontWeightNumerical = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  export type FontWeightString =
    | 'thin'
    | 'extra-light'
    | 'light'
    | 'normal'
    | 'medium'
    | 'semi-bold'
    | 'bold'
    | 'extra-bold'
    | 'black'
  export type FontWeight = FontWeightNumerical | FontWeightString
  export interface HoverStyle {
    fill?: HexCode | Color | Paint | (SolidPaint | GradientPaint)[]
    stroke?: HexCode | Color | SolidPaint | GradientPaint | (SolidPaint | GradientPaint)[]
    opacity?: number
  }
  export interface WidgetJSXBaseProps extends BlendProps, ConstraintProps {
    name?: string
    hidden?: boolean
  }
  export interface GeometryProps {
    fill?: HexCode | Color | Paint | (SolidPaint | GradientPaint)[]
    stroke?: HexCode | Color | SolidPaint | GradientPaint | (SolidPaint | GradientPaint)[]
    strokeWidth?: number
    strokeAlign?: StrokeAlign
    strokeDashPattern?: number[]
  }
  export interface PathProps {
    fillPath?: Path[]
    strokePath?: Path[]
  }
  export interface SizePropsRequired {
    width: Size
    height: Size
  }
  export interface SizeProps {
    width?: Size
    height?: Size
  }
  export interface AutoLayoutSizeProps {
    width?: AutolayoutSize
    height?: AutolayoutSize
  }
  export interface CornerProps {
    cornerRadius?: CornerRadius
  }
  export interface BlendProps {
    blendMode?: BlendMode
    opacity?: number
    effect?: Effect | Effect[]
  }
  export interface TransformProps {
    rotation?: number
  }
  export interface ConstraintProps {
    x?: number | HorizontalConstraint
    y?: number | VerticalConstraint
  }
  export interface LayoutProps {
    spacing?: number | 'auto'
    padding?: Padding
    direction?: 'horizontal' | 'vertical'
    horizontalAlignItems?: Omit<AlignItems, 'baseline'>
    verticalAlignItems?: AlignItems
  }
  export interface TextStyleProps extends NoHrefTextStyleProps {
    href?: string
  }
  export interface NoHrefTextStyleProps {
    fontFamily?: string
    letterSpacing?: number | string
    textDecoration?: 'none' | 'strikethrough' | 'underline'
    fontSize?: number
    italic?: boolean
    textCase?: 'upper' | 'lower' | 'title' | 'original' | 'small-caps' | 'small-caps-forced'
    fontWeight?: FontWeight
    fontPostScriptName?: string
    fill?: HexCode | Color | Paint | (SolidPaint | GradientPaint)[]
  }
  export interface WidgetJSXFrameProps
    extends BaseProps,
      GeometryProps,
      SizePropsRequired,
      TransformProps,
      CornerProps {
    overflow?: Overflow
  }
  export interface WidgetJSXAutoLayoutProps
    extends Omit<FrameProps, 'width' | 'height'>,
      LayoutProps,
      AutoLayoutSizeProps {}
  export interface WidgetJSXEllipseProps extends BaseProps, GeometryProps, TransformProps, SizeProps {
    arcData?: ArcData
  }
  export interface WidgetJSXImageProps extends Omit<RectangleProps, 'fill'> {
    src: string | ImagePaint
  }
  export interface WidgetJSXLineProps
    extends BaseProps,
      TransformProps,
      Pick<GeometryProps, 'stroke' | 'strokeWidth' | 'strokeDashPattern'> {}
  export interface WidgetJSXRectangleProps
    extends BaseProps,
      GeometryProps,
      SizePropsRequired,
      TransformProps,
      CornerProps {}
  export interface WidgetJSXSVGProps
    extends BaseProps,
      GeometryProps,
      SizeProps,
      TransformProps,
      PathProps {}
  export interface ParagraphProps {
    spacing: number
  }
  export interface SpanProps extends TextStyleProps, TextChildren {}
  export interface WidgetJSXTextProps
    extends BaseProps,
      AutoLayoutSizeProps,
      TransformProps,
      Omit<GeometryProps, 'fill'>,
      TextStyleProps {
    paragraphIndent?: number
    paragraphSpacing?: number
    horizontalAlignText?: 'left' | 'right' | 'center' | 'justified'
    verticalAlignText?: 'top' | 'center' | 'bottom'
    lineHeight?: number | string | 'auto'
  }
  export type ComponentProps = AutoLayoutProps | FrameProps
  
}