IsDead = false

RegisterNetEvent('esx:playerLoaded')
AddEventHandler('esx:playerLoaded', function(xPlayer)
    ESX.PlayerData = xPlayer
end)

AddEventHandler('esx:onPlayerDeath', function(_)
    IsDead = true
    OpenNui(false)
end)

AddEventHandler('playerSpawned', function(_)
    IsDead = false
end)
