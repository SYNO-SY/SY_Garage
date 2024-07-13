-- ███╗   ██╗ ██████╗ ████████╗██╗███████╗██╗ ██████╗ █████╗ ████████╗██╗ ██████╗ ███╗   ██╗
-- ████╗  ██║██╔═══██╗╚══██╔══╝██║██╔════╝██║██╔════╝██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║
-- ██╔██╗ ██║██║   ██║   ██║   ██║█████╗  ██║██║     ███████║   ██║   ██║██║   ██║██╔██╗ ██║
-- ██║╚██╗██║██║   ██║   ██║   ██║██╔══╝  ██║██║     ██╔══██║   ██║   ██║██║   ██║██║╚██╗██║
-- ██║ ╚████║╚██████╔╝   ██║   ██║██║     ██║╚██████╗██║  ██║   ██║   ██║╚██████╔╝██║ ╚████║
-- ╚═╝  ╚═══╝ ╚═════╝    ╚═╝   ╚═╝╚═╝     ╚═╝ ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝


---@param title string
---@param msg string
---@param type string
---@param time number
---@param Isserver? boolean
function Notification(title, msg, type, time, Isserver)
    if Isserver then
        TriggerClientEvent('ox_lib:notify', source, {
            type = type,
            title = title,
            description = msg,
            duration = time
        })
    else
        lib.notify({
            type = type,
            title = title,
            description = msg,
            duration = time,
            style = {
                borderRadius = 18,
                backgroundColor = '#2BDD66',
                color = 'black'
            }
        })
    end
end

-- ████████╗███████╗██╗  ██╗████████╗██╗   ██╗██╗
-- ╚══██╔══╝██╔════╝╚██╗██╔╝╚══██╔══╝██║   ██║██║
--    ██║   █████╗   ╚███╔╝    ██║   ██║   ██║██║
--    ██║   ██╔══╝   ██╔██╗    ██║   ██║   ██║██║
--    ██║   ███████╗██╔╝ ██╗   ██║   ╚██████╔╝██║
--    ╚═╝   ╚══════╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝

TextUI = {}
---@param msg string
function TextUI:Show(msg)
    if not self:IsOpen() then
        lib.showTextUI(msg)
    end
end

function TextUI:Hide()
    return lib.hideTextUI()
end

function TextUI:IsOpen()
    return lib.isTextUIOpen()
end
