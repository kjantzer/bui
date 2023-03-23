CREATE TABLE `bui_list_filters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `key` varchar(128) DEFAULT NULL COMMENT 'b-list "key"',
  `filters` json DEFAULT NULL,
  `name` varchar(128) DEFAULT NULL COMMENT 'ones with names will be loaded by default',
  `summary` varchar(500) DEFAULT NULL,
  `type` enum('private','public','shared') NOT NULL DEFAULT 'private' COMMENT 'shared can be seen and edited by anyone',
  `uid` int(11) DEFAULT NULL,
  `use_count` int(11) NOT NULL DEFAULT '1' COMMENT 'how many times used',
  `ts_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ts_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='';