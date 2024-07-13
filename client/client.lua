ESX = exports["es_extended"]:getSharedObject()
lib.locale()

RegisterCommand('iv', function()
  local ImpounderJob = Config.ImpoundJob
  if Config.EnableImpound and ESX.PlayerData.job ~= nil and ImpounderJob[ESX.PlayerData.job.name] then
    local ped = PlayerPedId()
    local coords = GetEntityCoords(ped)
    local vehicle = GetNearestVehicleinPool(coords)
    OpenNui(true)
    SendNUIMessage({
      action = 'vehImpound',
      data = {
        type = "impound_form",
        plate = vehicle.props.plate,
        props = vehicle.props,
        vehicle = vehicle.vehicle
      }
    })
  end
end, false)

-- NUI

RegisterNUICallback('hide-ui', function(_, cb)
  OpenNui(false)
  cb({ 'ok' })
end)

RegisterNUICallback('selectedVeh', function(data, cb)
  SpawnVehicle('garage', data)
  cb({ 'ok' })
end)

RegisterNUICallback('Impound', function(data, cb)
  OpenNui(false)
  ESX.Game.DeleteVehicle(data.ivVeh)
  TriggerServerEvent('SY_Garage:ImpoundVehicle', false, nil, true, data)
  cb({ 'ok' })
end)

RegisterNUICallback('selectedVehShare', function(data, cb)
  cb({ 'ok' })
end)

RegisterNUICallback('impound_pay', function(data, cb)
  OpenNui(false)
  local vehiclenow = GetVehiclePedIsIn(PlayerPedId(), true)
  if DoesEntityExist(vehiclenow) then
    Notification('SY_Garage', "Vehicle Already Out", 'error', 5000, false)
  elseif not DoesEntityExist(vehiclenow) then
    lib.callback('SY_Garage:hasEnoughMoney', false, function(hasCash)
      if hasCash then
        SpawnVehicle('impound', data)
      else
        Notification('SY_Garage', "Not enough cash to pay for impound", 'error', 5000, false)
      end
    end, data.Fine)
  end
  cb({ 'ok' })
end)

-- locale loading
RegisterNUICallback('loadLocale', function(_, cb)
  cb(1)
  local locale = Config.Locale or 'en'
  local JSON = LoadResourceFile(cache.resource, ('locales/%s.json'):format(locale))
  if not JSON then
    JSON = LoadResourceFile(cache.resource, 'locales/en.json')
    Notification('SY_Garage', "'" .. locale .. "' locale not found", 'error', 5000, false)
  end
  SendNUIMessage({
    action = 'setLocale',
    data = json.decode(JSON)
  })
end)
