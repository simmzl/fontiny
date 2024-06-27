module.exports = {
  packagerConfig: {
    icon: "./src/main/assets/icons/favicon",
    ignore: [
      "/src/renderer/fontiny-app/*"
    ],
    arch: "all"
  },
  makers: [
  // {
  //   name: "@electron-forge/maker-dmg",
  //   config: {
  //     title: "Fontiny For Mac",
  //     background: "./src/main/assets/bg/bg.png",
  //     iconSize: 91,
  //     contents: (options) => {
  //       return [{
  //         x: 142,
  //         y: 168,
  //         type: "file",
  //         path: `${process.cwd()}/out/Fontiny-darwin-arm64/Fontiny.app`
  //       },
  //       {
  //         x: 361,
  //         y: 168,
  //         type: "link",
  //         path: "/Applications"
  //       }]
  //     }
  //   }
  // },
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