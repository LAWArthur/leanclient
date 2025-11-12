import { ClassicPreset, getUID } from "rete"
import { Value } from "sass"

type InputControlOptions<N> = {
  /** Whether the control is readonly. Default is `false` */
  readonly?: boolean
  /** Initial value of the control */
  initial?: N
  /** Callback function that is called when the control value changes */
  change?: (value: N) => void
  label?: string
}

type ValueTypeMap = {
    text: string
    number: number
    checkbox: boolean
}

const ValueInitial : ValueTypeMap = {
    text: "",
    number: 0,
    checkbox: false
}

/**
 * The input control class
 * @example new InputControl('text', { readonly: true, initial: 'hello' })
 */
export class InputControl<T extends keyof ValueTypeMap> extends ClassicPreset.Control {
  value: ValueTypeMap[T]
  readonly: boolean
  label: string

  constructor(public type: T, public options?: InputControlOptions<ValueTypeMap[T]>) {
    super()
    this.id = getUID()
    this.readonly = options?.readonly ?? false
    this.label = options?.label ?? "";

    if (typeof options?.initial !== 'undefined') this.value = options.initial
    else this.value = ValueInitial[type];
  }

  /**
   * Set control value
   * @param value Value to set
   */
  setValue(value: ValueTypeMap[T]) {
    this.value = value
    if (this.options?.change) this.options.change(value!)
  }
}
