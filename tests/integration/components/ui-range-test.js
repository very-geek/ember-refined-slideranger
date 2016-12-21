import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('ui-range', '集成测试 | 组件 | ui-range', {
  integration: true
})

test('render noUiSlider', function(assert) {
  this.render(hbs`{{ui-range min=0 max=100}}`)
  assert.equal(this.$().find('.noUi-target').length, 1)
})
