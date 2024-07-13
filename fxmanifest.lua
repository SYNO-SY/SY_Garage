fx_version "cerulean"
game "gta5"

description "Advanced garage script"
author "SYNO"
version '0.1.0'

lua54 'yes'

ui_page 'web/build/index.html'

shared_scripts { '@ox_lib/init.lua', "shared/**/*" }
client_scripts { "client/**/*" }
server_scripts { '@oxmysql/lib/MySQL.lua', "server/**/*" }

files {
  'locales/*.json',
  'web/build/index.html',
  'web/build/**/*',
}
