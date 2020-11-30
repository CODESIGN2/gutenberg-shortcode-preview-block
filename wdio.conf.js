const { TimelineService } = require('wdio-timeline-reporter/timeline-service')

exports.config = {
    runner: 'local',
    path: '/e2e',
    specs: [
        './e2e/features/**/*.feature'
    ],
    exclude: [],
    maxInstances: 10,
    capabilities: [{
        maxInstances: 5,
        browserName: 'chrome',
    }],
    logLevel: 'silent',
    logLevels: {
        '@wdio/cli': 'silent'
    },
    bail: 0,
    baseUrl: 'https://wp.dh.codesign2.co.uk/',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    services: ['chromedriver', [TimelineService]],
    framework: 'cucumber',
    reporters: [['timeline', { outputDir: './test-reports' }], 'spec'],
    cucumberOpts: {
        require: ['./e2e/step-definitions/**/*.js'],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        format: ['pretty'],
        snippets: true,
        source: false,
        profile: [],
        strict: true,
        tagExpression: '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false
    }
}