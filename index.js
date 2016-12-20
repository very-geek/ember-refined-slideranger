'use strict'

module.exports = {
  name: 'ember-refined-slideranger',

  options: {
    nodeAssets: {
      // TODO opt to output as individual assets
      nouislider: {
        srcDir: 'distribute',
        import: [
          { path: 'nouislider.css' },
          {
            path: 'nouislider.js',
            using: [{ transformation: 'amd', as: 'slideranger' }]
          }
        ]
      }
    }
  },

  isDevelopingAddon() {
    return !this.app.isProduction
  },
}
