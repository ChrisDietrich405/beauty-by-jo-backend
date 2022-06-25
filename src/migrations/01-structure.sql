-- @project SQL Beauty By Jo
-- @updated 2022-06-25

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=15;

DROP TABLE IF EXISTS `service`;
CREATE TABLE `service` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` smallint NOT NULL,
  `name` varchar(45) NOT NULL,
  `path` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;

DROP TABLE IF EXISTS `specific_service`;
CREATE TABLE `specific_service` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `price` decimal(18,2) NOT NULL,
  `status` smallint NOT NULL,
  `service_id` int NOT NULL,
  `time` int NOT NULL DEFAULT '60',
  PRIMARY KEY (`id`),
  KEY `service_subservice_id_idx` (`service_id`),
  CONSTRAINT `service_subservice_id` FOREIGN KEY (`service_id`) REFERENCES `service` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1;

CREATE TABLE `schedule` (
  `id` int NOT NULL AUTO_INCREMENT,
  `specific_service_id` int NOT NULL,
  `date` datetime NOT NULL,
  `status` smallint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `schedule_specific_service_fk_idx` (`specific_service_id`),
  CONSTRAINT `schedule_specific_service_fk` FOREIGN KEY (`specific_service_id`) REFERENCES `specific_service` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1;