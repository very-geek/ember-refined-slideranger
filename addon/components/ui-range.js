import Component from 'ember-component'
import layout from '../templates/components/ui-range'
import set from 'ember-metal/set'
import get from 'ember-metal/get'
import observer from 'ember-metal/observer'
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

  didInsertElement() {
    this.ranger = SlideRanger.create(this.element, get(this, '_options'))

    for (let handler of this._handlers) {
      this.ranger.on(handler, get(this, `on-${handler}`))
    }
  },

  willDestroy() {
    if (this.ranger) {
      for (let handler of this._handlers) {
        this.ranger.off(handler)
      }

      this.ranger.destroy()
    }
  }
})
