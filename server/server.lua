ESX = exports["es_extended"]:getSharedObject()
lib.locale()


lib.callback.register('SY_Garage:getVehiclesInParking', function(source)
    local xPlayer  = ESX.GetPlayerFromId(source)
    local vehicles = {}
    local result   = MySQL.query.await('SELECT * FROM `owned_vehicles` WHERE `owner` = @identifier ',
        {
            ['@identifier'] = xPlayer.identifier,
        })
    if result then
        for i = 1, #result, 1 do
            table.insert(vehicles, {
                vehicle = json.decode(result[i].vehicle),
                plate   = result[i].plate,
                status  = result[i].stored,
                impound = result[i].impound
            })
        end

        return vehicles
    else
        return vehicles
    end
end)


lib.callback.register('SY_Garage:getVehiclesInImpound', function(source)
    local xPlayer = ESX.GetPlayerFromId(source)
    local vehicles = {}
    local result = MySQL.query.await('SELECT * FROM `owned_vehicles` WHERE `owner` = @identifier AND `stored` = 0',
        {
            ['@identifier'] = xPlayer.identifier,
        })
    if result then
        for i = 1, #result, 1 do
            local ImpoundData = json.decode(result[i].impound_data)
            local ivTime
            if ImpoundData then
                ivTime = ImpoundData.duration
            end
            table.insert(vehicles, {
                vehicle       = json.decode(result[i].vehicle),
                plate         = result[i].plate,
                status        = result[i].stored,
                impound       = result[i].impound,
                impound_data  = ImpoundData or nil,
                remainingTime = CalculateRemainingTime(ivTime, os.time())
            })
        end
        return vehicles
    end
end)


RegisterServerEvent('SY_Garage:updateOwnedVehicle')
AddEventHandler('SY_Garage:updateOwnedVehicle', function(stored, parking, Impound, data, spawn, heading, type)
    local source       = source
    local xPlayer      = ESX.GetPlayerFromId(source)
    local vehData      = data.selectedVehData.props
    local impound_data = {
        fine = Config.ImpoundCash,
        reason = 'no reason specified',
        impounder = 'SY_Garage',
        duration = os.time(),
        date = os.time()
    }


    if vehData then
        -- spawn vehicle
        vehData = data.selectedVehData.props
    else
        -- store vehicle
        vehData = data.selectedVehData
    end
    MySQL.update(
        'UPDATE owned_vehicles SET `stored` = @stored, `parking` = @parking, `impound` = @Impound, `vehicle` = @vehicle , `impound_data` = @impound_data WHERE `plate` = @plate AND `owner` = @identifier',
        {
            ['@identifier']   = xPlayer.identifier,
            ['@vehicle']      = json.encode(vehData),
            ['@plate']        = data.selectedVehData.plate,
            ['@stored']       = stored,
            ['@parking']      = parking,
            ['@Impound']      = Impound,
            ['@impound_data'] = json.encode(impound_data)
        })

    if stored then
        Notification('SY_Garage', locale('veh_stored'), 'success', 5000, true)
    else
        ESX.OneSync.SpawnVehicle(data.selectedVehData.props.model, spawn, heading, data.selectedVehData.props,
            function(vehicle)
                local vehicle = NetworkGetEntityFromNetworkId(vehicle)
                Wait(300)
                TaskWarpPedIntoVehicle(GetPlayerPed(source), vehicle, -1)
            end)
    end
end)


lib.callback.register('SY_Garage:checkVehicleOwner', function(source, plate)
    local xPlayer = ESX.GetPlayerFromId(source)
    local result = MySQL.query.await(
        'SELECT COUNT(*) as count FROM `owned_vehicles` WHERE `owner` = @identifier AND `plate` = @plate',
        {
            ['@identifier'] = xPlayer.identifier,
            ['@plate']      = plate
        })
    if result then
        if tonumber(result[1].count) > 0 then
            return true
        else
            return false
        end
    else
        return false
    end
end)



RegisterServerEvent('SY_Garage:ImpoundVehicle')
AddEventHandler('SY_Garage:ImpoundVehicle', function(stored, parking, Impound, data)
    local xPlayer = ESX.GetPlayerFromId(source)
    local reason = data.formData.reason
    if reason == '' then
        reason = 'not specified'
    end
    local fine = data.formData.cost
    local impound_data = {
        fine = fine,
        reason = reason,
        impounder = xPlayer.getName() or 'Me',
        duration = AddMinutesToCurrentTime(tonumber(data.formData.ivTime)),
        date = os.time()
    }
    MySQL.update(
        'UPDATE owned_vehicles SET `stored` = @stored, `parking` = @parking, `impound` = @Impound, `vehicle` = @vehicle,`impound_data` = @Impound_data WHERE `plate` = @plate',
        {
            ['@vehicle']      = json.encode(data.ivProps),
            ['@plate']        = data.ivPlate,
            ['@stored']       = stored,
            ['@parking']      = parking,
            ['@Impound']      = Impound,
            ['@Impound_data'] = json.encode(impound_data)
        })
end)

lib.callback.register('SY_Garage:hasEnoughMoney', function(source, fine)
    local xPlayer = ESX.GetPlayerFromId(source)
    if xPlayer ~= nil then
        local PlayerCash = xPlayer.getMoney()
        if PlayerCash >= fine then
            xPlayer.removeMoney(fine)
            return true
        else
            return false
        end
    end
end)
