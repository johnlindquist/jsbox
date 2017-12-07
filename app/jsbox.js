const { ipcMain, dialog, app } = require("electron")
const isDev = require("electron-is-dev")
const path = require("path")
const asarPath = path.join(
  __dirname,
  "..",
  "app.asar.unpacked",
  "node_modules"
)
const poi = isDev
  ? require("poi")
  : require(path.join(asarPath, "poi"))
//#region
const os = require("os")
const fs = require("fs-extra")

ipcMain.on("createProject", async event => {
  const log = message => event.sender.send("log", message)

  //default template folder included in bundle
  const templatePath = path.join(
    __dirname,
    "/../templates/default"
  )

  const [dir] = dialog.showOpenDialog({
    properties: ["openDirectory", "createDirectory"]
  })

  const entry = path.join(dir, "index.js")
  const template = path.join(dir, "index.html")

  await fs.copy(templatePath, dir, {
    preserveTimestamps: true
  })

  const html = {
    template
  }

  const poiApp = poi({
    entry,
    html,
    mode: "development",
    webpack: function(config) {
      if (!isDev) {
        config.resolveLoader.modules.push(asarPath)
      }
      return config
    }
  })

  const options = await poiApp.prepare()
  const { server, host } = await poiApp.dev()

  const port = 4001
  server.listen(port, host)

  event.sender.send("ready", `http://${host}:${port}`)
})
