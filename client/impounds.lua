state = {}

local impound_uiText = locale('access_impound')

local function nearbyImpound(point)
    if point.currentDistance > 5 then return end
    local Entry_Point = point.Entry
    local Spawn_Point = point.Spawn
    local impoundDistance

    impoundDistance = #(cache.coords - Entry_Point)

    if impoundDistance <= 3 then
        state.nearestImpound = Entry_Point
        local data = {
            spawnpoint = Entry_Point,
            entrypoint = Spawn_Point,
            heading = point.heading,
            g_name = point.name
        }
        repeat
            local playerCoords = GetEntityCoords(cache.ped)
            impoundDistance = #(playerCoords - Entry_Point)


            TextUI:Show(impound_uiText)

            if IsControlJustPressed(0, 38) and not isMenuOpen then
                if not IsDead then
                    OpenImpoundMenu(data)
                    TextUI:Hide()
                end
            end


            Wait(0)
        until impoundDistance > 3

        state.nearestImpound = nil

        return
    else
        local isOpen, currentText = TextUI:IsOpen()
        if isOpen and currentText == impound_uiText then
            TextUI:Hide()
        end
    end
end

for _, v in pairs(Config.Impounds) do
    lib.points.new({
        coords = vector3(v.garage_x, v.garage_y, v.garage_z),
        distance = 10,
        nearby = nearbyImpound,
        Entry = vector3(v.garage_x, v.garage_y, v.garage_z),
        Spawn = vector3(v.spawn_x, v.spawn_y, v.spawn_z),
        heading = v.heading,
        name = v.GarageName
    })
end

-- Blips
CreateThread(function()
    for _, v in pairs(Config.Impounds) do
        local blip = AddBlipForCoord(v.garage_x, v.garage_y, v.garage_z)

        SetBlipSprite(blip, Config.Iv_Blips.Sprite)
        SetBlipDisplay(blip, 4)
        SetBlipScale(blip, Config.Iv_Blips.Scale)
        SetBlipColour(blip, Config.Iv_Blips.Colour)
        SetBlipAsShortRange(blip, true)

        BeginTextCommandSetBlipName("STRING")
        AddTextComponentSubstringPlayerName(locale('ui_iv_heading'))
        EndTextCommandSetBlipName(blip)
    end
end)
