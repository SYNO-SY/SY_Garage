state = {}

local garage_uiText = locale('access_garage')
local store_uiText = locale('store_veh')

local function nearbyGarage(point)
    if point.currentDistance > 5 then return end
    local Entry_Point = point.Entry
    local Spawn_Point = point.Spawn
    local garageDistance

    garageDistance = #(cache.coords - Entry_Point)
    local isInVehicle = IsPedInAnyVehicle(PlayerPedId(), false)
    local playerPed = ESX.PlayerData.ped

    if garageDistance <= 3 then
        state.nearestGarage = Entry_Point
        local data = {
            spawnpoint = Entry_Point,
            entrypoint = Spawn_Point,
            heading = point.heading,
            g_name = point.name
        }
        repeat
            local playerCoords = GetEntityCoords(cache.ped)
            garageDistance = #(playerCoords - Entry_Point)

            if isInVehicle then
                TextUI:Show(store_uiText)
                if IsControlJustReleased(0, 47) then
                    TextUI:Hide()
                    local vehicle = GetVehiclePedIsIn(playerPed, false)
                    local vehicleProps = ESX.Game.GetVehicleProperties(vehicle)
                    if vehicleProps then
                        lib.callback('SY_Garage:checkVehicleOwner', false, function(owner)
                            if owner and vehicleProps ~= nil then
                                ESX.Game.DeleteVehicle(vehicle)
                                TriggerServerEvent('SY_Garage:updateOwnedVehicle', true, data.g_name, nil,
                                    { selectedVehData = vehicleProps })
                            else
                                Notification('SY_Garage', locale('not_owning_veh'), 'error', 5000, false)
                            end
                        end, vehicleProps.plate)
                    end
                end
            else
                TextUI:Show(garage_uiText)
                if IsControlJustPressed(0, 38) and not isMenuOpen then
                    if not IsDead then
                        OpenGarageMenu(data)
                    end
                    TextUI:Hide()
                end
            end

            Wait(0)
        until garageDistance > 3

        state.nearestGarage = nil

        return
    else
        local isOpen, currentText = TextUI:IsOpen()
        if isOpen and currentText == garage_uiText or store_uiText then
            TextUI:Hide()
        end
    end
end

for _, v in pairs(Config.Garages) do
    lib.points.new({
        coords = vector3(v.garage_x, v.garage_y, v.garage_z),
        distance = 10,
        nearby = nearbyGarage,
        Entry = vector3(v.garage_x, v.garage_y, v.garage_z),
        Spawn = vector3(v.spawn_x, v.spawn_y, v.spawn_z),
        heading = v.heading,
        name = v.GarageName
    })
end

-- Blips
CreateThread(function()
    for _, v in pairs(Config.Garages) do
        local blip = AddBlipForCoord(v.garage_x, v.garage_y, v.garage_z)

        SetBlipSprite(blip, Config.Blips.Sprite)
        SetBlipDisplay(blip, 4)
        SetBlipScale(blip, Config.Blips.Scale)
        SetBlipColour(blip, Config.Blips.Colour)
        SetBlipAsShortRange(blip, true)

        BeginTextCommandSetBlipName("STRING")
        AddTextComponentSubstringPlayerName(locale('ui_heading'))
        EndTextCommandSetBlipName(blip)
    end
end)
