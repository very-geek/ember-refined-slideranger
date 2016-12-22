import Component from 'ember-component'
import layout from '../templates/components/ui-range'
import set from 'ember-metal/set'
import get from 'ember-metal/get'
import observer from 'ember-metal/observer'
import { bind } from 'ember-runloop'
import SlideRanger from 'slideranger'

export default Component.extend({
  layout,

  init() {
    this._super(...arguments)
    this._prepareOptions()
    this._prepareHandlers()
  },

  _prepareOptions() {
    set(this, '_options', {
      start: +get(this, 'value'),
      step: +get(this, 'step') || 0,
      connect: get(this, 'connect') || [true, false],
    })

    set(this, '_options.range', {
      min: +get(this, 'min'),
      max: +get(this, 'max')
    })

    set(this, '_options.format', {
      to(value) {
        return value
      },
      from(value) {
        return "NaN" === value ? 0 : value
      }
    })
  },

  _prepareHandlers() {
    this._handlers = Object.keys(this.attrs)
      .filter(name => /^on-/i.test(name))
      .map(name => name.slice(3))
  },

  updateValue: observer('value', function() {
    this.ranger && this.ranger.set(+get(this, 'value'))
  }),

  _toggleControlClassName() {
    this.$().toggleClass('-range')
  },

  didInsertElement() {
    this.ranger = SlideRanger.create(this.element, get(this, '_options'))

    for (let handler of this._handlers) {
      this.ranger.on(handler, get(this, `on-${handler}`))
    }

    this.toggleControlClassName = bind(this, this._toggleControlClassName)

    this.ranger.on('start', this.toggleControlClassName)
    this.ranger.on('end', this.toggleControlClassName)
  },

  willDestroy() {
    if (this.ranger) {
      for (let handler of this._handlers) {
        this.ranger.off(handler)
      }

      this.ranger.off('start', this.toggleControlClassName)
      this.ranger.off('end', this.toggleControlClassName)

      this.ranger.destroy()
    }
  }
})
