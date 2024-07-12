module.exports = {
  packagerConfig: {
    icon: "./src/main/assets/icons/favicon",
    ignore: [
      "/src/renderer/fontiny-app/*"
    ],
    arch: "all",
    appCopyright: "Simmzl(simmzl.cn)",
    win32metadata: {
      ProductName: "Fontiny",
      CompanyName: "simmzl.cn",
      FileDescription: "Fontiny"
    }
  },
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "simmzl",
          name: "fontiny"
        },
        draft: true,
        generateReleaseNotes: true
      }
    }
  ],
  makers: [
  {
    name: "@electron-forge/maker-dmg",
    config: {
      title: "Fontiny For Mac",
      background: "./src/main/assets/bg/bg.png",
      icon: "./src/main/assets/icons/favicon.icns",
      iconSize: 91,
      contents: (options) => {
        return [{
          x: 142,
          y: 168,
          type: "file",
          path: `${process.cwd()}/out/Fontiny-darwin-${process.env.TARGET_ARCH || 'arm64'}/Fontiny.app`
        },
        {
          x: 361,
          y: 168,
          type: "link",
          path: "/Applications"
        }]
      }
    }
  },
  {
    name: "@electron-forge/maker-zip",
    platforms: ["darwin"]
  },
  {
    name: "@electron-forge/maker-squirrel",
    platforms: ["win32"],
    config: {
      name: "Fontiny"
    }
  },
  {
    name: "@electron-forge/maker-deb",
    config: {}
  },
  {
    name: "@electron-forge/maker-rpm",
    config: {}
  }
  ]
};