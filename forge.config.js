const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

const { version } = require('./package.json')

module.exports = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: (arch) => ({
        name: 'my-electron-app',
        exe: 'my-electron-app.exe',
        noMsi: true,
        setupExe: `my-electron-app-${version}-win32-${arch}-setup.exe`,
        overwrite: true
      }),
    },
    {
      name: '@electron-forge/maker-dmg',
      config: (arch) => ({
        name: `app-${version}-darwin-${arch}`,
        appName: 'my-electron-app',
        overwrite: true
      }),
    },
    {
      name: '@electron-forge/maker-deb',
      config: (arch) => ({
        name: 'my-electron-app',
        appName: 'my-electron-app',
        overwrite: true
      }),
    },
    {
      name: '@electron-forge/maker-rpm',
      config: (arch) => ({
        name: 'my-electron-app',
        appName: 'my-electron-app',
        overwrite: true
      }),
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'lzh06550107',
          name: 'my-electron-app'
        },
        "draft": false,  // 确保这个设置为 false
        "prerelease": false  // 如果不想发布为预发布，确保这个也为 false
      }
    }
  ]
};
