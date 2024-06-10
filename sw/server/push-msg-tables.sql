CREATE TABLE `push_msgs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `payload` json DEFAULT NULL,
  `ts_read` datetime DEFAULT NULL,
  `ts_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_push_msg_user` (`uid`),
  KEY `ts_read` (`ts_read`) USING BTREE,
  CONSTRAINT `fk_push_msg_user` FOREIGN KEY (`uid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `push_msg_recipients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `msg_id` int(11) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_push_msg_user` (`msg_id`,`uid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `push_subscriptions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `name` varchar(128) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `sub` json DEFAULT NULL,
  `device` varchar(128) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `screen_size` varchar(128) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `ts_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_user_subscriptions` (`uid`),
  CONSTRAINT `fk_user_subscriptions` FOREIGN KEY (`uid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;