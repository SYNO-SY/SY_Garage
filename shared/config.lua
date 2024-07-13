Config = {}

Config.Locale = 'en'

Config.Blips = {
    Sprite = 357,
    Scale = 0.8,
    Colour = 3,
}
Config.Iv_Blips = {
    Sprite = 357,
    Scale = 0.8,
    Colour = 6,
}


--  ██████╗  █████╗ ██████╗  █████╗  ██████╗ ███████╗███████╗
-- ██╔════╝ ██╔══██╗██╔══██╗██╔══██╗██╔════╝ ██╔════╝██╔════╝
-- ██║  ███╗███████║██████╔╝███████║██║  ███╗█████╗  ███████╗
-- ██║   ██║██╔══██║██╔══██╗██╔══██║██║   ██║██╔══╝  ╚════██║
-- ╚██████╔╝██║  ██║██║  ██║██║  ██║╚██████╔╝███████╗███████║
--  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝


Config.Garages = {
    {
        GarageName = "LosSantos",
        garage_x = -285.2,
        garage_y = -886.5,
        garage_z = 31.0,
        spawn_x = -309.3,
        spawn_y = -897.0,
        spawn_z = 31.0,
        heading = 351.8,

    },


    {
        GarageName = "SanAndreasAvenue",
        garage_x = 214.7177,
        garage_y = -805.9683,
        garage_z = 30.8164,
        spawn_x = 218.9,
        spawn_y = -779.7,
        spawn_z = 30.8,
        heading = 338.8,

    },
}

Config.EnableImpound = true
Config.ImpoundJob = {
    ['police'] = true,
}
Config.ImpoundCash = 2500
Config.Impounds = {
    {
        GarageName = "impound_davis",
        job = "police",
        garage_x = 408.14019775391,
        garage_y = -1624.251220703,
        garage_z = 29.291955947876,
        spawn_x = 402.6653442382,
        spawn_y = -1631.8555908203,
        spawn_z = 28.485252380371,
        heading = 232.8318939209
    },
}
