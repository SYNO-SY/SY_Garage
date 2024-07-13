ALTER TABLE `owned_vehicles` ADD `parking` VARCHAR(60) NULL AFTER `stored`;
ALTER TABLE `owned_vehicles` ADD `impound` VARCHAR(60) NULL AFTER `parking`;
ALTER TABLE `owned_vehicles` ADD `impound_data` LONGTEXT NULL COLLATE 'utf8mb4_general_ci',