-- timing functionality

function CalculateRemainingTime(futureTimestamp, currentTimestamp)
    if not futureTimestamp then return 0 end
    local differenceInSeconds = futureTimestamp - currentTimestamp
    if differenceInSeconds <= 0 then
        return { string = "0 seconds left", time = 0 }
    end
    if differenceInSeconds < 60 then
        local value = differenceInSeconds
        return { string = value .. " seconds", time = value }
    elseif differenceInSeconds < 3600 then
        local value = math.floor(differenceInSeconds / 60)
        return { string = value .. " minutes", time = value }
    elseif differenceInSeconds < 86400 then
        local value = math.floor(differenceInSeconds / 3600)
        return { string = value .. " hours", time = value }
    else
        local value = math.floor(differenceInSeconds / 86400)
        return { string = value .. " days", time = value }
    end
end

function AddMinutesToCurrentTime(minutes)
    local currentTime = os.time()
    local addedTime = currentTime + (minutes * 60)
    return addedTime
end
