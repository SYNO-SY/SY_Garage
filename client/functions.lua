vehiclesList = {}
local next = next
isMenuOpen = false

function OpenGarageMenu(data)
    local spawnpoint = data.spawnpoint
    lib.callback('SY_Garage:getVehiclesInParking', false, function(vehicles)
        if next(vehicles) then
            isMenuOpen = true
            for i = 1, #vehicles, 1 do
                local options = {}
                local props = vehicles[i].vehicle
                local veh_stored = vehicles[i].status
                local pound = vehicles[i].impound
                if pound == 1 then
                    impound = 'impound'
                else
                    impound = ''
                end
                if veh_stored == 1 then
                    status_data = 'in'
                else
                    status_data = 'out'
                end
                table.insert(vehiclesList, {
                    title = GetDisplayNameFromVehicleModel(vehicles[i].vehicle.model),
                    plate = vehicles[i].plate,
                    speed = math.ceil(GetVehicleModelEstimatedMaxSpeed(vehicles[i].vehicle.model) * 4.605936),
                    body = props.bodyHealth,
                    engine = props.engineHealth,
                    fuel = props.fuelLevel,
                    status = status_data,
                    props = vehicles[i].vehicle,
                    fine = 0
                })

                local spawnPoint = {
                    x = spawnpoint.x,
                    y = spawnpoint.y,
                    z = spawnpoint.z,
                    heading = data.heading
                }
                options.vehiclesList = vehiclesList
                options.spawnPoint = spawnPoint
                options.type = 'garage'
                SendNUIMessage({
                    action = 'vehicledata',
                    data = options,

                })
                OpenNui(true)
            end
        else
            Notification('SY_Garage', 'No vehicles in Garage', 'info', 5000)
        end
    end)
end

---@param arg boolean
function OpenNui(arg)
    SetNuiFocus(arg, arg)
    SendNUIMessage({
        action = 'setVisible',
        data = arg
    })
    if arg == false then
        isMenuOpen = false
        vehiclesList = {}
    end
end

---@param type string
---@param data any
function SpawnVehicle(type, data)
    if type == 'garage' then
        local spawnCoords = vector3(data.spawnPoint.x, data.spawnPoint.y, data.spawnPoint.z)
        if ESX.Game.IsSpawnPointClear(spawnCoords, 2.5) then
            TriggerServerEvent('SY_Garage:updateOwnedVehicle', false, nil, nil, data, spawnCoords,
                data.spawnPoint.heading, type)
            Notification('SY_Garage', locale('veh_spawned'), 'success', 5000, false)
        else
            Notification('SY_Garage', locale('veh_blocked'), 'error', 5000, false)
        end
    elseif type == 'impound' then
        local spawnCoords = vector3(data.spawnPoint.x, data.spawnPoint.y, data.spawnPoint.z)
        if ESX.Game.IsSpawnPointClear(spawnCoords, 2.5) then
            TriggerServerEvent('SY_Garage:updateOwnedVehicle', false, nil, nil, data, spawnCoords,
                data.spawnPoint.heading, type)
            Notification('SY_Garage', locale('veh_spawned'), 'success', 5000, false)
        else
            Notification('SY_Garage', locale('veh_blocked'), 'error', 5000, false)
        end
    end
end

function GetNearestVehicleinPool(coords)
    local data = {}
    data.dist = -1
    data.state = false
    for _, vehicle in pairs(GetGamePool('CVehicle')) do
        local vehcoords = GetEntityCoords(vehicle, false)
        local dist = #(coords - vehcoords)
        if data.dist == -1 or dist < data.dist then
            data.dist = dist
            data.vehicle = vehicle
            data.coords = vehcoords
            data.state = true
            data.props = ESX.Game.GetVehicleProperties(vehicle)
        end
    end
    return data
end

-- Impouds

function OpenImpoundMenu(data)
    local spawnpoint = data.spawnpoint
    lib.callback('SY_Garage:getVehiclesInImpound', false, function(vehicles)
        if next(vehicles) then
            isMenuOpen = true
            for i = 1, #vehicles, 1 do
                options = {}
                local props = vehicles[i].vehicle
                local veh_stored = vehicles[i].status
                local pound = vehicles[i].impound
                local ImpoundData = vehicles[i].impound_data
                local remainingTime = vehicles[i].remainingTime
                if ImpoundData ~= nil then
                    __fine = ImpoundData.fine
                end
                if pound == 1 then
                    impound = 'impound'
                end
                if veh_stored == 0 then
                    status_data = 'IV'
                end
                if tonumber(__fine) == 0 then
                    Fine = Config.ImpoundCash
                else
                    Fine = tonumber(__fine)
                end
                table.insert(vehiclesList, {
                    title = GetDisplayNameFromVehicleModel(vehicles[i].vehicle.model),
                    plate = vehicles[i].plate,
                    speed = math.ceil(GetVehicleModelEstimatedMaxSpeed(vehicles[i].vehicle.model) * 4.605936),
                    body = props.bodyHealth,
                    engine = props.engineHealth,
                    fuel = props.fuelLevel,
                    status = status_data,
                    props = vehicles[i].vehicle,
                    fine = Fine
                })

                local spawnPoint = {
                    x = spawnpoint.x,
                    y = spawnpoint.y,
                    z = spawnpoint.z,
                    heading = data.heading
                }
                options.vehiclesList = vehiclesList
                options.spawnPoint = spawnPoint
                options.type = 'impound'
                options.remainingTime = remainingTime
                SendNUIMessage({
                    action = 'vehicledata',
                    data = options,

                })
                OpenNui(true)
            end
        else
            Notification('SY_Garage', 'No vehicles in Impound', 'info', 5000)
        end
    end)
end
